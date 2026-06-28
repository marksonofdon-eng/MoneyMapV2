import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkAccountsDialog } from "./link-accounts-dialog";

const tabs = [
  { to: "/how-it-works", label: "How it Works" },
  { to: "/dashboard", label: "My Dashboard" },
  { to: "/alerts", label: "Bill & Price Hike Alerts" },
  { to: "/wealth", label: "My Wealth Tool" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Wallet className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Money<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setLinkOpen(true)}
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            Link My Accounts
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
        <div className="border-t border-border/60 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {t.label}
              </Link>
            ))}
            <Button onClick={() => { setOpen(false); setLinkOpen(true); }} className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Link My Accounts
            </Button>
          </nav>
        </div>
      )}

      <LinkAccountsDialog open={linkOpen} onOpenChange={setLinkOpen} />
    </header>
  );
}
