import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, Target } from "lucide-react";

export const Route = createFileRoute("/wealth")({
  head: () => ({
    meta: [
      { title: "My Wealth Tool — MoneyHub" },
      { name: "description", content: "Project your net worth and see what a small monthly habit becomes in 10 years." },
    ],
  }),
  component: Wealth,
});

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

function Wealth() {
  const [start, setStart] = useState(24300);
  const [monthly, setMonthly] = useState(800);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);

  const data = useMemo(() => {
    const r = rate / 100 / 12;
    const months = years * 12;
    let bal = start;
    const out: { y: string; value: number; contrib: number }[] = [];
    let contrib = start;
    for (let i = 0; i <= months; i++) {
      if (i % 12 === 0) {
        out.push({ y: `Y${i / 12}`, value: Math.round(bal), contrib: Math.round(contrib) });
      }
      bal = bal * (1 + r) + monthly;
      contrib += monthly;
    }
    return out;
  }, [start, monthly, years, rate]);

  const final = data[data.length - 1];
  const earned = final.value - final.contrib;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">My Wealth Tool</h1>
        <p className="mt-2 text-muted-foreground">See what small, steady habits become over time. No spreadsheets required.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Inputs</h2>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="start">Starting balance</Label>
              <Input id="start" type="number" value={start} onChange={(e) => setStart(Number(e.target.value) || 0)} className="mt-1" />
            </div>

            <div>
              <div className="flex justify-between"><Label>Monthly contribution</Label><span className="text-sm text-primary font-semibold">{fmt(monthly)}</span></div>
              <Slider className="mt-3" min={0} max={3000} step={50} value={[monthly]} onValueChange={(v) => setMonthly(v[0])} />
            </div>

            <div>
              <div className="flex justify-between"><Label>Time horizon</Label><span className="text-sm text-primary font-semibold">{years} years</span></div>
              <Slider className="mt-3" min={1} max={30} step={1} value={[years]} onValueChange={(v) => setYears(v[0])} />
            </div>

            <div>
              <div className="flex justify-between"><Label>Expected return</Label><span className="text-sm text-primary font-semibold">{rate}%</span></div>
              <Slider className="mt-3" min={2} max={12} step={0.5} value={[rate]} onValueChange={(v) => setRate(v[0])} />
              <p className="mt-2 text-xs text-muted-foreground">Long-term ASX200 average is ~7–9% incl. dividends.</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Tile label="In your pocket" value={fmt(final.value)} accent />
            <Tile label="Total contributed" value={fmt(final.contrib)} />
            <Tile label="Earned by compounding" value={fmt(earned)} />
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.22 145)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.82 0.22 145)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.15 200)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.72 0.15 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" />
                <XAxis dataKey="y" stroke="oklch(0.68 0.01 270)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.68 0.01 270)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.005 270)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} />
                <Area type="monotone" dataKey="contrib" stroke="oklch(0.72 0.15 200)" strokeWidth={2} fill="url(#g2)" name="Contributed" />
                <Area type="monotone" dataKey="value" stroke="oklch(0.82 0.22 145)" strokeWidth={2} fill="url(#g1)" name="With growth" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-primary">
            <TrendingUp className="h-4 w-4" /> Saving {fmt(monthly)} a month for {years} years could grow to {fmt(final.value)}.
          </div>
        </Card>
      </div>
    </main>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${accent ? "bg-primary/10" : "bg-background/50"}`}>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-2xl font-bold ${accent ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}
