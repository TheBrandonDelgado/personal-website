import { useEffect, useRef, useCallback, useMemo } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBgColor;
  uniform int uBlobCount;
  uniform float uAlphaScale;

  // Smooth noise for organic blob distortion
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic smoothstep
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion for organic shape distortion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.06;

    // 5 blob centers — sweeping arc from top-left to bottom-right
    // two overlap zones create rich color blending, accent blob balances negative space
    vec2 centers[5];
    centers[0] = vec2(0.20, 0.78) + vec2(sin(t * 0.5) * 0.08, cos(t * 0.7) * 0.06);           // anchor: top-left corner
    centers[1] = vec2(0.40, 0.55) + vec2(cos(t * 0.6 + 1.5) * 0.12, sin(t * 0.4) * 0.10);     // mid-left: overlaps with [0]
    centers[2] = vec2(0.62, 0.40) + vec2(sin(t * 0.4 + 0.8) * 0.10, cos(t * 0.6 + 2.0) * 0.12); // mid-right: overlaps with [3]
    centers[3] = vec2(0.80, 0.22) + vec2(cos(t * 0.7 + 3.0) * 0.08, sin(t * 0.5 + 1.5) * 0.06); // anchor: bottom-right corner
    centers[4] = vec2(0.85, 0.70) + vec2(sin(t * 0.3 + 4.0) * 0.06, cos(t * 0.5 + 2.5) * 0.10); // accent: right edge, balances top-right

    // Mouse influence — gently push blobs
    for (int i = 0; i < 5; i++) {
      if (i >= uBlobCount) break;
      vec2 toMouse = uMouse - centers[i];
      centers[i] += toMouse * 0.08;
    }

    // Rich golden palette — warm amber to pale gold
    vec3 colors[5];
    colors[0] = vec3(0.98, 0.75, 0.14);  // #fbbf24 vivid amber
    colors[1] = vec3(0.96, 0.62, 0.04);  // #f59e0b deep gold
    colors[2] = vec3(1.00, 0.88, 0.28);  // #fde047 bright yellow-gold
    colors[3] = vec3(0.92, 0.58, 0.02);  // darker amber
    colors[4] = vec3(1.00, 0.93, 0.60);  // #fef3c7 pale warm gold

    float alphas[5];
    alphas[0] = 0.50;  // anchor blob — solid presence
    alphas[1] = 0.55;  // center-left — slightly brighter for rich overlap
    alphas[2] = 0.50;  // center-right — pairs with [1] for blending
    alphas[3] = 0.45;  // lower anchor — slightly softer to fade out
    alphas[4] = 0.20;  // accent — subtle depth on the edge

    vec3 color = uBgColor;

    for (int i = 0; i < 5; i++) {
      if (i >= uBlobCount) break;

      vec2 centerAspect = vec2(centers[i].x * aspect, centers[i].y);

      // Distort the distance field with fbm for organic blob shapes
      float distortion = fbm(uvAspect * 3.0 + t * 0.3 + float(i) * 7.0) * 0.12;
      float dist = distance(uvAspect, centerAspect) + distortion;

      // Large, very soft falloff
      float blob = smoothstep(0.55, 0.0, dist);
      blob = blob * blob; // quadratic falloff for softer edges

      color = mix(color, colors[i], blob * alphas[i] * uAlphaScale);
    }

    // Very subtle film grain — barely perceptible, adds analog warmth
    float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.012;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MeshGradient({ lightMode = false, onReady }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const uniformsRef = useRef(null);
  const shadersRef = useRef(null);
  const bufferRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile =
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const blobCount = isMobile ? 3 : 5;
  const alphaScale = lightMode ? 0.4 : 1.0;
  const bgColor = useMemo(
    () => (lightMode ? [0.976, 0.980, 0.984] : [0.039, 0.039, 0.039]),
    [lightMode]
  );

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl =
      canvas.getContext("webgl2", { powerPreference: "low-power" }) ||
      canvas.getContext("webgl", { powerPreference: "low-power" });
    if (!gl) return false;

    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.warn("WebGL vertex shader compile failed:", gl.getShaderInfoLog(vs));
      return false;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn("WebGL fragment shader compile failed:", gl.getShaderInfoLog(fs));
      return false;
    }

    shadersRef.current = { vs, fs };

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("WebGL program link failed");
      return false;
    }

    programRef.current = program;
    gl.useProgram(program);

    const uniforms = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uBgColor: gl.getUniformLocation(program, "uBgColor"),
      uBlobCount: gl.getUniformLocation(program, "uBlobCount"),
      uAlphaScale: gl.getUniformLocation(program, "uAlphaScale"),
    };
    uniformsRef.current = uniforms;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    bufferRef.current = buffer;

    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    return true;
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    const u = uniformsRef.current;
    if (!gl || !program || !canvas || !u) return;

    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    const time = (Date.now() - startTimeRef.current) / 1000;

    gl.uniform1f(u.uTime, time);
    gl.uniform2f(u.uResolution, width, height);
    gl.uniform2f(u.uMouse, mouseRef.current.x, mouseRef.current.y);
    gl.uniform3f(u.uBgColor, ...bgColor);
    gl.uniform1i(u.uBlobCount, blobCount);
    gl.uniform1f(u.uAlphaScale, alphaScale);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [bgColor, blobCount, alphaScale, isMobile]);

  useEffect(() => {
    const success = initGL();
    if (!success) return;

    if (onReady) onReady();

    if (prefersReducedMotion) {
      render();
      return;
    }

    const loop = () => {
      render();
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const gl = glRef.current;
      if (gl) {
        if (programRef.current) gl.deleteProgram(programRef.current);
        if (shadersRef.current) {
          gl.deleteShader(shadersRef.current.vs);
          gl.deleteShader(shadersRef.current.fs);
        }
        if (bufferRef.current) gl.deleteBuffer(bufferRef.current);
      }
      programRef.current = null;
      shadersRef.current = null;
      bufferRef.current = null;
      uniformsRef.current = null;
      glRef.current = null;
    };
  }, [initGL, render, prefersReducedMotion, onReady]);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}

export default MeshGradient;
