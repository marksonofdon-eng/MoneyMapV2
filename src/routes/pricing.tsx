import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Check,
  Tv,
  FolderHeart,
  Home as HomeIcon,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LinkAccountsDialog } from "@/components/link-accounts-dialog";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — MoneyMap | We Only Make Money When You Save Money" },
      {
        name: "description",
        content:
          "MoneyMap is 100% conflict-free. $0 upfront. Our flat $79/yr membership only activates after our AI finds you $500+ in verified household savings.",
      },
      { property: "og:title", content: "MoneyMap Pricing — Conflict-Free, $500+ Savings Guarantee" },
      {
        property: "og:description",
        content:
          "We accept $0 from suppliers, banks or energy companies. You only pay when our AI saves you real money.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,230,118,0.10),transparent_60%),radial-gradient(40%_50%_at_80%_20%,rgba(0,229,255,0.08),transparent_70%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--tl-green)" }} />
            The Fiduciary Proposition
          </div>
          <h1
            className="font-display text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            style={{
              backgroundImage: "linear-gradient(180deg, #F5F5F7 0%, #B8B8C0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We Only Make Money When You Save Money
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            MoneyMap accepts exactly $0 from suppliers, banks, or energy companies. We work 100% for you.
            Our flat membership activates only when our AI secures a minimum of $500 in verified household
            savings.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} label="100% Conflict-Free Fiduciary Model" />
            <TrustBadge icon={<Zap className="h-4 w-4" />} label="Continuous Rate Guard Protection" />
            <TrustBadge icon={<CheckCircle2 className="h-4 w-4" />} label="Cancel Anytime, Keep Your Savings" />
          </div>
        </div>
      </section>

      {/* TWO-TIER GRID */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* CORE */}
          <Card className="relative flex flex-col border-border bg-surface p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MoneyMap Core
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">The Auto-Saver Engine</h2>

            <div className="mt-6">
              <p className="font-display text-5xl font-bold tracking-tight">$0 Upfront</p>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--tl-green)" }}>
                100% Free Until We Find You $500+
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
              Our flat <span className="font-semibold text-foreground">$79/yr (or $6.90/mo)</span> membership
              fee is hardcoded to trigger only AFTER our AI successfully uncovers a minimum of{" "}
              <span className="font-semibold text-foreground">$500 in verified annualized savings</span>{" "}
              across your accounts. If we find less, you pay absolutely nothing.
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Open Banking Instant Live Account Sync",
                "Continuous 24/7 AI Bill & Price Hike Scanner",
                "Single-Click Frictionless Provider Switching (30-Sec Forms)",
                "5-Colour Traffic Light Visual Cashflow View (Blue, Green, Yellow, Orange, Red)",
                "Active shield monitoring against quiet supplier rate hikes",
              ].map((f) => (
                <FeatureRow key={f}>{f}</FeatureRow>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="h-12 w-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green"
              >
                Launch My Free $500+ Savings Scan <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* PREMIUM */}
          <Card
            className="relative flex flex-col border-border bg-surface p-7 sm:p-8"
            style={{ boxShadow: "0 0 0 1px rgba(0,229,255,0.25), 0 30px 80px -30px rgba(0,229,255,0.35)" }}
          >
            <span
              className="absolute -top-3 right-6 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                borderColor: "var(--tl-blue)",
                color: "var(--tl-blue)",
                background: "rgba(0,229,255,0.08)",
              }}
            >
              Most Popular
            </span>

            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--tl-blue)" }}>
              MoneyMap Premium
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">The Automated Wealth Accelerator</h2>

            <div className="mt-6">
              <p className="font-display text-5xl font-bold tracking-tight">
                $4.99 <span className="text-2xl font-semibold text-muted-foreground">/ mo</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Billed annually as an add-on</p>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--tl-green)" }}>
                Can be 100% subsidized by your active bills savings
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
              💡 <span className="font-semibold text-foreground">Native Subsidy:</span> Opt to pay this fee
              directly out of the savings our AI finds for you. It literally pays for itself.
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Includes all features in Core Auto-Saver plan",
                "The 12-Month Crystal Ball predictive interactive slider",
                "Essentials vs. Fun Spend deep simplicity toggle",
                "Am I On Track? Peer matching benchmark engine",
                "Automated Real-Time Credit Score Tracking API",
                "Live Auto & Property Value Tracker APIs",
                "The Stress-Free Mortgage Credit Passport Builder",
              ].map((f) => (
                <FeatureRow key={f}>{f}</FeatureRow>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                variant="outline"
                className="h-12 w-full border-primary/40 bg-background/40 px-6 text-base font-semibold text-foreground backdrop-blur hover:bg-primary/10 hover:text-foreground"
              >
                Unlock My 12-Month Crystal Ball <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* COLLECTIVE SAVINGS MISSION */}
      <SavingsMission />

      {/* VALUE CALCULATOR */}
      <ValueCalculator />

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Loyalty & Conflict-Free</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Straight answers, no fine print</h2>
          </div>

          <Accordion type="single" collapsible className="mt-10 space-y-3">
            <FaqItem
              value="q1"
              q="What stops me from taking your AI's advice and switching manually offline?"
              a="Nothing at all! However, executing the switch inside MoneyMap takes under 30 seconds using your verified Open Banking profile—completely skipping paperwork, brokers, and phone queues. More importantly, using our single-click switch activates the Continuous Rate Guard. If that provider quietly jacks up your rates in 90 days, our 5-colour dashboard alerts you instantly and queues up the next optimal shift. If you leave the app, you turn off your automated financial shield."
            />
            <FaqItem
              value="q2"
              q="How does the $500 Net-Positive Guarantee work?"
              a="It is hardcoded into our billing system. When you securely link your accounts, our AI cross-references your bills against all live Australian market baselines. If the total combined savings discovered across your mortgage, super, insurance, and utilities do not exceed $500, your subscription fee is automatically waived. You will never be out of pocket."
            />
            <FaqItem
              value="q3"
              q="Can I really pay for the Premium Wealth Hub using my savings?"
              a="Yes. When our AI engine trims money off your essential expenses (like saving you $340 on your energy bill), those real-time savings accumulate in your dashboard balance. By toggling on the 'Native Subsidy' feature, a tiny portion of those discovered savings covers your $4.99/mo Premium membership automatically, leaving your personal credit card completely untouched."
            />
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">No upfront cost. No conflict. No catch.</h2>
          <p className="mt-3 text-muted-foreground">
            Scan in 2 minutes. If we can't find you $500+ in savings, you pay $0.
          </p>
          <Button
            onClick={() => setOpen(true)}
            size="lg"
            className="mt-6 h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green"
          >
            Launch My Free $500+ Savings Scan
          </Button>
        </div>
      </section>

      <LinkAccountsDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}

