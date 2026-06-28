import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkAccountsDialog } from "./link-accounts-dialog";

const tabs = [
  { to: "/how-it-works", label: "How it Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "My Dashboard" },
  { to: "/alerts", label: "Bill & Price Hike Alerts", badge: 2 },
  { to: "/wealth", label: "My Wealth Tool" },
] as const;

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
        Money<span className="text-foreground">Map</span>
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

        <nav className="hidden items-center gap-1 lg:flex">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {t.label}
                  {"badge" in t && t.badge ? (
                    <span
                      className="pulse-dot grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold text-background"
                      style={{ backgroundColor: "var(--tl-red)", color: "#fff" }}
                    >
                      {t.badge}
                    </span>
                  ) : null}
                </span>
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
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <span>{t.label}</span>
                {"badge" in t && t.badge ? (
                  <span
                    className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold text-white"
                    style={{ backgroundColor: "var(--tl-red)" }}
                  >
                    {t.badge}
                  </span>
                ) : null}
              </Link>
            ))}
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
