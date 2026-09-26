import { social } from "../data/data";
import { SAZMINING_LINE } from "../data/pages";

function ResumeLink({ prominent }: { prominent?: boolean }) {
  const resume = social.find((item) => item.download);
  if (!resume?.download) return null;
  if (prominent) {
    return (
      <a
        href={resume.link}
        download={resume.download}
        aria-label="Download resume"
        className="inline-flex min-h-12 items-center font-medium text-ember"
      >
        Resume
      </a>
    );
  }
  return (
    <a
      href={resume.link}
      download={resume.download}
      className="inline-flex min-h-12 items-center border-b border-ember pb-1 font-mono text-[12px] uppercase tracking-[0.2em] text-ink"
    >
      Resume
    </a>
  );
}

export function SiteHeader() {
  const github = social.find((item) => item.name === "GitHub");
  return (
    <header className="fixed inset-x-0 top-0 z-40 grid h-16 grid-cols-[1fr_auto] items-center px-5 font-mono text-[12px] uppercase tracking-[0.18em] text-dim lg:h-[72px] lg:grid-cols-[1fr_auto_1fr] lg:px-12">
      <a href="/" className="justify-self-start font-medium text-ink">
        Brandon Delgado
      </a>
      <span className="hidden text-center lg:block">What I hold to</span>
      <nav aria-label="Primary" className="flex items-center justify-end gap-6 lg:gap-8">
        <a href="/#principles" className="hidden min-h-12 items-center text-ink lg:inline-flex">
          Principles
        </a>
        <a
          href="/proof/hardware-dispatch"
          className="hidden min-h-12 items-center text-ink lg:inline-flex"
        >
          Proof
        </a>
        {github ? (
          <a
            href={github.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-12 items-center text-ink lg:inline-flex"
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
        <ResumeLink prominent />
      </nav>
    </header>
  );
}

export function ContactNav() {
  return (
    <nav aria-label="Contact" className="mt-8 flex flex-wrap justify-center gap-x-7">
      {social.map((item) =>
        item.download ? (
          <ResumeLink key={item.name} />
        ) : (
          <a
            key={item.name}
            href={item.link}
            {...(item.link.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex min-h-12 items-center border-b border-ember pb-1 font-mono text-[12px] uppercase tracking-[0.2em] text-ink"
          >
            {item.name}
            {item.link.startsWith("http") ? (
              <span className="sr-only"> (opens in a new tab)</span>
            ) : null}
          </a>
        ),
      )}
    </nav>
  );
}

export function Signature() {
  return (
    <footer className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <p className="font-script text-[clamp(72px,16vw,130px)] leading-none text-ink [transform:rotate(-4deg)]">
        Brandon Delgado
      </p>
      <p className="mt-8 max-w-3xl font-mono text-[12px] uppercase leading-loose tracking-[0.14em] text-dim">
        <a className="text-ink underline-offset-4 hover:underline" href="/proof/customer-dashboard">
          Sazmining 2024–
        </a>
        {" · "}
        <a className="text-ink underline-offset-4 hover:underline" href="/work#jan3">
          JAN3 2024
        </a>
        {" · "}
        <a className="text-ink underline-offset-4 hover:underline" href="/work#truesense">
          TrueSense Marketing 2022–24
        </a>
        {" · "}
        <a className="text-ink underline-offset-4 hover:underline" href="/work#freelance">
          Freelance 2020–22
        </a>
      </p>
      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-dim">
        TypeScript · React · Node.js · Postgres · Supabase · Redis · NestJS
      </p>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist">{SAZMINING_LINE}</p>
      <ContactNav />
    </footer>
  );
}

export function TextLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="mt-4 inline-flex min-h-11 items-center border-b border-ember font-mono text-[12px] uppercase tracking-[0.18em] text-ink"
    >
      {label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
