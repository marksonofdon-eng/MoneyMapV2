import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, TrendingDown, EyeOff, FileX, AlertCircle, Lock, Home, CheckCircle2, Link2, Search, Bell, Zap, Smartphone, Wifi, Droplets, Quote, Star, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkAccountsDialog } from "@/components/link-accounts-dialog";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoneyMap — Beat the Cost of Living Crisis" },
      { name: "description", content: "MoneyMap finds bill savings today and monitors your accounts 24/7 — alerting you to price hikes, loyalty tax, and better deals before they cost you again." },
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
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--tl-green) 10%, transparent), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20 pt-16 sm:gap-10 sm:px-6 sm:pt-24 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12 lg:px-8 lg:pt-28 xl:grid-cols-[0.9fr_1.1fr] xl:gap-16">
          {/* Headline + explanation */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <h1
              className="font-display overflow-visible pb-1 text-[2.2rem] font-bold leading-[1.18] tracking-tight sm:pb-1.5 sm:text-5xl sm:leading-[1.14] lg:text-[3.5rem] lg:leading-[1.1]"
              style={{
                backgroundImage: "linear-gradient(180deg, #F5F5F7 0%, #B8B8C0 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                paddingBottom: "0.12em",
              }}
            >
              Beat the cost of living crisis.
            </h1>
            <p className="mt-7 max-w-xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
              MoneyMap scans your bills to find missed savings TODAY. Sign up for continuous monthly monitoring. If bills
              increase or we find a better deal, you get alerted instantly.
            </p>
          </div>

          {/* Radar — after explanation on mobile; right column on desktop */}
          <div className="order-2 w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <ProgressArc />
          </div>

          {/* Monitoring strip + CTA — after radar on mobile */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <HeroMonitoringPoints />
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="h-12 w-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green sm:w-auto"
              >
                Claim Your Hidden Savings Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              Connect once · 24/7 monitoring · Secured via Open Banking
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorksSection />

      {/* TESTIMONIALS */}
      <CustomerTestimonialsSection />

      {/* PROBLEM */}
      <ProblemSection />

      {/* SECURE VAULT */}
      <SecureVaultSection />

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to put it on cruise control?</h2>
          <p className="mt-3 text-muted-foreground">Join thousands of Aussies clawing back the loyalty tax — quietly.</p>
          <Button onClick={() => setOpen(true)} size="lg" className="mt-6 h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green">
            Claim Your Hidden Savings Now
          </Button>
        </div>
      </section>

      <LinkAccountsDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}

const HERO_MONITORING_POINTS = [
  {
    icon: Search,
    title: "Find savings",
    body: "Identify immediate bill savings today",
  },
  {
    icon: Radar,
    title: "Stay Protected",
    body: "We monitor for hidden bill price hikes.",
  },
  {
    icon: Bell,
    title: "Get Alerted",
    body: "We send you real savings, zero hassle.",
  },
] as const;

function HeroMonitoringPoints({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        We monitor for savings. Month after month after month.
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
        {HERO_MONITORING_POINTS.map((point) => {
          const Icon = point.icon;
          return (
            <li
              key={point.title}
              className="rounded-xl border border-border/80 bg-surface/60 px-3.5 py-3 sm:px-4 sm:py-3.5"
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{point.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">{point.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* --- How It Works --- */
function HowItWorksSection() {
  const steps = [
    {
      icon: Link2,
      title: "1. Link your accounts",
      body: "Connect your banks, super and credit cards in under 2 minutes via Australia's official Open Banking (CDR) system. Read-only — we can never move your money.",
    },
    {
      icon: Search,
      title: "2. We scan bills for savings",
      body: "MoneyMap monitors your internet, mobile, energy, utilities, insurance and subscriptions using Australia's leading proprietary bill tracking technology. We spot silent price rises and cheaper plans that match your actual usage.",
    },
    {
      icon: Bell,
      title: "3. Switch and Save Alerts",
      body: "When we find a better deal, you get a clear alert with a Switch & Save action. No forms, no call centres, no loyalty tax — just real money back in your pocket.",
    },
  ];

  const categories = [
    { icon: Wifi, label: "Internet" },
    { icon: Smartphone, label: "Mobile" },
    { icon: Zap, label: "Energy" },
    { icon: Droplets, label: "Utilities" },
    { icon: Home, label: "Insurance" },
    { icon: TrendingDown, label: "Subscriptions" },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it Works</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">We only make money when you save money.</h2>
            <p className="mt-4 text-muted-foreground">
              No spreadsheets. No comparison-site rabbit holes. MoneyMap automatically alerts you when a better deal is
              available for the same service.
            </p>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">We watch the bills that hurt most</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <div
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <c.icon className="h-3.5 w-3.5 text-muted-foreground/70" />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol className="relative space-y-0">
            {steps.map((s, index) => (
              <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0">
                {index < steps.length - 1 ? (
                  <span
                    className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-primary/40 to-border/40"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <Card className="flex-1 border-border bg-surface p-5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{s.title.replace(/^\d+\.\s*/, "")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const CUSTOMER_TESTIMONIALS = [
  {
    quote:
      "I'd been on the same energy plan for four years. MoneyMap flagged a loyalty tax hike I'd never have noticed — switched in one tap and I'm saving $340 a year.",
    name: "Sarah M.",
    location: "Brighton, VIC",
    savings: "$340/yr",
    category: "Energy",
  },
  {
    quote:
      "Honestly thought our NBN and mobile bills were fine. Turned out we were overpaying on both lines. The alerts made it stupidly easy to fix.",
    name: "James T.",
    location: "Newcastle, NSW",
    savings: "$960/yr",
    category: "Mobile & NBN",
  },
  {
    quote:
      "I hate comparison sites and call centres. This just watches in the background and pings me when something's worth switching. Set and forget.",
    name: "Priya K.",
    location: "Fortitude Valley, QLD",
    savings: "$420/yr",
    category: "Utilities & subs",
  },
] as const;

function CustomerTestimonialsSection() {
  const [featured, ...rest] = CUSTOMER_TESTIMONIALS;

  return (
    <section className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Real Australians, real savings</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">What our customers are saying</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Card className="flex flex-col border-border bg-surface p-7 sm:p-8 lg:min-h-[22rem]">
            <Quote className="h-10 w-10 text-primary/30" aria-hidden />
            <div className="mt-4 flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-display text-lg font-medium leading-relaxed sm:text-xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-end justify-between gap-4 border-t border-border/60 pt-6">
              <div>
                <p className="font-display text-base font-semibold">{featured.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{featured.location}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold tabular-nums text-primary">{featured.savings}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{featured.category}</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-5">
            {rest.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="flex flex-1 flex-col border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold tabular-nums text-primary">{testimonial.savings}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{testimonial.category}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ProblemSection() {
  const problems = [
    {
      tone: "orange" as const,
      icon: <AlertCircle className="h-5 w-5" />,
      title: "The Loyal Customer Tax",
      body: "Companies quietly move old customers to expensive plans while saving the cheapest, unadvertised deals for brand new sign-ups.",
    },
    {
      tone: "red" as const,
      icon: <EyeOff className="h-5 w-5" />,
      title: "The Compare-Site Scam",
      body: "Old comparison websites make you do all the work yourself, take commissions from big providers, and only offer a quick, one-off fix.",
    },
    {
      tone: "yellow" as const,
      icon: <FileX className="h-5 w-5" />,
      title: "Too Much Admin",
      body: "Old budgeting apps fail because they force you to manually track every coffee, scan paper bills, and mess around with spreadsheets.",
    },
  ];

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">The Problem</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Why your bills keep getting more expensive</h2>
          </div>
          <p className="text-muted-foreground lg:pb-1 lg:text-right">
            Most Australians are overpaying on autopilot — not because they&apos;re careless, but because the system is
            designed to reward churn, not loyalty.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {problems.map((problem, index) => (
            <ProblemRow key={problem.title} {...problem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SecureVaultSection() {
  const pillars = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Bank-Grade Encryption",
      body: "256-bit AES. Encrypted in transit and at rest, end to end.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "APRA Regulated Open Banking",
      body: "Accredited CDR data recipient. Audited under Australian law.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Read-Only Data Isolation",
      body: "We can see your transactions. We can never move your money.",
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
            <div className="grid h-full w-full grid-cols-10 gap-3 p-3">
              {Array.from({ length: 60 }).map((_, i) => (
                <Lock key={i} className="h-5 w-5" />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="max-w-2xl">
              <p className="eyebrow-blue">Your Secure Data Vault</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Bank-grade security. You&apos;re always in control.
              </h2>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background/40">
              <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {pillars.map((pillar) => (
                  <Pillar key={pillar.title} {...pillar} />
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-8 rounded-2xl border border-tl-blue/25 bg-gradient-to-br from-tl-blue/10 via-transparent to-transparent p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="badge-blue inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> Consumer Data Right
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  You grant access. You can revoke it anytime.
                </h3>
                <p className="mt-3 text-muted-foreground">
                  MoneyMap connects through Australia&apos;s official Open Banking framework — the same regulated
                  system your bank uses. You choose which accounts to link, we only ever receive read-only data, and
                  you can disconnect in one tap. Your data is never sold or shared with advertisers.
                </p>
              </div>
              <div className="relative glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-tl-blue/15 text-tl-blue">
                    <Lock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Vault connection</p>
                    <p className="text-xs text-muted-foreground">Secured via official CDR gateway</p>
                  </div>
                </div>
                <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">Encryption status</p>
                <p className="mt-1 font-display text-3xl font-bold text-tl-blue">AES-256</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-full rounded-full bg-tl-blue" />
                </div>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-tl-blue" />
                    Read-only access — we can never move your money
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-tl-blue" />
                    APRA-regulated CDR accredited recipient
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-tl-blue" />
                    Encrypted in transit and at rest, end to end
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressArc() {
  const stops = [
    { c: "var(--tl-red)", label: "Bill Alert" },
    { c: "var(--tl-orange)", label: "Assess" },
    { c: "var(--tl-yellow)", label: "Switch" },
    { c: "var(--tl-green)", label: "Save" },
  ];
  const stageSequence = [
    { progress: 0, holdMs: 3200 },
    { progress: 0.35, holdMs: 900 },
    { progress: 0.65, holdMs: 900 },
    { progress: 1, holdMs: 3200 },
  ];
  const forwardTransitionMs = 450;
  const rollbackTransitionMs = 1400;
  const [progress, setProgress] = useState(stageSequence[0].progress);
  useEffect(() => {
    let cancelled = false;
    let currentProgress = stageSequence[0].progress;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const animateTo = (target: number, duration: number) =>
      new Promise<void>((resolve) => {
        const start = currentProgress;
        const t0 = performance.now();
        const tick = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - t0) / duration);
          const eased = t * (2 - t);
          const p = start + (target - start) * eased;
          currentProgress = p;
          setProgress(p);
          if (t < 1) requestAnimationFrame(tick);
          else {
            currentProgress = target;
            setProgress(target);
            resolve();
          }
        };
        requestAnimationFrame(tick);
      });

    const runLoop = async () => {
      while (!cancelled) {
        await delay(stageSequence[0].holdMs);
        if (cancelled) break;

        for (let idx = 1; idx < stageSequence.length; idx++) {
          await animateTo(stageSequence[idx].progress, forwardTransitionMs);
          if (cancelled) break;
          await delay(stageSequence[idx].holdMs);
        }

        if (cancelled) break;
        await animateTo(0, rollbackTransitionMs);
      }
    };

    runLoop();
    return () => {
      cancelled = true;
    };
  }, []);

  // arc geometry — half circle from Today (left) to Year 3 (right)
  const R = 175;
  const cx = 215;
  const cy = 188;
  const arcPath = `M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`;
  const visualProgress = Math.min(1, Math.max(0, progress));
  const angle = Math.PI * (1 - visualProgress);
  const px = cx + R * Math.cos(angle);
  const py = cy + R * Math.sin(angle);
  const savings = Math.round(1500 + visualProgress * (10000 - 1500));

  const tone =
    visualProgress < 0.25 ? stops[0] :
    visualProgress < 0.5 ? stops[1] :
    visualProgress < 0.75 ? stops[2] : stops[3];

  return (
    <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-none">
      <div className="glass-card rounded-3xl p-7 sm:p-9 lg:p-10" style={{ boxShadow: `0 30px 80px -30px ${tone.c}55` }}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">Your Financial Savings</p>
            <p className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: tone.c }}>{tone.label}</p>
          </div>
          <div className="flex items-center gap-2">
            {stops.map((s) => (
              <span key={s.label} className="h-3 w-3 rounded-full sm:h-3.5 sm:w-3.5" style={{ background: s.c, opacity: s.label === tone.label ? 1 : 0.35 }} />
            ))}
          </div>
        </div>

        <svg viewBox="0 0 430 235" className="mt-5 w-full sm:mt-6">
          <defs>
            <linearGradient id="arcgrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--tl-red)" />
              <stop offset="33%" stopColor="var(--tl-orange)" />
              <stop offset="66%" stopColor="var(--tl-yellow)" />
              <stop offset="100%" stopColor="var(--tl-green)" />
            </linearGradient>
          </defs>
          <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" strokeLinecap="round" />
          <path
            d={arcPath}
            fill="none"
            stroke="url(#arcgrad)"
            strokeWidth="18"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - visualProgress}
          />
          <circle cx={px} cy={py} r="13" fill={tone.c} stroke="#0E0F12" strokeWidth="3" />
          <text x={cx} y={cy - 24} textAnchor="middle" fontFamily="Inter" fontSize="13" fill="#8E8E93" letterSpacing="2">3 YEAR SAVINGS</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Inter" fontSize="36" fontWeight="700" fill="#F5F5F7">${savings.toLocaleString()}</text>
        </svg>

        <div className="mt-3 flex justify-between text-xs text-muted-foreground sm:text-sm">
          <span>Today</span><span>Year 1</span><span>Year 3</span>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-50 blur-3xl sm:-inset-12" style={{ background: `radial-gradient(circle, ${tone.c}44, transparent 70%)` }} />
    </div>
  );
}

function ProblemRow({
  icon,
  title,
  body,
  tone,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: "orange" | "red" | "yellow";
  index: number;
}) {
  const colorMap = { orange: "var(--tl-orange)", red: "var(--tl-red)", yellow: "var(--tl-yellow)" };
  const c = colorMap[tone];

  return (
    <div className="group flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
      <div
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl sm:h-14 sm:w-14"
        style={{ background: `${c}1F`, color: c }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span
            className="font-display text-3xl font-bold tabular-nums leading-none opacity-20"
            style={{ color: c }}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg font-semibold sm:text-xl">{title}</h3>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-2.5">{body}</p>
      </div>
      <span className="hidden h-px flex-1 bg-border/60 lg:block lg:max-w-[4rem]" aria-hidden />
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="p-6 sm:p-7">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-tl-blue/15 text-tl-blue">{icon}</div>
      <h4 className="mt-4 font-display text-base font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
