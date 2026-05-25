"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { brand, ctas, navLinks } from "@/lib/siteData";
import { cn, isRouteActive } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ivory/10 bg-ink/74 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="lotabin home" className="focus-ring group flex items-center gap-3 rounded-full">
          <span className="flex h-10 w-10 overflow-hidden rounded-2xl border border-ivory/16 bg-ivory p-1.5 shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
            <Image
              src={brand.logoPath}
              alt={brand.logoAlt}
              width={80}
              height={80}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="font-display text-lg font-semibold tracking-[-0.03em] text-ivory transition group-hover:text-champagne">
            {brand.name}
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isRouteActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-full px-3.5 py-2 text-sm text-ivory/68 transition hover:bg-ivory/[0.06] hover:text-ivory",
                  active && "bg-ivory/[0.075] text-champagne"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/work" variant="ghost" size="sm">
            See Sample Work
          </Button>
          <Button href={ctas.primary.href} size="sm">
            {ctas.primary.label}
          </Button>
        </div>

        <MobileNav links={navLinks} ctaLabel={ctas.primary.label} ctaHref={ctas.primary.href} />
      </div>
    </header>
  );
}
