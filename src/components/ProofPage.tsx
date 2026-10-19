import type { Subpage } from "../data/pages";
import { TextLink } from "./Chrome";
import DispatchDiagram from "./DispatchDiagram";

function Headline({ page }: { page: Subpage }) {
  return (
    <h1 className="mt-8 max-w-[920px] break-words text-[clamp(32px,9vw,80px)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink">
      {page.serif ?? page.headline}
    </h1>
  );
}

export default function ProofPage({ page }: { page: Subpage }) {
  return (
    <article className="page-frame relative mx-auto flex min-h-screen max-w-[1440px] flex-col pb-16 pt-24 lg:pb-10 lg:pt-[108px]">
      <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-glow">{page.kicker}</p>
      <Headline page={page} />

      <div
        className={
          page.diagram
            ? "mt-8 grid flex-1 items-stretch gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:gap-x-14"
            : "mt-10 max-w-3xl"
        }
      >
        {page.diagram ? (
          <div className="order-2 min-h-[320px] lg:order-1 lg:min-h-[480px]">
            <DispatchDiagram />
          </div>
        ) : null}
        <div className={page.diagram ? "order-1 flex flex-col gap-6 lg:order-2 lg:border-l lg:border-white/15 lg:pl-8" : "flex flex-col gap-10"}>
          {page.blocks.map((block) => (
            <section key={block.heading} id={block.id} className="scroll-mt-24">
              <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.26em] text-glow">
                {block.heading}
              </h2>
              {block.paragraphs.map((paragraph, index) => (
                <p key={`${block.heading}-${index}`} className="mt-2 text-[16px] leading-relaxed text-narr">
                  {paragraph}
                </p>
              ))}
              {block.links?.map((link) => (
                <div key={link.href}>
                  <TextLink href={link.href} label={link.label} />
                </div>
              ))}
            </section>
          ))}
          {page.links?.map((link) => (
            <div key={link.href}>
              <TextLink href={link.href} label={link.label} />
            </div>
          ))}
          {page.note ? <p className="text-[15px] leading-relaxed text-mist">{page.note}</p> : null}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-5 lg:mt-auto lg:flex-row lg:items-end lg:justify-between">
        {page.quote ? (
          <blockquote className="closing-quote max-w-4xl font-serif text-[clamp(28px,4vw,44px)] italic leading-[1.15] text-ink">
            <p>{page.quote}</p>
          </blockquote>
        ) : (
          <span />
        )}
        {page.next ? (
          <a
            href={page.next.href}
            className="inline-flex min-h-12 shrink-0 items-center font-mono text-[12px] uppercase tracking-[0.2em] text-dim hover:text-ink"
          >
            {page.next.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}
