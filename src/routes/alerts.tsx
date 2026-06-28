import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Tv, Umbrella, X, CheckCircle2, ArrowRight, Loader2, Smartphone, Wifi, Layers, ShieldCheck, Flame, AlertCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Bill & Price Hike Alerts — MoneyMap" },
      { name: "description", content: "MoneyMap's autonomous engine catches price hikes and wasted subscriptions, with one-tap fixes." },
    ],
  }),
  component: Alerts,
});

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

function Alerts() {
  const [switchOpen, setSwitchOpen] = useState(false);
  const [cancelled, setCancelled] = useState<string[]>([]);

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Bill & Price Hike Alerts</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Real money back in your pocket — quietly.</h1>
          <p className="mt-4 text-muted-foreground">The autonomous engine works in the background. We only ping you when there's real money to save.</p>
        </header>

        {/* SECTION 1 — Immediate Actions */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "color-mix(in oklab, var(--tl-red) 15%, transparent)", color: "var(--tl-red)" }}>
              <AlertCircle className="h-5 w-5" />
            </span>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Immediate Actions <span className="text-muted-foreground font-normal">(Today)</span></h2>
          </div>

          <div className="space-y-4">
            <AlertCard
              tone="orange"
              icon={<Zap className="h-6 w-6" />}
              indicator={<AlertTriangle className="h-4 w-4" style={{ color: "var(--tl-orange)" }} />}
              tag="Autonomous Switch · Origin Energy"
              title="Origin Energy increased your rate by 14% this morning."
              subtitle="Based on your last 12 months, switching to OVO Energy saves you $340/yr."
              primary={
                <Button size="lg" onClick={() => setSwitchOpen(true)} className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green">
                  Switch & Save $340/yr <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              }
            />

            <AlertCard
              tone="yellow"
              icon={<Tv className="h-6 w-6" />}
              indicator={<AlertTriangle className="h-4 w-4" style={{ color: "var(--tl-yellow)" }} />}
              tag="AI Scanner · Streaming"
              title="Double Streaming Alert."
              subtitle="You pay for both Netflix Premium and Stan Family, but usage reports show overlapping idle times."
              primary={
                <Button
                  size="lg"
                  onClick={() => { setCancelled((c) => [...c, "Stan"]); toast.success("Stan cancellation queued — confirm via email"); }}
                  disabled={cancelled.includes("Stan")}
                  className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green disabled:opacity-60"
                >
                  {cancelled.includes("Stan") ? <><CheckCircle2 className="mr-1 h-4 w-4" /> Cancellation queued</> : <><X className="mr-1 h-4 w-4" /> Cancel Stan Instantly <ArrowRight className="ml-1 h-4 w-4" /></>}
                </Button>
              }
            />
          </div>
        </section>

        {/* SECTION 2 — Monthly Comprehensive Review Network */}
        <section className="mt-20">
          <div className="mb-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <Layers className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Your Monthly Comprehensive Review Network</h2>
            </div>
            <p className="mt-3 text-muted-foreground">
              Our conflict-free AI scans the entire Australian market every 30 days against your open banking profile to flag cheaper equivalent products or structural cost drains.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ReviewCard icon={<Smartphone className="h-6 w-6" />} title="Cheaper Mobile Plan" body="A new equivalent 5G network plan matching your exact 42GB/mo average usage has hit the market. Switch from Optus to Boost Mobile." cta="Save $15/mo Instantly" />
            <ReviewCard icon={<Wifi className="h-6 w-6" />} title="NBN Price Drop" body="Superloop has launched a new equivalent NBN 50 wholesale tier. Switch your live connection pipeline seamlessly." cta="Save $22/mo Instantly" />
            <ReviewCard icon={<Layers className="h-6 w-6" />} title="Duplicate Bank Fees" body="You are paying an unnecessary monthly account-keeping fee on an idle secondary Commonwealth Bank savings account." cta="Consolidate & Wipe Fee" />
            <ReviewCard icon={<ShieldCheck className="h-6 w-6" />} title="Car Insurance Premium" body="Based on your updated clean driving record, a conflict-free match against budget direct providers shows your current policy is overpriced." cta="Save $140/yr" />
            <ReviewCard icon={<Flame className="h-6 w-6" />} title="Off-Peak Gas Tariff" body="New seasonal winter gas baseline pricing has dropped. Your current variable tariff can be optimized for instant protection." cta="Apply Lower Tariff" />
          </div>
        </section>

        {/* SECTION 3 — Rainy Day Safety Index */}
        <section className="mt-20">
          <Card className="relative overflow-hidden border-border glass-card p-8 sm:p-10" style={{ boxShadow: "0 30px 80px -50px rgba(0,230,118,0.6)" }}>
            <div className="flex flex-wrap items-start gap-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Umbrella className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Rainy Day Calculator · Safety Index</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-bold text-primary tracking-tight" style={{ textShadow: "0 0 30px rgba(0,230,118,0.35)" }}>74</span>
                  <span className="font-display text-xl font-semibold text-foreground">Days</span>
                </div>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">How long you can comfortably survive if your income stopped tomorrow — based on your live living expenses.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Metric label="Liquid cash" value={fmt(12400)} />
                  <Metric label="Monthly essentials" value={fmt(3525)} />
                  <Metric label="Aussie average" value="42 days" />
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <SwitchDialog open={switchOpen} onOpenChange={setSwitchOpen} />
    </main>
  );
}

