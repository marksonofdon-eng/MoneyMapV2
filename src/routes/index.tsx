import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, TrendingDown, EyeOff, FileX, AlertCircle, Lock, Sparkles, Home, KeyRound, CheckCircle2, Link2, Search, Bell, Zap, Smartphone, Wifi, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkAccountsDialog } from "@/components/link-accounts-dialog";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoneyMap — Put Your Savings on Cruise Control" },
      { name: "description", content: "MoneyMap scans your bills and bank accounts to find hidden price hikes, ditch the Loyalty Tax, and automatically grow your net worth." },
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
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,229,255,0.10),transparent_60%),radial-gradient(40%_50%_at_80%_20%,rgba(0,230,118,0.10),transparent_70%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-28">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--tl-blue)" }} />
              Australia's quietest wealth engine
            </div>
            <h1 className="font-display text-[2.2rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]"
                style={{ backgroundImage: "linear-gradient(180deg, #F5F5F7 0%, #B8B8C0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Put Your Savings on Cruise Control
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              MoneyMap works quietly in the background, scanning your bills and bank accounts to find hidden price hikes, ditch the "Loyalty Tax", and automatically grow your net worth.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green"
              >
                Claim Your Hidden Savings Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Takes 2 minutes to scan. Secured by Australia's official Open Banking system.
            </p>
          </div>

          {/* Right — 5-Colour Progress Arc */}
          <div className="relative">
            <ProgressArc />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--tl-blue)" }}>The Problem</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Why your bills keep getting more expensive</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ProblemCard
              tone="orange"
              icon={<AlertCircle className="h-5 w-5" />}
              title="The Loyal Customer Tax"
              body="Companies quietly move old customers to expensive plans while saving the cheapest, unadvertised deals for brand new sign-ups."
            />
            <ProblemCard
              tone="red"
              icon={<EyeOff className="h-5 w-5" />}
              title="The Compare-Site Scam"
              body="Old comparison websites make you do all the work yourself, take commissions from big providers, and only offer a quick, one-off fix."
            />
            <ProblemCard
              tone="yellow"
              icon={<FileX className="h-5 w-5" />}
              title="Too Much Admin"
              body="Old budgeting apps fail because they force you to manually track every coffee, scan paper bills, and mess around with spreadsheets."
            />
          </div>
        </div>
      </section>

      {/* SECURE VAULT */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
            {/* lock matrix bg */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
              <div className="grid h-full w-full grid-cols-10 gap-3 p-3">
                {Array.from({ length: 60 }).map((_, i) => (
                  <Lock key={i} className="h-5 w-5" />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your Secure Data Vault</p>
                <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Bank-grade security. You're always in control.</h2>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <Pillar icon={<Lock className="h-5 w-5" />} title="Bank-Grade Encryption" body="256-bit AES. Encrypted in transit and at rest, end to end." />
                <Pillar icon={<ShieldCheck className="h-5 w-5" />} title="APRA Regulated Open Banking" body="Accredited CDR data recipient. Audited under Australian law." />
                <Pillar icon={<CheckCircle2 className="h-5 w-5" />} title="Read-Only Data Isolation" body="We can see your transactions. We can never move your money." />
              </div>

              {/* Mortgage teaser */}
              <div className="mt-10 grid gap-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    <Home className="h-3.5 w-3.5" /> The Stress-Free Home Loan Generator
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Your automated credit passport, building quietly in the background</h3>
                  <p className="mt-3 text-muted-foreground">
                    Because MoneyMap automatically cleans, codes, and saves your historical bill and income data points directly from Open Banking, you are building an automated credit passport. When you are ready, skip the brokers, skip the paperwork, and tap to generate a pre-approved Australian mortgage instantly.
                  </p>
                </div>
                <div className="relative glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><KeyRound className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-semibold">Mortgage application</p>
                      <p className="text-xs text-muted-foreground">Auto-prefilled from your vault</p>
                    </div>
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">Document completeness</p>
                  <p className="mt-1 font-display text-3xl font-bold">100%</p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-full rounded-full bg-primary" />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Income, bills, savings &amp; utilities verified via Open Banking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MoneyMap Australia. CDR Accredited Data Recipient.</p>
          <p>Built for Australians 18–65 🇦🇺</p>
        </div>
      </footer>

      <LinkAccountsDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}

/* --- 5-Colour Progress Arc --- */
function ProgressArc() {
  const stops = [
    { c: "var(--tl-red)", label: "Action" },
    { c: "var(--tl-orange)", label: "Breach" },
    { c: "var(--tl-yellow)", label: "Caution" },
    { c: "var(--tl-green)", label: "On Track" },
    { c: "var(--tl-blue)", label: "Surge" },
  ];
  const [progress, setProgress] = useState(0.25);
  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      setProgress(0.25 + ((Math.sin(f / 14) + 1) / 2) * 0.7);
    }, 80);
    return () => clearInterval(id);
  }, []);

  // arc geometry — half circle
  const R = 130;
  const cx = 170;
  const cy = 170;
  const start = Math.PI; // 180°
  const end = 0;         // 0°
  const a = start + (end - start) * progress;
  const px = cx + R * Math.cos(a);
  const py = cy + R * Math.sin(a);

  const tone =
    progress < 0.2 ? stops[0] :
    progress < 0.4 ? stops[1] :
    progress < 0.6 ? stops[2] :
    progress < 0.85 ? stops[3] : stops[4];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="glass-card rounded-3xl p-6 sm:p-8" style={{ boxShadow: `0 30px 80px -30px ${tone.c}55` }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Your Status</p>
            <p className="mt-1 font-display text-xl font-bold" style={{ color: tone.c }}>{tone.label}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {stops.map((s) => (
              <span key={s.label} className="h-2.5 w-2.5 rounded-full" style={{ background: s.c, opacity: s.label === tone.label ? 1 : 0.35 }} />
            ))}
          </div>
        </div>

        <svg viewBox="0 0 340 200" className="mt-4 w-full">
          <defs>
            <linearGradient id="arcgrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--tl-red)" />
              <stop offset="25%" stopColor="var(--tl-orange)" />
              <stop offset="50%" stopColor="var(--tl-yellow)" />
              <stop offset="78%" stopColor="var(--tl-green)" />
              <stop offset="100%" stopColor="var(--tl-blue)" />
            </linearGradient>
          </defs>
          <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
          <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke="url(#arcgrad)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${Math.PI * R * progress}, ${Math.PI * R}`} />
          <circle cx={px} cy={py} r="10" fill={tone.c} stroke="#0E0F12" strokeWidth="3" />
          <text x={cx} y={cy - 20} textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#8E8E93" letterSpacing="2">PROJECTED 12 MO</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="Inter" fontSize="28" fontWeight="700" fill="#F5F5F7">${Math.round(8400 + progress * 22000).toLocaleString()}</text>
        </svg>

        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Today</span><span>6 mo</span><span>12 mo</span>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-50 blur-3xl" style={{ background: `radial-gradient(circle, ${tone.c}44, transparent 70%)` }} />
    </div>
  );
}

function ProblemCard({ icon, title, body, tone }: { icon: React.ReactNode; title: string; body: string; tone: "orange" | "red" | "yellow" }) {
  const colorMap = { orange: "var(--tl-orange)", red: "var(--tl-red)", yellow: "var(--tl-yellow)" };
  const c = colorMap[tone];
  return (
    <Card className="border-border bg-surface p-6 transition-transform hover:-translate-y-0.5">
      <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: `${c}1F`, color: c }}>{icon}</div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Card>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <h4 className="mt-3 font-display text-base font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
