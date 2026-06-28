import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { Wallet, PiggyBank, Home, TrendingUp, CreditCard, LineChart as LineIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — MoneyHub" },
      { name: "description", content: "Your total wealth, bills, and savings forecast — all in one calm view." },
    ],
  }),
  component: Dashboard,
});

const wealthSeries = [
  { m: "Jan", value: 162400 },
  { m: "Feb", value: 164100 },
  { m: "Mar", value: 167900 },
  { m: "Apr", value: 169200 },
  { m: "May", value: 172850 },
  { m: "Jun", value: 175100 },
  { m: "Jul", value: 178320 },
  { m: "Aug", value: 181000 },
  { m: "Sep", value: 184520 },
];

const wealthBreakdown = [
  { name: "Property", value: 92000, color: "var(--color-chart-1)" },
  { name: "Super", value: 48200, color: "var(--color-chart-2)" },
  { name: "Cash & Savings", value: 24300, color: "var(--color-chart-3)" },
  { name: "Investments", value: 18420, color: "var(--color-chart-4)" },
  { name: "Credit Cards", value: -1800, color: "var(--color-chart-5)" },
];

const essentials = [
  { name: "Rent", amount: 2400 },
  { name: "Electricity", amount: 185 },
  { name: "Groceries (Coles)", amount: 720 },
  { name: "Health insurance", amount: 165 },
  { name: "Mobile (Telstra)", amount: 55 },
];
const funSpend = [
  { name: "Dining out", amount: 320 },
  { name: "Netflix", amount: 25 },
  { name: "Stan", amount: 17 },
  { name: "Spotify Family", amount: 21 },
  { name: "Weekend trips", amount: 240 },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

function Dashboard() {
  const [months, setMonths] = useState(6);
  const monthlyIn = 7800;
  const monthlyOut = essentials.reduce((s, e) => s + e.amount, 0) + funSpend.reduce((s, e) => s + e.amount, 0);
  const monthlyNet = monthlyIn - monthlyOut;
  const projected = useMemo(() => 24300 + monthlyNet * months, [months, monthlyNet]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm text-muted-foreground">Good afternoon, Sam 👋</p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">My Dashboard</h1>
      </header>

      {/* Total wealth */}
      <Card className="border-border bg-card p-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="h-4 w-4 text-primary" /> My Total Wealth
            </div>
            <p className="mt-2 font-display text-4xl font-bold sm:text-5xl">{fmt(184520)}</p>
            <p className="mt-1 text-sm text-primary">+ {fmt(2140)} this month · +13.6% YTD</p>

            <div className="mt-6 h-56 w-full">
              <ResponsiveContainer>
                <AreaChart data={wealthSeries} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.22 145)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.82 0.22 145)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" />
                  <XAxis dataKey="m" stroke="oklch(0.68 0.01 270)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.68 0.01 270)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "oklch(0.22 0.005 270)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 12, color: "white" }}
                    formatter={(v: number) => fmt(v)}
                  />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.82 0.22 145)" strokeWidth={2} fill="url(#wealthGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Across all your accounts</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <BreakdownPill icon={<Home className="h-4 w-4" />} label="Property" value={fmt(92000)} />
              <BreakdownPill icon={<PiggyBank className="h-4 w-4" />} label="Super" value={fmt(48200)} />
              <BreakdownPill icon={<Wallet className="h-4 w-4" />} label="Cash" value={fmt(24300)} />
              <BreakdownPill icon={<TrendingUp className="h-4 w-4" />} label="Shares" value={fmt(18420)} />
              <BreakdownPill icon={<CreditCard className="h-4 w-4" />} label="Cards" value={`- ${fmt(1800)}`} negative />
            </div>
            <div className="mt-5 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={wealthBreakdown.filter(b=>b.value>0)} dataKey="value" innerRadius={36} outerRadius={62} paddingAngle={3}>
                    {wealthBreakdown.filter(b=>b.value>0).map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.005 270)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Bills split */}
        <Card className="border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Splitting the Bills</h2>
          <p className="text-sm text-muted-foreground">Essentials vs Fun Spend, this month.</p>
          <Tabs defaultValue="essentials" className="mt-5">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="essentials">Essentials · {fmt(essentials.reduce((s,e)=>s+e.amount,0))}</TabsTrigger>
              <TabsTrigger value="fun">Fun Spend · {fmt(funSpend.reduce((s,e)=>s+e.amount,0))}</TabsTrigger>
            </TabsList>
            <TabsContent value="essentials" className="mt-4 space-y-2">
              {essentials.map((e) => <BillRow key={e.name} {...e} />)}
            </TabsContent>
            <TabsContent value="fun" className="mt-4 space-y-2">
              {funSpend.map((e) => <BillRow key={e.name} {...e} />)}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Crystal ball */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <LineIcon className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">12-Month Crystal Ball</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Slide to see your cash if you stick to your current habits.</p>

          <div className="mt-6 rounded-xl bg-background/60 p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Projected cash in {months} months</p>
            <p className="mt-2 font-display text-4xl font-bold text-primary">{fmt(projected)}</p>
            <p className="mt-1 text-xs text-muted-foreground">Based on {fmt(monthlyNet)}/mo saved</p>
          </div>

          <div className="mt-6">
            <Slider min={1} max={12} step={1} value={[months]} onValueChange={(v) => setMonths(v[0])} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>1 mo</span><span>6 mo</span><span>12 mo</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Am I on track */}
      <Card className="mt-6 border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Am I On Track?</h2>
        <p className="text-sm text-muted-foreground">Compared to Aussies aged 32, in Melbourne, earning $95k–$110k.</p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <TrackBar label="Savings" you={24300} peer={18900} suffix="" />
          <TrackBar label="Super balance" you={48200} peer={52400} suffix="" />
        </div>
        <p className="mt-4 text-sm text-primary">You're ahead on savings by 28%. Super is 8% behind peers — easy to catch up.</p>
      </Card>
    </main>
  );
}

function BreakdownPill({ icon, label, value, negative }: { icon: React.ReactNode; label: string; value: string; negative?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="text-primary">{icon}</span>{label}
      </div>
      <p className={`mt-1 font-display text-base font-semibold ${negative ? "text-destructive" : ""}`}>{value}</p>
    </div>
  );
}

function BillRow({ name, amount }: { name: string; amount: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/40 px-4 py-3">
      <span className="text-sm">{name}</span>
      <span className="font-display text-sm font-semibold">{fmt(amount)}</span>
    </div>
  );
}

function TrackBar({ label, you, peer }: { label: string; you: number; peer: number; suffix?: string }) {
  const max = Math.max(you, peer) * 1.15;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">You vs peers</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-xs"><span className="text-primary">You</span><span>{fmt(you)}</span></div>
          <Progress value={(you / max) * 100} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Peers</span><span>{fmt(peer)}</span></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-muted-foreground/60" style={{ width: `${(peer/max)*100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
