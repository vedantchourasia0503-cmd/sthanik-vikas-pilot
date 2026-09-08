import { TrendingUp, TrendingDown, Wallet, Gauge } from "lucide-react";
import { inr, type Assessment } from "@/lib/finance";
import { useT, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const HEALTH_STYLE = {
  healthy: "bg-profit/10 text-profit border-profit/30",
  moderate: "bg-accent/15 text-accent-strong border-accent/40",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
} as const;

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "profit" | "muted" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-bold tabular-nums",
          tone === "profit" && "text-profit",
          tone === "warn" && "text-accent-strong",
          (!tone || tone === "muted") && "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function LedgerDashboard({ a, lang }: { a: Assessment; lang: Lang }) {
  const t = useT(lang);
  const gauge = Math.max(0, Math.min(100, a.score));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label={t("monthlyIncome")}
          value={inr(a.monthlyIncome)}
          icon={<TrendingUp className="size-4" />}
        />
        <Stat
          label={t("monthlyExpense")}
          value={inr(a.monthlyExpense)}
          icon={<TrendingDown className="size-4" />}
        />
        <Stat
          label={t("netMonthly")}
          value={inr(a.net)}
          icon={<Wallet className="size-4" />}
          tone={a.net >= 0 ? "profit" : "warn"}
        />
        <Stat
          label={t("margin")}
          value={`${a.margin.toFixed(1)}%`}
          icon={<Gauge className="size-4" />}
          tone={a.margin >= 25 ? "profit" : "warn"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div
          className={cn(
            "flex flex-col justify-center rounded-2xl border p-5 text-center",
            HEALTH_STYLE[a.health],
          )}
        >
          <p className="text-xs font-medium uppercase tracking-wide opacity-80">{t("health")}</p>
          <p className="mt-1 text-3xl font-bold">{t(a.health)}</p>
          <p className="mt-2 text-sm opacity-90">
            {a.health === "healthy"
              ? "Strong margins — you present well to a lender."
              : a.health === "moderate"
                ? "Workable, but trim daily costs to strengthen your case."
                : "Costs are eating your earnings. Start with a small working-capital loan."}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("eligibility")}
          </p>
          <div className="mt-4 flex items-end gap-5">
            <div className="relative size-32 shrink-0">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r="50" className="fill-none stroke-muted" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className={cn(
                    "fill-none transition-all duration-1000",
                    gauge >= 60 ? "stroke-profit" : gauge >= 30 ? "stroke-accent" : "stroke-destructive",
                  )}
                  strokeDasharray={`${(gauge / 100) * 314} 314`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tabular-nums text-foreground">{gauge}</span>
                <span className="text-[10px] uppercase text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("suggestedLoan")}
              </p>
              <p className="text-3xl font-bold text-profit tabular-nums">{inr(a.suggestedLoan)}</p>
              <p className="text-xs text-muted-foreground">
                Based on ~35% of your net monthly income as EMI over 24 months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
