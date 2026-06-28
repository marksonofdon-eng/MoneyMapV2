import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Tv, Umbrella, X, CheckCircle2, ArrowRight, Wifi, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Bill & Price Hike Alerts — MoneyHub" },
      { name: "description", content: "Live alerts when your bills get hiked, with one-tap switching." },
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
  const [monthlyExpenses, setMonthlyExpenses] = useState(4200);
  const cash = 24300;
  const months = Math.floor(cash / monthlyExpenses);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Bill & Price Hike Alerts</h1>
        <p className="mt-2 text-muted-foreground">We only ping you when there's real money to save.</p>
      </header>

      <div className="space-y-4">
        {/* Alert 1: Energy */}
        <Card className="border-border bg-card p-6">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
              <Zap className="h-6 w-6" style={{ color: "oklch(0.78 0.18 70)" }} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium" style={{ color: "oklch(0.78 0.18 70)" }}>Price hike detected</span>
                <span className="text-xs text-muted-foreground">2 days ago · AGL Energy</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">Your electricity rate just went up 9%</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                AGL lifted your usage rate from 28.6¢ to 31.2¢/kWh. Based on your last 12 months, switching to <strong className="text-foreground">OVO Energy</strong> saves you <span className="text-primary font-semibold">{fmt(412)}/yr</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setSwitchOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Switch & Save <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Dismiss</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alert 2: Subscriptions */}
        <Card className="border-border bg-card p-6">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Tv className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">Wasted subscription</span>
                <span className="text-xs text-muted-foreground">Detected this week</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">You're paying for two streaming services that do the same thing</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You're subscribed to both <strong className="text-foreground">Netflix Premium</strong> ($25/mo) and <strong className="text-foreground">Stan</strong> ($17/mo). You've only watched Stan twice in the last 90 days.
              </p>
              <div className="mt-4 rounded-lg bg-background/50 p-3 text-sm">
                Cancel Stan to save <span className="font-semibold text-primary">{fmt(204)}/yr</span>.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => { setCancelled((c) => [...c, "Stan"]); toast.success("Stan cancellation queued — confirm via email"); }}
                  disabled={cancelled.includes("Stan")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                >
                  {cancelled.includes("Stan") ? <><CheckCircle2 className="mr-1 h-4 w-4" /> Cancellation queued</> : <><X className="mr-1 h-4 w-4" /> Cancel Stan</>}
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Keep both</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alert 3: Internet (small nudge) */}
        <Card className="border-border bg-card p-6">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
              <Wifi className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">Heads up</span>
                <span className="text-xs text-muted-foreground">Tangerine NBN</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">Your NBN promo ends in 14 days</h3>
              <p className="mt-1 text-sm text-muted-foreground">Your price will rise from $59 to $79/mo. We'll re-shop it for you automatically — no action needed.</p>
            </div>
          </div>
        </Card>

        {/* Rainy day */}
        <Card className="border-border bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Umbrella className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold">Rainy Day Calculator</h3>
              <p className="mt-1 text-sm text-muted-foreground">How long could you survive if you couldn't work tomorrow?</p>

              <div className="mt-5 grid items-center gap-6 sm:grid-cols-[1fr_1.2fr]">
                <div className="rounded-xl bg-background/60 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Your safety index</p>
                  <p className="mt-2 font-display text-5xl font-bold text-primary">{months}</p>
                  <p className="text-sm text-muted-foreground">months covered</p>
                  <p className="mt-3 text-xs text-muted-foreground">{fmt(cash)} liquid · {fmt(monthlyExpenses)}/mo expenses</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Adjust your monthly expenses</Label>
                  <div className="mt-3">
                    <Slider min={1500} max={9000} step={100} value={[monthlyExpenses]} onValueChange={(v) => setMonthlyExpenses(v[0])} />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>$1.5k</span><span className="text-foreground">{fmt(monthlyExpenses)}</span><span>$9k</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">Aussie average buffer: 2.4 months. You're {months >= 3 ? "comfortably ahead" : "a little exposed"}.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <SwitchDialog open={switchOpen} onOpenChange={setSwitchOpen} />
    </main>
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
          <DialogTitle className="font-display text-2xl">Switch to OVO Energy</DialogTitle>
          <DialogDescription>We've pre-filled your details. Just check and submit — saving <span className="text-primary font-semibold">{fmt(412)}/yr</span>.</DialogDescription>
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
              <Input id="addr" defaultValue="14 Smith St, Fitzroy VIC 3065" />
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
