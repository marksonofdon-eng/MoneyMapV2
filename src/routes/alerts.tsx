import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Zap,
  Wifi,
  Smartphone,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  Shield,
  Activity,
  Sparkles,
  Radar,
  CreditCard,
  Landmark,
  UserPlus,
  Receipt,
  ArrowLeftRight,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkAccountsDialog } from "@/components/link-accounts-dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Bill Savings Alerts — MoneyMap" },
      {
        name: "description",
        content:
          "MoneyMap reviews your expenses, finds savings in our market database, and proposes one-tap switches — month after month. No savings found, no pay.",
      },
    ],
  }),
  component: Alerts,
});

interface TodayAction {
  id: string;
  icon: LucideIcon;
  category: string;
  saveLabel: string;
  title: string;
}

interface WatchItem {
  id: string;
  icon: LucideIcon;
  category: string;
  saveLabel: string;
  title: string;
  eta: string;
}

interface LeakItem {
  label: string;
  amount: number;
  icon: LucideIcon;
}

const YESTERDAY_LEAKS: LeakItem[] = [
  { label: "Energy loyalty tax", amount: 340, icon: Zap },
  { label: "Mobile overpay · 2 lines", amount: 720, icon: Smartphone },
  { label: "NBN plan drift", amount: 240, icon: Wifi },
  { label: "Unused subscriptions", amount: 300, icon: CreditCard },
  { label: "Bank & account fees", amount: 96, icon: Landmark },
];

const YESTERDAY_TOTAL = YESTERDAY_LEAKS.reduce((sum, item) => sum + item.amount, 0);

const PAGE_STATS = [
  { beat: "Leak", label: "Missed Savings last year", value: 1696, highlight: "loss" as const },
  { beat: "Recover", label: "Savings available today", value: 580, highlight: "savings" as const },
  { beat: "Protect", label: "Savings next year", value: 606, highlight: "watch" as const },
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    title: "Sign up to MoneyMap",
    description: "Create your account in under a minute — no card required to start.",
    icon: UserPlus,
  },
  {
    title: "Connect to Australian Government Open Banking",
    description: "Securely link your accounts via the Consumer Data Right — read-only, bank-grade encryption.",
    icon: Landmark,
  },
  {
    title: "Review expenses",
    description: "MoneyMap categorises every bill, subscription, and fee across your linked accounts.",
    icon: Receipt,
  },
  {
    title: "Identify switch savings",
    description: "We match your usage to cheaper equivalents in our live market database.",
    icon: ArrowLeftRight,
  },
  {
    title: "Save money",
    description: "Queue one-tap switches and let autopilot keep watching — no savings found, no pay.",
    icon: PiggyBank,
  },
] as const;