/* --- Building blocks --- */

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15">
        <Check className="h-3.5 w-3.5 text-primary" />
      </span>
      <span className="text-sm leading-relaxed text-muted-foreground">{children}</span>
    </li>
  );
}

function FaqItem({ value, q, a }: { value: string; q: string; a: string }) {
  return (
    <AccordionItem
      value={value}
      className="overflow-hidden rounded-xl border border-border bg-surface px-5"
    >
      <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
        {q}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent>
    </AccordionItem>
  );
}

/* --- Calculator --- */

function ValueCalculator() {
  const [bills, setBills] = useState(800);

  const { mortgage, utilities, superFees, subs, total } = useMemo(() => {
    const mortgage = Math.round(bills * 1.5);
    const utilities = Math.round(bills * 0.35);
    const superFees = 220;
    const subs = 95;
    return { mortgage, utilities, superFees, subs, total: mortgage + utilities + superFees + subs };
  }, [bills]);

  const fmt = (n: number) => `$${n.toLocaleString("en-AU")}`;

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--tl-blue)" }}>
            The Value Calculator
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            See how the $500+ target is built
          </h2>
          <p className="mt-3 text-muted-foreground">
            Move the slider to your typical monthly household bills and watch our AI baseline projections
            update in real time.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-10">
          <label className="block text-sm font-medium text-muted-foreground">
            Select your estimated monthly household bills (Mortgage, Electricity, Insurance, Internet,
            Streaming):
          </label>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span>$200</span>
            <span className="font-display text-2xl font-bold text-foreground">{fmt(bills)}<span className="text-sm font-medium text-muted-foreground"> / mo</span></span>
            <span>$2,000</span>
          </div>
          <Slider
            value={[bills]}
            min={200}
            max={2000}
            step={10}
            onValueChange={(v) => setBills(v[0] ?? 800)}
            className="mt-3"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CalcBlock
              icon={<HomeIcon className="h-5 w-5" />}
              tone="var(--tl-green)"
              title="Home Loan Rate Audit"
              line={`Projected Mortgage Win: ${fmt(mortgage)} / yr average baseline`}
            />
            <CalcBlock
              icon={<Zap className="h-5 w-5" />}
              tone="var(--tl-blue)"
              title="Utilities & Connectivity"
              line={`Electricity & Broadband Check: ${fmt(utilities)} / yr average saved`}
            />
            <CalcBlock
              icon={<FolderHeart className="h-5 w-5" />}
              tone="var(--tl-yellow)"
              title="Superannuation Fees"
              line={`Lost Super & Fee Cleanup: ${fmt(superFees)} / yr flat baseline`}
            />
            <CalcBlock
              icon={<Tv className="h-5 w-5" />}
              tone="var(--tl-orange)"
              title="Wasted Subscriptions"
              line={`Dormant Trials & Duplicate Streams: ${fmt(subs)} / yr flat baseline`}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6 text-center sm:p-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Your Estimated Net Savings
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              <span style={{ color: "var(--tl-green)" }}>+{fmt(total)} AUD</span>
              <span className="text-xl font-semibold text-muted-foreground"> / year</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Baseline projection. Actual results depend on your live Open Banking data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcBlock({
  icon,
  tone,
  title,
  line,
}: {
  icon: React.ReactNode;
  tone: string;
  title: string;
  line: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-5">
      <div
        className="grid h-9 w-9 place-items-center rounded-lg"
        style={{ background: `${tone}1F`, color: tone }}
      >
        {icon}
      </div>
      <h4 className="mt-3 font-display text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{line}</p>
    </div>
  );
}