function AlertCard({ tone, icon, indicator, tag, title, subtitle, primary }: {
  tone: "orange" | "yellow" | "red"; icon: React.ReactNode; indicator?: React.ReactNode; tag: string; title: string; subtitle: string; primary: React.ReactNode;
}) {
  const c = tone === "orange" ? "var(--tl-orange)" : tone === "yellow" ? "var(--tl-yellow)" : "var(--tl-red)";
  return (
    <Card className="border-border bg-surface p-6 transition-transform hover:-translate-y-0.5 sm:p-7" style={{ borderColor: `color-mix(in oklab, ${c} 35%, var(--border))` }}>
      <div className="flex flex-wrap items-start gap-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: `${c}1F`, color: c }}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {indicator}
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: `${c}1F`, color: c }}>{tag}</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {primary}
            <Button variant="ghost" className="h-12 px-4 text-muted-foreground hover:text-foreground">Dismiss</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReviewCard({ icon, title, body, cta }: { icon: React.ReactNode; title: string; body: string; cta: string }) {
  return (
    <Card className="flex h-full flex-col border-border bg-surface p-6 transition-transform hover:-translate-y-0.5">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">{icon}</div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <Button className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        {cta} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-base font-semibold">{value}</p>
    </div>
  );
}

function SwitchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); toast.success("Switch request sent to OVO Energy"); }, 1200);
  }
  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(() => setDone(false), 200); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">One-click switch to OVO Energy</DialogTitle>
          <DialogDescription>We've pre-filled your profile from your MoneyMap vault. Saving <span className="text-primary font-semibold">$340/yr</span>.</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="text-sm text-muted-foreground">OVO will be in touch within 1 business day. Your old account closes automatically.</p>
            <Button onClick={() => onOpenChange(false)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Done</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="fn">First name</Label>
                <Input id="fn" defaultValue="Sam" />
              </div>
              <div>
                <Label htmlFor="ln">Last name</Label>
                <Input id="ln" defaultValue="Nguyen" />
              </div>
            </div>
            <div>
              <Label htmlFor="addr">Address</Label>
              <Input id="addr" defaultValue="14 Smith St, Brighton East VIC 3187" />
            </div>
            <div>
              <Label htmlFor="nmi">NMI (meter number)</Label>
              <Input id="nmi" defaultValue="6 1023 4567 89" />
            </div>
            <div>
              <Label htmlFor="em">Email</Label>
              <Input id="em" type="email" defaultValue="sam.n@example.com" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Confirm switch"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
