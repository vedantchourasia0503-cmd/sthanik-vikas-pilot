import { ExternalLink, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { rankSchemes } from "@/lib/schemes";
import type { Assessment, BusinessInput } from "@/lib/finance";
import { useT, type Lang } from "@/lib/i18n";

export function SchemeMatcher({
  input,
  assessment,
  lang,
}: {
  input: BusinessInput;
  assessment: Assessment;
  lang: Lang;
}) {
  const t = useT(lang);
  const ranked = rankSchemes(input, assessment);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ranked.map(({ scheme, score }, idx) => (
        <article
          key={scheme.id}
          className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{scheme.name}</h3>
              <p className="text-sm text-muted-foreground">{scheme.hindi}</p>
            </div>
            {idx === 0 && (
              <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {t("matched")}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-profit transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-profit">{score}%</span>
          </div>

          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("loanLimit")}
              </dt>
              <dd className="font-medium text-foreground">{scheme.loanLimit}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("subsidy")}
              </dt>
              <dd className="font-medium text-accent-strong">{scheme.subsidy}</dd>
            </div>
          </dl>

          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="benefits" className="border-b-0">
              <AccordionTrigger className="text-sm">{t("benefits")}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {scheme.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-profit" />
                      {b}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="criteria" className="border-b-0">
              <AccordionTrigger className="text-sm">{t("eligibilityCriteria")}</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                  {scheme.criteria.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <a
            href={scheme.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("apply")}
            <ExternalLink className="size-4" />
          </a>
        </article>
      ))}
    </div>
  );
}
