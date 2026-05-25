import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brand, ctas, footerLinks } from "@/lib/siteData";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink-soft/78">
      <Container size="wide" className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Link href="/" aria-label="lotabin home" className="focus-ring inline-flex items-center gap-3 rounded-full">
              <span className="flex h-11 w-11 overflow-hidden rounded-2xl border border-ivory/16 bg-ivory p-1.5">
                <Image src={brand.logoPath} alt={brand.logoAlt} width={88} height={88} className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-xl font-semibold tracking-[-0.04em] text-ivory">{brand.name}</span>
            </Link>

            <p className="mt-5 max-w-xl text-pretty text-base leading-8 text-ivory-soft/72">
              {brand.thesis} {brand.operationalMessage}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Badge tone="champagne">AI-assisted</Badge>
              <Badge tone="ivory">Human-directed</Badge>
              <Badge tone="muted">Paid-social-ready</Badge>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-champagne/74">{group.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link className="focus-ring rounded-full text-sm text-ivory/68 transition hover:text-ivory" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 rounded-[var(--radius-panel)] border border-ivory/10 bg-ivory/[0.045] p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-smoke">Final review point</p>
            <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-ivory">Move faster without looking cheaper.</p>
          </div>
          <Button href={ctas.primary.href}>{ctas.primary.label}</Button>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs leading-6 text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} lotabin. All rights reserved.</p>
          <p>Short-form video ad production. AI-assisted. Human-directed.</p>
        </div>
      </Container>
    </footer>
  );
}
