import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileDown, Sparkles, Languages, RotateCcw } from "lucide-react";
import { VoiceCapture } from "@/components/VoiceCapture";
import { LedgerDashboard } from "@/components/LedgerDashboard";
import { SchemeMatcher } from "@/components/SchemeMatcher";
import { assess, type BusinessInput } from "@/lib/finance";
import { downloadStatement } from "@/lib/statement-pdf";
import { LANGS, useT, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sthanik Vikas AI — Micro-Business Co-Pilot for India" },
      {
        name: "description",
        content:
          "Voice-first ledger, credit eligibility and government scheme matcher for Indian street vendors and micro-entrepreneurs. Hindi, English and regional languages.",
      },
      { property: "og:title", content: "Sthanik Vikas AI — Micro-Business Co-Pilot" },
      {
        property: "og:description",
        content:
          "Speak your business details in Hindi or English, see your profit margin and credit eligibility, and download a bank-ready financial statement.",
      },
    ],
  }),
  component: Index,
});

const BUSINESS_TYPES = [
  "Tea Stall",
  "Street Food",
  "Vegetable Vendor",
  "Fruit Vendor",
  "Kirana Store",
  "Tailor",
  "Carpenter",
  "Barber / Salon",
  "Cobbler",
  "Potter",
  "Weaver",
  "Flower Seller",
  "Sweet Shop",
  "Repair Services",
  "Auto / Transport",
  "Other",
];

const CATEGORIES = ["General", "OBC", "SC", "ST", "Minority", "Women Entrepreneur", "Divyangjan"];

const EMPTY: BusinessInput = {
  name: "",
  businessType: "",
  dailyIncome: 0,
  dailyExpense: 0,
  category: "General",
  city: "",
  workingDays: 26,
};

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [form, setForm] = useState<BusinessInput>(EMPTY);
  const [submitted, setSubmitted] = useState<BusinessInput | null>(null);
  const [note, setNote] = useState("");
  const t = useT(lang);

  const assessment = useMemo(() => (submitted ? assess(submitted) : null), [submitted]);
  const set = <K extends keyof BusinessInput>(k: K, v: BusinessInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (form.dailyIncome <= 0) {
      setNote(t("fillFirst"));
      return;
    }
    setNote("");
    setSubmitted(form);
    requestAnimationFrame(() =>
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const fieldCls =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30";
  const labelCls = "block text-sm font-medium text-foreground";

  return (
    <main className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
              <Sparkles className="size-3.5" /> Micro-Business Co-Pilot
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{t("appName")}</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">{t("tagline")}</p>
          </div>
          <label className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2">
            <Languages className="size-4" />
            <span className="sr-only">{t("language")}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-transparent text-sm font-medium text-primary-foreground outline-none"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code} className="text-foreground">
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section className="space-y-4">
          <VoiceCapture
            lang={lang}
            onParsed={(p) => {
              setForm((f) => ({
                ...f,
                name: p.name ?? f.name,
                businessType: p.businessType ?? f.businessType,
                city: p.city ?? f.city,
                dailyIncome: p.dailyIncome ?? f.dailyIncome,
                dailyExpense: p.dailyExpense ?? f.dailyExpense,
              }));
              setNote("Voice details filled in below — check and correct anything before assessing.");
            }}
          />
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-xl font-semibold text-foreground">{t("details")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="name">
                {t("name")}
              </label>
              <input
                id="name"
                className={fieldCls}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Ramesh Kumar"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="type">
                {t("businessType")}
              </label>
              <select
                id="type"
                className={fieldCls}
                value={form.businessType}
                onChange={(e) => set("businessType", e.target.value)}
              >
                <option value="">—</option>
                {BUSINESS_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="income">
                {t("dailyIncome")}
              </label>
              <input
                id="income"
                type="number"
                min={0}
                inputMode="numeric"
                className={fieldCls}
                value={form.dailyIncome || ""}
                onChange={(e) => set("dailyIncome", Number(e.target.value))}
                placeholder="1200"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="expense">
                {t("dailyExpense")}
              </label>
              <input
                id="expense"
                type="number"
                min={0}
                inputMode="numeric"
                className={fieldCls}
                value={form.dailyExpense || ""}
                onChange={(e) => set("dailyExpense", Number(e.target.value))}
                placeholder="600"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="category">
                {t("category")}
              </label>
              <select
                id="category"
                className={fieldCls}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="city">
                {t("city")}
              </label>
              <input
                id="city"
                className={fieldCls}
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Pune"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="days">
                {t("days")}
              </label>
              <input
                id="days"
                type="number"
                min={1}
                max={31}
                className={fieldCls}
                value={form.workingDays}
                onChange={(e) => set("workingDays", Number(e.target.value) || 26)}
              />
            </div>
          </div>

          {note && (
            <p className="mt-4 rounded-xl bg-accent/15 px-4 py-3 text-sm text-accent-strong">
              {note}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={submit}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none"
            >
              <Sparkles className="size-4" />
              {t("calculate")}
            </button>
            <button
              onClick={() => {
                setForm(EMPTY);
                setSubmitted(null);
                setNote("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-4" />
              {t("reset")}
            </button>
          </div>
        </section>

        {submitted && assessment && (
          <>
            <section id="dashboard" className="space-y-4 scroll-mt-6">
              <h2 className="font-display text-xl font-semibold text-foreground">{t("ledger")}</h2>
              <LedgerDashboard a={assessment} lang={lang} />
              <button
                onClick={() => downloadStatement(submitted, assessment)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-profit px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
              >
                <FileDown className="size-4" />
                📄 {t("download")}
              </button>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">{t("schemes")}</h2>
              <SchemeMatcher input={submitted} assessment={assessment} lang={lang} />
            </section>
          </>
        )}

        <footer className="border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          Estimates are based on the figures you enter and are meant to support a loan conversation,
          not replace an audited statement. Scheme terms are indicative — confirm current rules on the
          official government portals.
        </footer>
      </div>
    </main>
  );
}
