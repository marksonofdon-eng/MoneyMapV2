import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const banks = ["Commonwealth Bank", "Westpac", "ANZ", "NAB", "ING", "Macquarie", "Bendigo", "UBank"];

export function LinkAccountsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [step, setStep] = useState<"pick" | "auth" | "done">("pick");
  const [bank, setBank] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
      toast.success(`${bank} securely linked via Open Banking`);
    }, 1400);
  }

  function close(v: boolean) {
    onOpenChange(v);
    if (!v) setTimeout(() => { setStep("pick"); setBank(null); }, 200);
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2 text-xs text-primary">
            <Shield className="h-4 w-4" /> Secured by Australia's Open Banking (CDR)
          </div>
          <DialogTitle className="font-display text-2xl">
            {step === "pick" && "Choose your bank"}
            {step === "auth" && `Sign in to ${bank}`}
            {step === "done" && "You're all set"}
          </DialogTitle>
          <DialogDescription>
            {step === "pick" && "Bank-grade encryption. Read-only access. Disconnect anytime."}
            {step === "auth" && "We never see or store your password."}
            {step === "done" && "MoneyMap is now quietly scanning for savings in the background."}
          </DialogDescription>
        </DialogHeader>

        {step === "pick" && (
          <div className="grid grid-cols-2 gap-2">
            {banks.map((b) => (
              <button
                key={b}
                onClick={() => { setBank(b); setStep("auth"); }}
                className="rounded-lg border border-border bg-card px-3 py-3 text-left text-sm font-medium hover:border-primary hover:bg-secondary"
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {step === "auth" && (
          <form onSubmit={handleConnect} className="space-y-3">
            <div>
              <Label htmlFor="user">Client number</Label>
              <Input id="user" required placeholder="e.g. 1234 5678" autoComplete="off" />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required placeholder="••••••••" />
            </div>
            <div className="flex items-start gap-2 rounded-md bg-secondary/60 p-3 text-xs text-muted-foreground">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              Read-only Open Banking consent. We can never move your money.
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting…</> : "Securely connect"}
            </Button>
          </form>
        )}

        {step === "done" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="text-sm text-muted-foreground">Head to your Bill Savings Alerts to see what you could recover.</p>
            <Button onClick={() => close(false)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
