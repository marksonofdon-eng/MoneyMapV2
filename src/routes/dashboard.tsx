import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Wallet, PiggyBank, Home, TrendingUp, CreditCard, Car, Sparkles, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — MoneyMap" },
      { name: "description", content: "Your wealth, bills and 12-month forecast in one calm, beautiful view." },
    ],
  }),
  component: Dashboard,
});

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

/* The 5-Colour Status Engine */
const STATUSES = {
  blue:   { color: "var(--tl-blue)",   label: "Wealth Surge",     emoji: "🔵", body: "Asset growth is outstripping debt. You're compounding." },
  green:  { color: "var(--tl-green)",  label: "On Track",         emoji: "🟢", body: "Safe spending, bills covered, goals ticking over." },
  yellow: { color: "var(--tl-yellow)", label: "Caution Required", emoji: "🟡", body: "Upcoming bill spike or unusual spending acceleration." },
  orange: { color: "var(--tl-orange)", label: "Budget Breach",    emoji: "🟠", body: "A core spending bucket has overflowed this month." },
  red:    { color: "var(--tl-red)",    label: "Immediate Action", emoji: "🔴", body: "Risk of account overdraw or imminent bill default." },
} as const;

const essentials = [
  { name: "Rent", amount: 2400 },
  { name: "Electricity (Origin)", amount: 185 },
  { name: "Groceries (Coles)", amount: 720 },
  { name: "Health insurance", amount: 165 },
  { name: "Mobile (Telstra)", amount: 55 },
];
const funSpend = [
  { name: "Dining out", amount: 320 },
  { name: "Netflix Premium", amount: 25 },
  { name: "Stan Family", amount: 17 },
  { name: "Spotify Family", amount: 21 },
  { name: "Weekend trips", amount: 240 },
];

