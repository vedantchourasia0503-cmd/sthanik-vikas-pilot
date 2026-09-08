import type { Assessment, BusinessInput } from "./finance";

export interface Scheme {
  id: string;
  name: string;
  hindi: string;
  loanLimit: string;
  subsidy: string;
  benefits: string[];
  criteria: string[];
  applyUrl: string;
  matchScore: (i: BusinessInput, a: Assessment) => number;
}

export const SCHEMES: Scheme[] = [
  {
    id: "svanidhi",
    name: "PM SVANidhi",
    hindi: "पीएम स्वनिधि",
    loanLimit: "₹10,000 → ₹20,000 → ₹50,000 (in cycles)",
    subsidy: "7% interest subsidy + cashback up to ₹1,200",
    benefits: [
      "Collateral-free working capital loan",
      "Interest subsidy credited directly to your account",
      "Digital transaction cashback every month",
      "Higher limit unlocked on timely repayment",
    ],
    criteria: [
      "Street vendor with a Certificate of Vending or ULB survey record",
      "Vending in an urban local body area",
      "Aadhaar linked to a bank account",
      "Apply at your ULB office, a bank branch, or on pmsvanidhi.mohua.gov.in",
    ],
    applyUrl: "https://pmsvanidhi.mohua.gov.in/",
    matchScore: (i, a) =>
      (/(stall|cart|vendor|thela|rehri|hawker|street|fruit|vegetable|tea|chai|snack|food)/i.test(
        i.businessType,
      )
        ? 60
        : 20) + (a.monthlyIncome <= 60000 ? 30 : 10),
  },
  {
    id: "vishwakarma",
    name: "PM Vishwakarma",
    hindi: "पीएम विश्वकर्मा",
    loanLimit: "₹1,00,000 (first tranche) + ₹2,00,000 (second)",
    subsidy: "5% concessional interest + ₹15,000 toolkit incentive",
    benefits: [
      "Free skill training with ₹500/day stipend",
      "₹15,000 e-voucher for tools",
      "Collateral-free credit at 5% interest",
      "Digital marketing and market linkage support",
    ],
    criteria: [
      "Artisan or craftsperson in one of 18 recognised trades",
      "Age 18+ and self-employed in the trade",
      "Not availing a similar credit scheme (PMEGP/Mudra) in last 5 years",
      "Register at pmvishwakarma.gov.in via a CSC",
    ],
    applyUrl: "https://pmvishwakarma.gov.in/",
    matchScore: (i) =>
      /(tailor|carpenter|potter|barber|cobbler|blacksmith|goldsmith|weaver|mason|craft|artisan|repair|smith|basket|toy|garland|washer)/i.test(
        i.businessType,
      )
        ? 85
        : 25,
  },
  {
    id: "mudra",
    name: "Mudra Loan (PMMY)",
    hindi: "मुद्रा लोन",
    loanLimit: "Shishu ₹50,000 · Kishor ₹5 lakh · Tarun ₹10 lakh",
    subsidy: "No collateral; CGTMSE guarantee cover",
    benefits: [
      "Term loan or working capital for any non-farm micro enterprise",
      "No collateral and no processing fee at most public banks",
      "Overdraft facility available with Mudra card",
      "Flexible tenure up to 60 months",
    ],
    criteria: [
      "Any non-farm income-generating micro or small enterprise",
      "No default with any bank",
      "Business plan + 6 months of income record helps approval",
      "Apply at any bank branch or on udyamimitra.in / Jan Samarth",
    ],
    applyUrl: "https://www.mudra.org.in/",
    matchScore: (_i, a) => 55 + Math.min(35, a.score / 3),
  },
  {
    id: "pmegp",
    name: "PMEGP",
    hindi: "पीएमईजीपी",
    loanLimit: "Up to ₹50 lakh (manufacturing) · ₹20 lakh (service)",
    subsidy: "15–35% government margin-money subsidy",
    benefits: [
      "Large capital subsidy that never has to be repaid",
      "Higher subsidy for SC/ST/OBC/Women/Minority/NER applicants",
      "Covers new manufacturing or service units",
      "Bank finances up to 90–95% of project cost",
    ],
    criteria: [
      "Age 18+, new unit (not an existing business expansion)",
      "8th pass required for projects above ₹10 lakh (manufacturing)",
      "Own contribution 5% (special categories) or 10% (general)",
      "Apply on kviconline.gov.in/pmegpeportal",
    ],
    applyUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    matchScore: (i, a) =>
      (/(general)/i.test(i.category) ? 30 : 50) + (a.monthlyIncome > 40000 ? 30 : 10),
  },
];

export function rankSchemes(i: BusinessInput, a: Assessment) {
  return [...SCHEMES]
    .map((s) => ({ scheme: s, score: Math.min(100, Math.round(s.matchScore(i, a))) }))
    .sort((x, y) => y.score - x.score);
}
