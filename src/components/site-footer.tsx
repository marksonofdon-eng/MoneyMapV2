import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const productLinks = [
  { label: "Home", to: "/" },
  { label: "Savings Alerts", to: "/alerts" },
  { label: "Pricing", to: "/pricing" },
  { label: "How it works", href: "/#how-it-works" },
] as const;

const companyLinks = [
  { label: "About MoneyMap", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press & media", href: "#" },
  { label: "Contact us", href: "#" },
] as const;

const legalLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "CDR policy", href: "#" },
  { label: "Security", href: "#" },
] as const;

const trustStats = [
  { value: "12,400+", label: "Aussies on MoneyMap" },
  { value: "$4.2M", label: "Verified savings found" },
  { value: "AES-256", label: "Bank-grade encryption" },
  { value: "CDR", label: "Accredited recipient" },
] as const;

function FooterLogo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center">
        <span
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: "var(--tl-blue)", opacity: 0.85 }}
        />
        <span
          className="absolute inset-[5px] rounded-full border-2"
          style={{ borderColor: "var(--tl-green)" }}
        />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        Money<span className="text-tl-blue">Map</span>
      </span>
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      {/* Pre-footer CTA */}
      <div className="relative overflow-hidden border-b border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 page-hero-glow"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_auto] lg:items-center lg:gap-12 lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tl-blue">No savings, no pay</p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Put your bills on cruise control.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Connect once via Open Banking. MoneyMap watches energy, mobile, NBN, insurance and subscriptions — and
              alerts you only when switching is worth it.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 w-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green group sm:w-auto"
          >
            <Link to="/alerts">
              Start saving today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-border/60 bg-background/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border/40 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-background px-4 py-5 text-center sm:px-6 sm:py-6">
              <p className="font-display text-lg font-bold tabular-nums text-foreground sm:text-xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <FooterLogo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Australia&apos;s quietest wealth engine. We scan your bills, kill the loyalty tax, and surface one-tap
              switches — month after month.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="badge-blue inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5" />
                APRA-regulated Open Banking
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-[11px] text-muted-foreground">
                <Lock className="h-3.5 w-3.5 text-tl-blue" />
                Read-only access
              </span>
            </div>
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tl-blue/80" />
              <span>Melbourne, Australia · Built for Aussies 18–65</span>
            </div>
          </div>

          <FooterLinkColumn title="Product" links={productLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
          <FooterLinkColumn title="Legal" links={legalLinks} />
        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-2xl border border-tl-blue/20 bg-surface/60 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-md">
            <p className="font-display text-lg font-semibold">Savings tips, no spam</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Occasional updates on bill hikes, loyalty tax traps, and new MoneyMap features.
            </p>
          </div>
          <form
            className="mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row lg:mt-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-11 border-border bg-background pl-10"
                aria-label="Email address"
              />
            </div>
            <Button type="submit" className="h-11 shrink-0 bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} MoneyMap Australia Pty Ltd. CDR Accredited Data Recipient.</p>
          <p className="text-center sm:text-right">
            ABN 12 345 678 901 · Australian Consumer Data Right participant
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly ({ label: string } & ({ to: string } | { href: string }))[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {"to" in link ? (
              <Link
                to={link.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
