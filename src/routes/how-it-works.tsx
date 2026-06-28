import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Search, Bell, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it Works — MoneyHub" },
      { name: "description", content: "Three quiet steps. Real cash back in your pocket. Here's how MoneyHub works." },
    ],
  }),
  component: How,
});

const steps = [
  { icon: Link2, title: "1. Link your accounts", body: "Connect your banks, super and credit cards in under 2 minutes via Australia's official Open Banking (CDR) system. Read-only — we can never move your money." },
  { icon: Search, title: "2. We scan in the background", body: "MoneyHub watches your bills, subscriptions, mortgage and utility rates every single day. We compare them to the best deals on the market — so you don't have to." },
  { icon: Bell, title: "3. One tap to save", body: "When we find real money, you get a clean alert with a Switch & Save button. Fill nothing in. Cancel anything in seconds. That's the whole job." },
];

function How() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it Works</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Set it once. Save quietly forever.</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">No budgeting. No spreadsheets. No more chasing call centres to ditch the loyalty tax.</p>
      </header>

      <div className="space-y-4">
        {steps.map((s) => (
          <Card key={s.title} className="border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold sm:text-2xl">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/dashboard">
          <Button size="lg" className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-green">
            See a live dashboard <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
