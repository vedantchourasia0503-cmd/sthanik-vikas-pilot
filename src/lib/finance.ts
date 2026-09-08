export type Health = "healthy" | "moderate" | "critical";

export interface BusinessInput {
  name: string;
  businessType: string;
  dailyIncome: number;
  dailyExpense: number;
  category: string;
  city: string;
  workingDays: number;
}

export interface Assessment {
  monthlyIncome: number;
  monthlyExpense: number;
  net: number;
  margin: number;
  health: Health;
  score: number;
  suggestedLoan: number;
}

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export function assess(i: BusinessInput): Assessment {
  const days = i.workingDays || 26;
  const monthlyIncome = i.dailyIncome * days;
  const monthlyExpense = i.dailyExpense * days;
  const net = monthlyIncome - monthlyExpense;
  const margin = monthlyIncome > 0 ? (net / monthlyIncome) * 100 : 0;

  const health: Health = margin >= 25 ? "healthy" : margin >= 10 ? "moderate" : "critical";

  // Eligibility score: margin strength (55) + repayment capacity (30) + turnover scale (15)
  const marginPts = Math.max(0, Math.min(55, (margin / 40) * 55));
  const capacityPts = Math.max(0, Math.min(30, (net / 20000) * 30));
  const scalePts = Math.max(0, Math.min(15, (monthlyIncome / 60000) * 15));
  const score = Math.round(Math.max(net > 0 ? 15 : 0, marginPts + capacityPts + scalePts));

  // A prudent EMI is ~35% of net; 24-month tenure at ~12% p.a. flat.
  const emi = Math.max(0, net * 0.35);
  const raw = (emi * 24) / 1.24;
  const suggestedLoan = Math.max(0, Math.round(raw / 1000) * 1000);

  return { monthlyIncome, monthlyExpense, net, margin, health, score, suggestedLoan };
}
