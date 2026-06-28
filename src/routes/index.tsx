import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck, TrendingDown, FileSpreadsheet, BadgePercent, Lock, Sparkles, Home, Banknote, Zap, Bell, LineChart as LineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkAccountsDialog } from "@/components/link-accounts-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoneyHub — Put Your Savings on Cruise Control" },
      { name: "description", content: "Smart money for regular Aussies. Kill the loyalty tax, catch price hikes, and grow your net worth automatically." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.82_0.22_145/0.18),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built on Australia's Open Banking
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Put Your Savings on <span className="text-primary">Cruise Control</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              MoneyHub works quietly in the background, scanning your bills and bank accounts to find hidden price hikes, ditch the "Loyalty Tax", and automatically grow your net worth.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green"
              >
                Link My Bank in 2 Minutes <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              100% secure. Built using Australia's official Open Banking system.
            </p>
          </div>

          {/* Hero visual */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="glass-card rounded-2xl p-2 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <StatTile icon={<Banknote className="h-4 w-4" />} label="Total Wealth" value="$184,520" delta="+ $2,140 this month" positive />
                <StatTile icon={<TrendingDown className="h-4 w-4" />} label="Savings Found" value="$1,284 / yr" delta="3 alerts ready" positive />
                <StatTile icon={<Bell className="h-4 w-4" />} label="Active Alerts" value="2" delta="Energy + Streaming" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">The Problem</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Why your bills keep getting more expensive</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ProblemCard
              icon={<BadgePercent className="h-5 w-5" />}
              title="The Loyal Customer Tax"
              body="Companies quietly move old customers to expensive plans while saving the cheapest, unadvertised deals for brand new sign-ups."
            />
            <ProblemCard
              icon={<TrendingDown className="h-5 w-5" />}
              title="The Compare-Site Scam"
              body="Old comparison websites make you do all the work yourself, take commissions from big providers, and only offer a quick, one-off fix."
            />
            <ProblemCard
              icon={<FileSpreadsheet className="h-5 w-5" />}
              title="Too Much Admin"
              body="Old budgeting apps fail because they force you to manually track every coffee, scan paper bills, and mess around with spreadsheets."
            />
          </div>
        </div>
      </section>

      {/* HOW WE FIX IT */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">How MoneyHub Works</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Three quiet steps. Real cash back in your pocket.</h2>
              <ul className="mt-8 space-y-5">
                <Step n="1" title="Link your bank in 2 minutes" body="Secure, read-only Open Banking connection. We never touch your password." />
                <Step n="2" title="We scan in the background" body="Bills, subscriptions, super, mortgages — we watch for hikes so you don't have to." />
                <Step n="3" title="One tap to save" body="When we find money, you get one alert with a Switch & Save button. That's it." />
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Zap className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-semibold">Electricity hike detected</p>
                  <p className="text-xs text-muted-foreground">AGL just lifted your kWh rate by 9%</p>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-border bg-background/60 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Switch to OVO Energy</span>
                  <span className="font-display text-2xl font-bold text-primary">+$412/yr</span>
                </div>
                <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Switch &amp; Save</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURE VAULT */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your Secure Vault</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Bank-grade security. You're always in control.</h2>
            <p className="mt-4 text-muted-foreground">
              MoneyHub uses the same 256-bit encryption the big four banks use. Access is read-only, consent is reviewable, and you can disconnect with one tap.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <VaultCard icon={<Lock className="h-5 w-5" />} title="256-bit encryption" body="Your data is encrypted at rest and in transit, end to end." />
            <VaultCard icon={<ShieldCheck className="h-5 w-5" />} title="Open Banking accredited" body="ACCC-regulated CDR data recipient. Audited annually." />
            <VaultCard icon={<LineIcon className="h-5 w-5" />} title="Read-only access" body="We can see your transactions. We can never move your money." />
          </div>

          {/* Teaser - Home loan prefill */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  <Home className="h-3.5 w-3.5" /> Coming soon
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">A stress-free home loan, pre-filled from your vault</h3>
                <p className="mt-3 text-muted-foreground">
                  Because MoneyHub safely keeps your past bill history and income, your next home loan application takes minutes — not weeks of paperwork.
                </p>
              </div>
              <div className="glass-card rounded-xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Application progress</p>
                <p className="mt-2 font-display text-3xl font-bold">94% pre-filled</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[94%] rounded-full bg-primary" />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Income, bills, savings & utilities verified via Open Banking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to put it on cruise control?</h2>
          <p className="mt-3 text-muted-foreground">Join thousands of Aussies clawing back the loyalty tax — quietly.</p>
          <Button onClick={() => setOpen(true)} size="lg" className="mt-6 h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green">
            Link My Bank in 2 Minutes
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MoneyHub Australia. CDR Accredited Data Recipient.</p>
          <p>Made for regular Aussies, in Melbourne 🇦🇺</p>
        </div>
      </footer>

      <LinkAccountsDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}

function StatTile({ icon, label, value, delta, positive }: { icon: React.ReactNode; label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div className="rounded-xl bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className={`mt-1 text-xs ${positive ? "text-primary" : "text-muted-foreground"}`}>{delta}</p>
    </div>
  );
}

function ProblemCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card className="border-border bg-card p-6">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Card>
  );
}

function VaultCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
