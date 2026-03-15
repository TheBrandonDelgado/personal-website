import { useEffect, useRef, useCallback } from "react";

const BLOB_COLORS_DARK = [
  [0.984, 0.749, 0.141, 0.25], // #fbbf24
  [0.961, 0.620, 0.043, 0.20], // #f59e0b
  [0.992, 0.878, 0.278, 0.12], // #fde047
  [0.996, 0.953, 0.780, 0.08], // #fef3c7
];

const BLOB_COLORS_LIGHT = BLOB_COLORS_DARK.map(([r, g, b, a]) => [
  r, g, b, a * 0.4,
]);

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
  uniform float uBlobAlpha[4];
  uniform vec3 uBlobColor[4];
  uniform vec3 uBgColor;
  uniform int uBlobCount;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 color = uBgColor;

    vec2 centers[4];
    centers[0] = vec2(0.25, 0.55);
    centers[1] = vec2(0.75, 0.35);
    centers[2] = vec2(0.5, 0.7);
    centers[3] = vec2(0.35, 0.25);

    for (int i = 0; i < 4; i++) {
      if (i >= uBlobCount) break;

      float t = uTime * 0.08 + float(i) * 1.5;
      vec2 offset = vec2(
        noise(vec2(t, float(i) * 10.0)) * 0.15 - 0.075,
        noise(vec2(float(i) * 10.0, t)) * 0.15 - 0.075
      );

      vec2 mouseInfluence = (uMouse - centers[i]) * 0.05;
      vec2 center = centers[i] + offset + mouseInfluence;
      float dist = distance(uv, center);
      float blob = smoothstep(0.4, 0.0, dist);

      color += uBlobColor[i] * blob * uBlobAlpha[i];
    }

    // Subtle noise texture
    float n = noise(uv * 200.0 + uTime * 0.5) * 0.03;
    color += n;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MeshGradient({ lightMode = false, onReady }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile =
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const blobCount = isMobile ? 2 : 4;
  const blobColors = lightMode ? BLOB_COLORS_LIGHT : BLOB_COLORS_DARK;
  const bgColor = lightMode ? [0.976, 0.980, 0.984] : [0.039, 0.039, 0.039];

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;

    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn("WebGL shader compile failed:", gl.getShaderInfoLog(fs));
      return false;
    }

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

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    return true;
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    if (!gl || !program || !canvas) return;

    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    const time = (Date.now() - startTimeRef.current) / 1000;

    gl.uniform1f(gl.getUniformLocation(program, "uTime"), time);
    gl.uniform2f(gl.getUniformLocation(program, "uResolution"), width, height);
    gl.uniform2f(gl.getUniformLocation(program, "uMouse"), mouseRef.current.x, mouseRef.current.y);
    gl.uniform3f(gl.getUniformLocation(program, "uBgColor"), ...bgColor);
    gl.uniform1i(gl.getUniformLocation(program, "uBlobCount"), blobCount);

    for (let i = 0; i < 4; i++) {
      const color = i < blobColors.length ? blobColors[i] : [0, 0, 0, 0];
      gl.uniform1f(gl.getUniformLocation(program, `uBlobAlpha[${i}]`), color[3]);
      gl.uniform3f(gl.getUniformLocation(program, `uBlobColor[${i}]`), color[0], color[1], color[2]);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [bgColor, blobColors, blobCount, isMobile]);

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
    };
  }, [initGL, render, prefersReducedMotion, onReady]);

  // Mouse tracking (only on desktop)
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
