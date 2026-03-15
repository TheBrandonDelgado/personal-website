import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.set(bar, { scaleX: progress });
    };

    const trigger = ScrollTrigger.create({
      onUpdate: updateProgress,
    });

    updateProgress();

    return () => {
      trigger.kill();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" />;
}

export default ScrollProgress;
