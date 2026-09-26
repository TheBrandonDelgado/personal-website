import { useEffect, useRef, useState } from "react";
import { heroStack } from "../data/data";
import {
  DRAFT_LABELS,
  INTRO_EMPHASIS,
  INTRO_LEAD,
  principles,
} from "../data/pages";
import { Signature } from "./Chrome";

function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="principle-word inline-block"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {word}
      {index < words.length - 1 ? "\u00A0" : ""}
    </span>
  ));
}

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showRail, setShowRail] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scenes = [...root.querySelectorAll<HTMLElement>(".principle-scene")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      scenes.forEach((scene) => scene.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          entry.target.classList.remove("is-armed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.42 },
    );

    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.72 && rect.bottom > 80;
      scene.classList.add(inView ? "is-in" : "is-armed");
      observer.observe(scene);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = (): void => {
      setShowRail(window.scrollY > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = principles
      .map((principle) => document.getElementById(`principle-${principle.numeral}`))
      .filter((node): node is HTMLElement => node !== null);
    if (typeof IntersectionObserver === "undefined" || nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { threshold: [0.45, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="hero relative flex flex-col overflow-hidden lg:block">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-floor" aria-hidden="true" />
        <div className="hero-beam" aria-hidden="true" />
        <p className="hero-cred left-12 hidden lg:block">{DRAFT_LABELS.principles}</p>
        <p className="hero-cred right-12 hidden text-right lg:block">
          {DRAFT_LABELS.proofs} · Scroll ↓
        </p>

        <div className="hero-title safe-x relative z-10 text-center lg:absolute lg:inset-x-0 lg:top-[15%]">
          <h1 className="font-serif font-normal tracking-[-0.025em]">
            <span className="sr-only">Brandon Delgado, </span>
            <span className="mb-4 block font-mono text-[12px] uppercase tracking-[0.34em] text-glow lg:mb-6 lg:text-[13px]">
              Senior Full-Stack Engineer · Austin, TX{" "}
            </span>
            <span className="sweep block text-[64px] leading-[0.84] min-[420px]:text-[78px] lg:text-[clamp(84px,11.6vw,188px)]">
              What I hold to,{" "}
            </span>
            <em className="ember-type block text-[64px] font-normal italic leading-[0.84] min-[420px]:text-[78px] lg:text-[clamp(84px,11.6vw,188px)]">
              and the proof.
            </em>
          </h1>
        </div>

        <div className="safe-x relative z-10 mx-auto mt-8 max-w-[640px] text-left lg:absolute lg:left-1/2 lg:top-[calc(var(--horizon)+28px)] lg:mt-0 lg:w-[640px] lg:-translate-x-1/2 lg:text-center">
          <p className="text-[15.5px] leading-relaxed text-mist lg:text-[18px]">
            {INTRO_LEAD}
            <strong className="font-semibold text-ink">{INTRO_EMPHASIS}</strong>
          </p>
          <ul
            aria-label="Core stack"
            className="mt-4 flex list-none flex-wrap gap-2 lg:justify-center"
          >
            {heroStack.map((item) => (
              <li
                key={item}
                className="border border-ember/40 px-2.5 py-1 font-mono text-[12px] tracking-[0.08em] text-glow"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Principles"
          className="safe-x relative z-10 mt-auto grid grid-cols-2 gap-x-4 pb-8 pt-8 lg:absolute lg:inset-x-12 lg:bottom-9 lg:mt-0 lg:grid-cols-6 lg:gap-x-[18px] lg:pb-0 lg:pt-0"
        >
          {principles.map((principle, index) => (
            <a
              key={principle.numeral}
              href={`#principle-${principle.numeral}`}
              className={`flex min-h-12 items-baseline gap-2 border-t py-2 text-[13px] leading-snug lg:block lg:pt-3 ${
                index === 0 ? "border-ember text-ink" : "border-white/20 text-dim hover:border-ember hover:text-ink"
              }`}
            >
              <i className="min-w-6 font-serif text-[18px] font-normal not-italic text-ember lg:mb-1 lg:block lg:text-[22px]">
                {principle.numeral}.
              </i>
              {principle.statement}
            </a>
          ))}
        </nav>
      </section>

      <nav
        aria-label="Principle index"
        className={
          showRail
            ? "principle-rail fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 lg:flex"
            : "hidden"
        }
      >
        {principles.map((principle, index) => (
          <a
            key={principle.numeral}
            href={`#principle-${principle.numeral}`}
            aria-current={index === active ? "true" : undefined}
            className={`font-serif text-[18px] italic transition-transform duration-300 ${
              index === active ? "translate-x-1.5 text-ember" : "text-dim"
            }`}
          >
            <span className="sr-only">Principle </span>
            {principle.numeral}
          </a>
        ))}
      </nav>

      <div id="principles">
        {principles.map((principle, index) => (
          <section
            key={principle.numeral}
            id={`principle-${principle.numeral}`}
            className="principle-scene relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden border-t border-white/[0.06] py-24 lg:py-28"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[8%] top-1/2 h-[70vmax] w-[70vmax] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,90,31,0.14),transparent)]"
            />
            <p aria-hidden="true" className="principle-numeral">
              {principle.numeral}
            </p>
            <div className="principle-copy relative z-10 w-full">
              <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-glow">
                Principle {principle.numeral}
                <span aria-hidden="true"> — </span>
                <span className="sr-only">, </span>
                {index + 1} of 6
              </p>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(44px,7vw,108px)] font-extrabold leading-[0.92] tracking-[-0.035em] text-ink">
                <Words text={principle.statement} />
              </h2>
              <div className="proof-copy mt-10 grid max-w-[760px] grid-cols-[64px_1fr] gap-x-5 lg:grid-cols-[80px_1fr] lg:gap-x-6">
                <div className="proof-line mt-3 h-px w-16 bg-ember shadow-[0_0_12px_#ff5a1f] lg:w-20" />
                <div>
                  <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-ember">
                    The proof · {principle.proofName}
                  </h3>
                  <p className="proof-sentence mt-2 font-serif text-[clamp(26px,3vw,32px)] italic leading-[1.2] text-paper">
                    {principle.proofLine}
                  </p>
                  <a
                    href={principle.path}
                    className="mt-4 inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.18em] text-ink"
                  >
                    Read the full proof →
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Signature />
    </div>
  );
}