function AlertsHeroSection({
  alertCount,
  previewActions,
  onActivate,
}: {
  alertCount: number;
  previewActions: TodayAction[];
  onActivate: () => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full min-h-[32rem] page-hero-glow"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,22rem)] lg:items-center lg:gap-12 xl:gap-16">
          <div>
            <div className="badge-blue mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
              <Activity className="h-3.5 w-3.5" />
              Bill Savings Alerts · live scan
            </div>
            <h1
              className="max-w-xl font-display text-[2rem] font-bold leading-[1.06] tracking-tight sm:text-4xl lg:text-[2.85rem]"
              style={{
                backgroundImage: "linear-gradient(180deg, #F5F5F7 0%, #B8B8C0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {fmtAud(TODAY_RECOVERABLE)} sitting on your table.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {alertCount} bill switches are ready right now. Activate MoneyMap to recover what slipped through last
              year — and let autopilot watch tomorrow&apos;s bills for you.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={onActivate}
                className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green group"
              >
                Activate MoneyMap
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-tl-blue" />
              Updated this morning · Secured via Australian Open Banking
            </p>
          </div>

          <TodayFocalCard
            alertCount={alertCount}
            previewActions={previewActions}
            onActivate={onActivate}
          />
        </div>

        <SavingsJourneyStrip className="mt-12" />
      </div>
    </section>
  );
}

function TodayFocalCard({
  alertCount,
  previewActions,
  onActivate,
}: {
  alertCount: number;
  previewActions: TodayAction[];
  onActivate: () => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
      <div
        className="glass-card relative overflow-hidden rounded-3xl border border-primary/25 p-6 sm:p-7"
        style={{ boxShadow: "0 30px 80px -35px color-mix(in oklab, var(--primary) 45%, transparent)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 65%)",
          }}
          aria-hidden
        />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Recover · Today</p>
            </div>
            <p className="text-[10px] text-muted-foreground">Scan complete</p>
          </div>

          <p className="mt-6 font-display text-5xl font-bold tabular-nums leading-none text-primary drop-shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_30%,transparent)] sm:text-6xl">
            {fmtAud(TODAY_RECOVERABLE)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {alertCount} alert{alertCount === 1 ? "" : "s"} ready to action
          </p>

          <ul className="mt-5 space-y-2 border-t border-border/50 pt-5">
            {previewActions.map((action) => {
              const Icon = action.icon;
              return (
                <li key={action.id} className="flex items-center gap-2.5 text-xs">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">
                    <span className="text-foreground/85">{action.category}</span>
                    {" · "}
                    {action.title}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-primary">{action.saveLabel}</span>
                </li>
              );
            })}
            {alertCount > previewActions.length ? (
              <li className="pt-1 text-[11px] text-muted-foreground">
                +{alertCount - previewActions.length} more in your feed
              </li>
            ) : null}
          </ul>

          <Button
            onClick={onActivate}
            className="mt-6 h-11 w-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-green"
          >
            Recover these savings
          </Button>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }}
        aria-hidden
      />
    </div>
  );
}

function SavingsJourneyStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-surface/20 px-5 py-5 sm:px-8 sm:py-6",
        className,
      )}
    >
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
        {PAGE_STATS.map((stat, index) => {
          const isLoss = stat.highlight === "loss";
          const isToday = stat.highlight === "savings";
          const isWatch = stat.highlight === "watch";

          return (
            <div
              key={stat.beat}
              className={cn(
                "min-w-0",
                index > 0 && "border-t border-border/35 pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {stat.beat}
              </p>
              <p
                className={cn(
                  "mt-1 font-display text-2xl font-bold tabular-nums tracking-tight sm:text-[1.85rem]",
                  isLoss && "text-[var(--tl-red)]",
                  isToday && "text-primary",
                  isWatch && "text-tl-blue",
                )}
              >
                {fmtAud(stat.value)}
              </p>
              <p className="mt-1.5 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TODAY_RECOVERABLE = 580;
const TOMORROW_QUEUED = 606;

function fmtAud(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

function Alerts() {
  const [linkOpen, setLinkOpen] = useState(false);

  const todayActions: TodayAction[] = [
    {
      id: "energy",
      icon: Zap,
      category: "Energy",
      saveLabel: "$340/yr",
      title: "Rate hike detected this morning",
    },
    {
      id: "internet",
      icon: Wifi,
      category: "NBN",
      saveLabel: "$20/mo",
      title: "Faster plan, lower price",
    },
    {
      id: "mobile",
      icon: Smartphone,
      category: "Mobile · 2 lines",
      saveLabel: "$60/mo",
      title: "Both plans overpriced for usage",
    },
    {
      id: "gym",
      icon: Dumbbell,
      category: "Subscription",
      saveLabel: "$300/yr",
      title: "Gym membership unused · 4 months",
    },
  ];

  const watchQueue: WatchItem[] = [
    {
      id: "mobile-scan",
      icon: Smartphone,
      category: "Mobile",
      saveLabel: "$15/mo",
      title: "New 5G plan matches your 42GB average",
      eta: "Next scan · 12 days",
    },
    {
      id: "nbn-scan",
      icon: Wifi,
      category: "NBN",
      saveLabel: "$22/mo",
      title: "Wholesale NBN 50 tier repriced lower",
      eta: "Queued · this week",
    },
    {
      id: "fees",
      icon: Sparkles,
      category: "Banking",
      saveLabel: "$96/yr",
      title: "Idle account still paying keeping fees",
      eta: "Review · 18 days",
    },
    {
      id: "insurance",
      icon: ShieldCheck,
      category: "Insurance",
      saveLabel: "$140/yr",
      title: "Car policy overpriced vs clean record",
      eta: "Renewal window · 24 days",
    },
    {
      id: "gas",
      icon: Radar,
      category: "Gas",
      saveLabel: "$18/mo",
      title: "Winter off-peak tariff now available",
      eta: "Seasonal · 6 days",
    },
  ];

  return (
    <main className="bg-background">
      <AlertsHeroSection
        alertCount={todayActions.length}
        previewActions={todayActions.slice(0, 2)}
        onActivate={() => setLinkOpen(true)}
      />

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <section id="savings-feed" className="scroll-mt-24">
          <div className="mb-6 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tl-blue">Your savings feed</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Leak yesterday. Recover today. Protect tomorrow.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Scroll the three phases below — or jump from the overview inside the feed.
            </p>
          </div>

          <Panel className="animate-fade-in">
            <div id="savings-feed-panel">
              <SavingsFeedBridge />

              <FeedDetailBreak />

              <FeedPhase
                id="savings-yesterday"
                phase="Yesterday"
                tone="loss"
                context="Last year, while MoneyMap wasn't active"
                total={fmtAud(YESTERDAY_TOTAL)}
                totalCaption={`${YESTERDAY_LEAKS.length} leaks identified`}
              >
                <YesterdayLossContent />
              </FeedPhase>

              <FeedPhase
                id="savings-today"
                phase="Today"
                tone="savings"
                context="Recoverable right now"
                total={fmtAud(TODAY_RECOVERABLE)}
                totalCaption={`${todayActions.length} alert${todayActions.length === 1 ? "" : "s"} ready`}
              >
                <RecoverTodayContent actions={todayActions} onActivate={() => setLinkOpen(true)} />
              </FeedPhase>

              <FeedPhase
                id="savings-tomorrow"
                phase="Tomorrow"
                tone="neutral"
                context="Queued on autopilot"
                total={fmtAud(TOMORROW_QUEUED)}
                totalCaption={`${watchQueue.length} items on watch`}
                last
              >
                <AutopilotWatchContent items={watchQueue} />
              </FeedPhase>
            </div>
          </Panel>
        </section>

        <HowItWorksSection />
      </div>

      <LinkAccountsDialog open={linkOpen} onOpenChange={setLinkOpen} />
    </main>
  );
}

/* ─── Layout system ─── */

function Panel({
  id,
  children,
  className,
  variant = "default",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}) {
  return (
    <section
      id={id}
      className={cn(
        "overflow-hidden rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-sm",
        variant === "accent" &&
          "border-primary/25 bg-gradient-to-br from-primary/[0.06] via-surface/60 to-surface/50",
        className,
      )}
    >
      {children}
    </section>
  );
}

function FeedPhase({
  id,
  phase,
  tone,
  context,
  total,
  totalCaption,
  children,
  last,
}: {
  id: string;
  phase: string;
  tone: "loss" | "savings" | "neutral";
  context: string;
  total: string;
  totalCaption: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  const barAccent =
    tone === "loss" ? "var(--tl-red)" : tone === "savings" ? "var(--primary)" : "var(--tl-blue)";
  const totalClass =
    tone === "loss" ? "text-[var(--tl-red)]" : tone === "savings" ? "text-primary" : "text-tl-blue";

  return (
    <div id={id} className={cn("scroll-mt-28", !last && "border-b border-border/60")}>
      <div className="flex items-stretch gap-3 px-5 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <span className="w-0.5 shrink-0 rounded-full" style={{ background: barAccent }} />
        <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
          <div className="min-w-0 pb-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{phase}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{context}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className={cn("font-display text-3xl font-bold tabular-nums leading-none sm:text-4xl", totalClass)}>
              {total}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">{totalCaption}</p>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 pt-0 sm:px-6 sm:pb-5">{children}</div>
    </div>
  );
}

function SavingsFeedBridge() {
  const feedSteps = [
    {
      beat: "Leak",
      phase: "Yesterday",
      href: "#savings-yesterday",
      headline: "MoneyMap not activated",
      body: "Before MoneyMap was watching, loyalty tax and quiet hikes stacked up across your bills. See what slipped through — and why activation stops it compounding.",
      linkLabel: "View yesterday",
    },
    {
      beat: "Recover",
      phase: "Today",
      href: "#savings-today",
      headline: "What's on the table right now",
      body: "Live scans match your usage to cheaper equivalents in our market database. Each alert below comes with a proposed switch you can queue in one tap — savings you can action before the next bill lands.",
      linkLabel: "View today",
    },
    {
      beat: "Protect",
      phase: "Tomorrow",
      href: "#savings-tomorrow",
      headline: "What we're watching for you",
      body: "Autopilot keeps scanning rates, plans, and renewals in the background. Items here aren't urgent yet — they're queued so the next move never catches you off guard.",
      linkLabel: "View tomorrow",
    },
  ] as const;

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-9">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {feedSteps.map((item, index) => (
          <div key={item.beat} className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="mr-2 font-display tabular-nums text-tl-blue/70">{index + 1}</span>
              {item.beat} · {item.phase}
            </p>
            <h3 className="mt-3 font-display text-base font-semibold leading-snug sm:text-lg">{item.headline}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            <a
              href={item.href}
              className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.linkLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <Panel id="how-it-works" className="scroll-mt-24">
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="eyebrow-blue">How it works</p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
          From signup to savings in five steps
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Connect once through Australia&apos;s Open Banking framework — MoneyMap handles the rest on repeat.
        </p>

        <ol className="mt-10 space-y-0 lg:hidden">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

            return (
              <li key={step.title} className="relative flex gap-4 sm:gap-5">
                <div className="flex flex-col items-center self-stretch">
                  <div
                    className={cn(
                      "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border bg-surface shadow-sm ring-4 ring-surface sm:h-12 sm:w-12",
                      isLast ? "border-primary/40" : "border-tl-blue/30",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isLast ? "text-primary" : "text-tl-blue")} />
                    <span className="absolute -right-1 -top-1 z-20 grid h-4 w-4 place-items-center rounded-full bg-surface text-[9px] font-bold tabular-nums text-muted-foreground ring-1 ring-border/80">
                      {index + 1}
                    </span>
                  </div>
                  {!isLast ? (
                    <span
                      className="mt-1 w-px flex-1 bg-gradient-to-b from-tl-blue/45 via-tl-blue/25 to-border/30"
                      aria-hidden
                    />
                  ) : null}
                </div>

                <div className={cn("min-w-0 flex-1 pb-8", isLast && "pb-0")}>
                  <h3
                    className={cn(
                      "font-display text-sm font-semibold leading-snug sm:text-base",
                      isLast && "text-primary",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 hidden lg:block">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[10%] right-[10%] top-6 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-tl-blue/35 via-tl-blue/50 to-primary/50"
            />
            <ol className="relative grid grid-cols-5 gap-4">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

                return (
                  <li key={`wide-${step.title}`} className="flex flex-col items-center px-1 text-center">
                    <div
                      className={cn(
                        "relative z-10 grid h-12 w-12 place-items-center rounded-xl border bg-surface shadow-sm ring-[5px] ring-surface",
                        isLast
                          ? "border-primary/40 shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                          : "border-tl-blue/30",
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isLast ? "text-primary" : "text-tl-blue")} />
                      <span className="absolute -right-1 -top-1 z-20 grid h-4 w-4 place-items-center rounded-full bg-surface text-[9px] font-bold tabular-nums text-muted-foreground ring-1 ring-border/80">
                        {index + 1}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "mt-4 font-display text-xs font-semibold leading-snug",
                        isLast && "text-primary",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function FeedDetailBreak() {
  return (
    <div className="border-y border-border/60 bg-black/15 px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="max-w-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tl-blue">Itemised feed</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Below is your account in detail — starting with last year, while MoneyMap wasn&apos;t active.
          </p>
        </div>
        <div className="hidden shrink-0 sm:block sm:h-px sm:w-16 sm:bg-border/80" aria-hidden />
        <p className="text-xs text-muted-foreground/80 sm:max-w-[11rem] sm:text-right sm:leading-relaxed">
          Scroll the three phases or jump from the overview above.
        </p>
      </div>
    </div>
  );
}

/* ─── Feed content blocks ─── */

function DetailPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border/60 bg-background/25", className)}>
      {children}
    </div>
  );
}

function DetailRow({
  label,
  amount,
  icon: Icon,
  className,
}: {
  label: string;
  amount: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-2 border-b border-border/30 px-3 py-2 text-xs last:border-0 sm:gap-3 sm:px-3.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
        {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" /> : null}
        <span className="min-w-0 truncate text-muted-foreground">{label}</span>
      </div>
      <span className="shrink-0 tabular-nums text-foreground/75">{amount}</span>
    </li>
  );
}

function YesterdayLossContent() {
  return (
    <DetailPanel>
      <ul>
        {YESTERDAY_LEAKS.map((item) => (
          <DetailRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            amount={`−${fmtAud(item.amount)}`}
          />
        ))}
      </ul>
      <div className="border-t border-border/40 bg-black/10 px-3 py-2.5 sm:px-3.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-[var(--tl-red)]">Action required</span>
          {" · "}Activate to stop this compounding
        </p>
      </div>
    </DetailPanel>
  );
}

function RecoverTodayContent({
  actions,
  onActivate,
}: {
  actions: TodayAction[];
  onActivate: () => void;
}) {
  return (
    <DetailPanel>
      <ul>
        {actions.map((action, i) => {
          const Icon = action.icon;

          return (
            <li
              key={action.id}
              className="group animate-fade-in border-b border-border/30 last:border-0"
              style={{ animationDelay: `${i * 30}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-center gap-2 px-3 py-2 sm:gap-3 sm:px-3.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-muted-foreground">
                    <span className="text-foreground/80">{action.category}</span>
                    <span className="text-muted-foreground/50"> · </span>
                    {action.title}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-primary">{action.saveLabel}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-3 border-t border-border/40 bg-black/10 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-3.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-primary">Ready to recover</span>
          {" · "}Activate to action these switches
        </p>
        <Button
          onClick={onActivate}
          size="sm"
          className="h-8 shrink-0 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 glow-green group"
        >
          Activate MoneyMap
          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </DetailPanel>
  );
}

function AutopilotWatchContent({ items }: { items: WatchItem[] }) {
  return (
    <DetailPanel>
      <ul>
        {items.map((item) => (
          <DetailRow
            key={item.id}
            icon={item.icon}
            label={`${item.category} · ${item.title}`}
            amount={item.saveLabel}
          />
        ))}
      </ul>
      <p className="border-t border-border/30 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground sm:px-3.5">
        <Shield className="mr-1 inline h-3 w-3 -translate-y-px text-tl-blue" />
        24/7 monitoring — alerted only when switching is worth it
      </p>
    </DetailPanel>
  );
}