/* --- Collective Savings Mission --- */

function useCountUp(target: number, durationMs = 1800, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, start]);
  return value;
}

function SavingsMission() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Core economics
  const perAccount = 532;
  const customers = 1000;
  const annual = perAccount * customers; // $532,000 / yr
  const threeYear = perAccount * 3 * customers; // $1,596,000

  // Trajectory: quarterly, current → end-2026 ($1B goal) → end-2027 ($3B stretch)
  // Q3 2026 is "now". Mark current at ~$0.5M cumulative collective savings.
  const points = [
    { label: "Q3 '26", value: 0.0005, current: true }, // $0.5M ≈ today
    { label: "Q4 '26", value: 0.18 },
    { label: "Q1 '27", value: 0.42 },
    { label: "Q2 '27", value: 0.68 },
    { label: "Q3 '27", value: 1.0, goal: true }, // $1B mission
    { label: "Q4 '27", value: 1.55 },
    { label: "EOY '27", value: 2.2 },
  ];

  const W = 800;
  const H = 280;
  const PAD_L = 40;
  const PAD_R = 20;
  const PAD_T = 20;
  const PAD_B = 36;
  const maxV = 2.4; // in $B
  const xStep = (W - PAD_L - PAD_R) / (points.length - 1);
  const yFor = (v: number) => PAD_T + (H - PAD_T - PAD_B) * (1 - v / maxV);
  const xFor = (i: number) => PAD_L + i * xStep;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`)
    .join(" ");
  const areaPath = `${linePath} L ${xFor(points.length - 1)} ${H - PAD_B} L ${xFor(0)} ${H - PAD_B} Z`;

  const annualCount = useCountUp(annual, 1800, visible);
  const threeYearCount = useCountUp(threeYear, 2200, visible);
  const perAccountCount = useCountUp(perAccount, 1400, visible);

  const fmtAUD = (n: number) =>
    `$${Math.round(n).toLocaleString("en-AU")}`;

  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--tl-green) 14%, transparent), transparent 70%), radial-gradient(40% 40% at 90% 100%, color-mix(in oklab, var(--tl-blue) 12%, transparent), transparent 70%)",
        }}
      />
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
            <Flag className="h-3.5 w-3.5" style={{ color: "var(--tl-green)" }} />
            The 2026 Mission
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Saving Australia{" "}
            <span style={{ color: "var(--tl-green)" }}>$1 Billion</span> by end of 2026
          </h2>
          <p className="mt-3 text-muted-foreground">
            For our first <span className="font-semibold text-foreground">1,000 customers</span> we
            uncovered an average of{" "}
            <span className="font-semibold text-foreground">$532 per account</span>. Multiply that
            across every Aussie household and the collective opportunity is enormous.
          </p>
        </div>

        {/* Headline stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            tone="var(--tl-blue)"
            label="First 1,000 customers"
            value={fmtAUD(perAccountCount)}
            sub="avg. verified saving per account"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            tone="var(--tl-green)"
            label="Collective savings / 12 mo"
            value={fmtAUD(annualCount)}
            sub="across our founding cohort"
          />
          <StatCard
            icon={<Target className="h-5 w-5" />}
            tone="var(--tl-yellow)"
            label="Compounded over 3 years"
            value={fmtAUD(threeYearCount)}
            sub="$1,596 saved per household"
          />
        </div>

        {/* Animated chart */}
        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Collective Savings Trajectory
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">
                From founding cohort to $1B mission — and beyond
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--tl-blue)" }} />
                Today
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--tl-green)" }} />
                $1B Goal (EOY 2026)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--tl-yellow)" }} />
                2027 Trajectory
              </span>
            </div>
          </div>

          <div className="mt-6 w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full"
              preserveAspectRatio="none"
              role="img"
              aria-label="Collective savings trajectory chart"
            >
              <defs>
                <linearGradient id="savingsArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--tl-green)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--tl-green)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="savingsLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--tl-blue)" />
                  <stop offset="55%" stopColor="var(--tl-green)" />
                  <stop offset="100%" stopColor="var(--tl-yellow)" />
                </linearGradient>
              </defs>

              {/* gridlines */}
              {[0, 0.5, 1, 1.5, 2].map((g) => (
                <g key={g}>
                  <line
                    x1={PAD_L}
                    x2={W - PAD_R}
                    y1={yFor(g)}
                    y2={yFor(g)}
                    stroke="currentColor"
                    className="text-border"
                    strokeDasharray="3 4"
                    strokeWidth={1}
                  />
                  <text
                    x={PAD_L - 8}
                    y={yFor(g) + 4}
                    textAnchor="end"
                    className="fill-muted-foreground"
                    style={{ fontSize: 10 }}
                  >
                    ${g === 0 ? "0" : `${g}B`}
                  </text>
                </g>
              ))}

              {/* $1B goal marker */}
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={yFor(1)}
                y2={yFor(1)}
                stroke="var(--tl-green)"
                strokeOpacity="0.5"
                strokeWidth={1.2}
                strokeDasharray="6 6"
              />

              {/* area */}
              <path
                d={areaPath}
                fill="url(#savingsArea)"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 900ms ease 300ms",
                }}
              />
              {/* line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#savingsLine)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 2000,
                  strokeDashoffset: visible ? 0 : 2000,
                  transition: "stroke-dashoffset 2000ms cubic-bezier(.4,0,.2,1)",
                }}
              />

              {/* points */}
              {points.map((p, i) => {
                const cx = xFor(i);
                const cy = yFor(p.value);
                const color = p.current
                  ? "var(--tl-blue)"
                  : p.goal
                    ? "var(--tl-green)"
                    : "var(--tl-yellow)";
                return (
                  <g
                    key={p.label}
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 400ms ease ${600 + i * 180}ms, transform 400ms ease ${600 + i * 180}ms`,
                    }}
                  >
                    {(p.current || p.goal) && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={14}
                        fill={color}
                        opacity={0.18}
                        className="animate-ping"
                      />
                    )}
                    <circle cx={cx} cy={cy} r={p.current || p.goal ? 6 : 4} fill={color} />
                    {p.goal && (
                      <text
                        x={cx}
                        y={cy - 18}
                        textAnchor="middle"
                        className="fill-foreground"
                        style={{ fontSize: 11, fontWeight: 700 }}
                      >
                        $1B Mission
                      </text>
                    )}
                    {p.current && (
                      <text
                        x={cx}
                        y={cy - 18}
                        textAnchor="middle"
                        className="fill-foreground"
                        style={{ fontSize: 11, fontWeight: 700 }}
                      >
                        You are here
                      </text>
                    )}
                    <text
                      x={cx}
                      y={H - PAD_B + 18}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: 10 }}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MissionStat label="Today" value="$0.5M" tone="var(--tl-blue)" hint="founding cohort to date" />
            <MissionStat label="End of 2026" value="$1B" tone="var(--tl-green)" hint="our public commitment" />
            <MissionStat label="End of 2027" value="$2.2B" tone="var(--tl-yellow)" hint="projected trajectory" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Every member moves the line. Join us — keep your $532, multiply the mission.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  tone,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-transform hover:-translate-y-0.5"
      style={{
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 12%, transparent)`,
      }}
    >
      <div
        className="grid h-9 w-9 place-items-center rounded-lg"
        style={{ background: `color-mix(in oklab, ${tone} 18%, transparent)`, color: tone }}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className="mt-1 font-display text-3xl font-bold tracking-tight tabular-nums"
        style={{ color: tone }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function MissionStat({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string;
  tone: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold" style={{ color: tone }}>
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
