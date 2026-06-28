import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkAccountsDialog } from "./link-accounts-dialog";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/alerts", label: "Savings Alerts" },
  { to: "/pricing", label: "Pricing" },
] as const;

function isNavActive(pathname: string, to: string, exact?: boolean) {
  if (exact) return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <span className="relative grid h-8 w-8 place-items-center">
        <span
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: "var(--tl-blue)", opacity: 0.85 }}
        />
        <span
          className="absolute inset-[5px] rounded-full border-2"
          style={{ borderColor: "var(--tl-green)" }}
        />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Money<span className="text-tl-blue">Map</span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.to, "exact" in item && item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-tl-blue" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setLinkOpen(true)}
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex font-semibold"
          >
            Stop Overpaying Instantly
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6" aria-label="Main">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.to, "exact" in item && item.exact);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-sm transition-colors ${
                    active
                      ? "bg-secondary font-medium text-tl-blue"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button onClick={() => { setOpen(false); setLinkOpen(true); }} className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Stop Overpaying Instantly
            </Button>
          </nav>
        </div>
      )}

      <LinkAccountsDialog open={linkOpen} onOpenChange={setLinkOpen} />
    </header>
  );
}