function Dashboard() {
  const [months, setMonths] = useState(12);
  const [bills, setBills] = useState<"essentials" | "fun">("essentials");
  const status = STATUSES.green;

  const monthlyIn = 7800;
  const monthlyOut = essentials.reduce((s,e)=>s+e.amount,0) + funSpend.reduce((s,e)=>s+e.amount,0);
  const monthlyNet = monthlyIn - monthlyOut;
  const projected = useMemo(() => 12400 + monthlyNet * months, [months, monthlyNet]);

  // Crystal ball glow
  const ballTone =
    months <= 6 ? STATUSES.yellow :
    months <= 10 ? STATUSES.green : STATUSES.blue;

  const rows = bills === "essentials" ? essentials : funSpend;
  const total = rows.reduce((s, e) => s + e.amount, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-sm text-muted-foreground">Good afternoon, Sam</p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">My Dashboard</h1>
      </header>

      {/* 5-Colour Status Masthead */}
      <div
        className="relative overflow-hidden rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: `${status.color}55`, background: `linear-gradient(120deg, ${status.color}18, transparent 60%)` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className="grid h-12 w-12 place-items-center rounded-full text-xl"
              style={{ background: `${status.color}25`, color: status.color, boxShadow: `0 0 30px ${status.color}55` }}
            >
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Today's status</p>
              <p className="font-display text-2xl font-bold" style={{ color: status.color }}>{status.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{status.body}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(Object.keys(STATUSES) as Array<keyof typeof STATUSES>).map((k) => {
              const s = STATUSES[k];
              const active = s.label === status.label;
              return (
                <span key={k} title={s.label} className="grid h-7 w-7 place-items-center rounded-full transition-transform"
                  style={{ background: active ? s.color : `${s.color}33`, boxShadow: active ? `0 0 18px ${s.color}` : "none", transform: active ? "scale(1.05)" : "scale(1)" }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Widget 1: Total Wealth */}
      <Card className="mt-6 border-border bg-surface p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4 text-primary" /> My Total Wealth
        </div>
        <p className="mt-2 font-display text-4xl font-bold sm:text-5xl tracking-tight">{fmt(142450)} <span className="text-base font-normal text-muted-foreground">AUD</span></p>
        <p className="mt-1 text-sm text-primary">Aggregated live via Open Banking · refreshed 4 min ago</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Pill icon={<Wallet className="h-3.5 w-3.5" />} label="Bank Accounts" value={fmt(12400)} tone="green" />
          <Pill icon={<PiggyBank className="h-3.5 w-3.5" />} label="Superannuation" value={fmt(85000)} tone="blue" />
          <Pill icon={<Home className="h-3.5 w-3.5" />} label="Property API" value={fmt(545000)} tone="blue" />
          <Pill icon={<Car className="h-3.5 w-3.5" />} label="Auto Valuations" value={fmt(22000)} tone="green" />
          <Pill icon={<CreditCard className="h-3.5 w-3.5" />} label="Credit Cards" value={`- ${fmt(2450)}`} tone="red" />
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Widget 2: Splitting the Bills */}
        <Card className="border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Splitting the Bills</h2>
          <p className="text-sm text-muted-foreground">A simple toggle. No spreadsheets.</p>

          {/* sliding capsule */}
          <div className="relative mt-5 grid grid-cols-2 rounded-full border border-border bg-background/60 p-1 text-sm font-medium">
            <span
              className="absolute inset-y-1 w-1/2 rounded-full bg-primary transition-transform duration-300"
              style={{ transform: bills === "essentials" ? "translateX(0%)" : "translateX(100%)" }}
            />
            <button onClick={() => setBills("essentials")} className={`relative z-10 rounded-full py-2 transition-colors ${bills === "essentials" ? "text-primary-foreground" : "text-muted-foreground"}`}>
              Essentials
            </button>
            <button onClick={() => setBills("fun")} className={`relative z-10 rounded-full py-2 transition-colors ${bills === "fun" ? "text-primary-foreground" : "text-muted-foreground"}`}>
              Fun Spend
            </button>
          </div>

          <div className="mt-5 flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">This month</p>
            <p className="font-display text-2xl font-bold">{fmt(total)}</p>
          </div>

          <div className="mt-3 space-y-2">
            {rows.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3">
                <span className="text-sm">{r.name}</span>
                <span className="font-display text-sm font-semibold">{fmt(r.amount)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Widget 3: Crystal Ball */}
        <Card
          className="border-border p-6 transition-shadow"
          style={{ background: `linear-gradient(160deg, ${ballTone.color}14, var(--surface) 60%)`, boxShadow: `0 20px 60px -30px ${ballTone.color}88` }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">The 12-Month Crystal Ball</h2>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider" style={{ background: `${ballTone.color}22`, color: ballTone.color }}>{ballTone.label}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Slide to see your future cash if you stick to current habits.</p>

          <div className="mt-6 rounded-2xl bg-background/60 p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Projected safe cash in {months} months</p>
            <p className="mt-2 font-display text-4xl font-bold" style={{ color: ballTone.color }}>{fmt(projected)}</p>
            <p className="mt-1 text-xs text-muted-foreground">Based on AI trend of {fmt(monthlyNet)}/mo set aside</p>
          </div>

          <div className="mt-6">
            <Slider min={6} max={12} step={1} value={[months]} onValueChange={(v) => setMonths(v[0])} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>6 mo</span><span>9 mo</span><span>12 mo</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Widget 4: Am I On Track */}
      <Card className="mt-6 border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">Am I On Track?</h2>
        <p className="text-sm text-muted-foreground">Compared to Aussies aged 32, in Brighton East, earning $95k–$110k.</p>

        <PeerTrack you={62} peer={48} />

        <p className="mt-4 flex items-center gap-2 text-sm text-primary">
          <ChevronRight className="h-4 w-4" />
          You are saving 14% faster than the Brighton East average for your age.
        </p>
      </Card>
    </main>
  );
}

function Pill({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "green" | "blue" | "red" }) {
  const c = tone === "green" ? "var(--tl-green)" : tone === "blue" ? "var(--tl-blue)" : "var(--tl-red)";
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5">
      <span style={{ color: c }}>{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold" style={{ color: tone === "red" ? "var(--tl-red)" : "var(--foreground)" }}>{value}</span>
    </div>
  );
}

function PeerTrack({ you, peer }: { you: number; peer: number }) {
  return (
    <div className="mt-6">
      <div className="relative h-3 w-full rounded-full bg-background/60">
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(you, peer) + 10}%`, background: "linear-gradient(90deg, var(--tl-orange), var(--tl-yellow), var(--tl-green), var(--tl-blue))", opacity: 0.35 }} />
        {/* peer marker */}
        <div className="absolute -top-1.5 h-6 w-0.5 bg-muted-foreground" style={{ left: `${peer}%` }} />
        {/* you marker */}
        <div className="absolute -top-2.5 h-8 w-1 rounded-full" style={{ left: `${you}%`, background: "var(--tl-green)", boxShadow: "0 0 16px var(--tl-green)" }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: "var(--tl-green)" }} /> <span className="text-foreground font-semibold">You</span></div>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> <span className="text-muted-foreground">Brighton East avg</span></div>
      </div>
    </div>
  );
}
