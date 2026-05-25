"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { NavLink } from "@/lib/siteData";
import { isRouteActive, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
};

export function MobileNav({ links, ctaLabel, ctaHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/12 bg-ivory/[0.06] text-ivory transition hover:bg-ivory/[0.1]"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
          <span className={cn("h-px w-full bg-current transition", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("h-px w-full bg-current transition", open && "-translate-y-[3px] -rotate-45")} />
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-[1.35rem] border border-ivory/12 bg-ink-soft/98 p-3 shadow-studio backdrop-blur-xl"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {links.map((link) => {
              const active = isRouteActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring rounded-2xl px-4 py-3 transition hover:bg-ivory/[0.06]",
                    active && "bg-ivory/[0.075] text-champagne"
                  )}
                >
                  <span className="block text-sm font-medium">{link.label}</span>
                  {link.description && <span className="mt-1 block text-xs leading-5 text-smoke">{link.description}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 border-t border-ivory/10 pt-3">
            <Button href={ctaHref} className="w-full" size="md">
              {ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
