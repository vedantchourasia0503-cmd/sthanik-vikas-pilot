export interface ParsedVoice {
  name?: string;
  businessType?: string;
  dailyIncome?: number;
  dailyExpense?: number;
  city?: string;
}

const CITIES = [
  "Mumbai","Pune","Delhi","New Delhi","Nagpur","Bengaluru","Bangalore","Chennai","Hyderabad",
  "Kolkata","Ahmedabad","Surat","Jaipur","Lucknow","Kanpur","Indore","Bhopal","Patna","Ranchi",
  "Varanasi","Nashik","Coimbatore","Madurai","Kochi","Guwahati","Chandigarh","Ludhiana","Agra",
  "मुंबई","पुणे","दिल्ली","नागपुर","बेंगलुरु","चेन्नई","हैदराबाद","कोलकाता","जयपुर","लखनऊ","इंदौर","भोपाल","पटना","सूरत","नाशिक",
];

const TYPES: [RegExp, string][] = [
  [/tea|chai|चाय/i, "Tea Stall"],
  [/vegetable|sabzi|सब्ज़ी|सब्जी/i, "Vegetable Vendor"],
  [/fruit|फल/i, "Fruit Vendor"],
  [/tailor|darzi|सिलाई|दर्जी/i, "Tailor"],
  [/carpenter|बढ़ई/i, "Carpenter"],
  [/barber|salon|नाई|सैलून/i, "Barber / Salon"],
  [/cobbler|मोची/i, "Cobbler"],
  [/potter|कुम्हार/i, "Potter"],
  [/kirana|grocery|किराना/i, "Kirana Store"],
  [/food|snack|tiffin|dhaba|खाना|नाश्ता|ढाबा/i, "Street Food"],
  [/flower|garland|फूल/i, "Flower Seller"],
  [/repair|mechanic|मरम्मत|मैकेनिक/i, "Repair Services"],
  [/auto|rickshaw|रिक्शा|ऑटो/i, "Auto / Transport"],
  [/weaver|बुनकर/i, "Weaver"],
  [/sweet|mithai|मिठाई/i, "Sweet Shop"],
];

const WORD_NUM: Record<string, number> = {
  hundred: 100, thousand: 1000, hazaar: 1000, hajar: 1000, हज़ार: 1000, हजार: 1000, सौ: 100,
};

function normalizeDigits(s: string) {
  return s.replace(/[\u0966-\u096F]/g, (d) => String(d.charCodeAt(0) - 0x0966));
}

function numbersIn(text: string): number[] {
  const out: number[] = [];
  const re = /(\d+(?:\.\d+)?)\s*(hundred|thousand|hazaar|hajar|हज़ार|हजार|सौ|k)?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    let v = parseFloat(m[1] ?? "0");
    const unit = (m[2] ?? "").toLowerCase();
    if (unit) v *= unit === "k" ? 1000 : (WORD_NUM[unit] ?? 1);
    if (v >= 20) out.push(v);
  }
  return out;
}

export function parseVoice(raw: string): ParsedVoice {
  const text = normalizeDigits(raw);
  const res: ParsedVoice = {};

  const nameMatch =
    text.match(/(?:my name is|name is|i am|myself)\s+([A-Za-z\u0900-\u097F]+(?:\s[A-Za-z\u0900-\u097F]+)?)/i) ||
    text.match(/(?:मेरा नाम|नाम)\s+([\u0900-\u097F]+(?:\s[\u0900-\u097F]+)?)/);
  const rawName = nameMatch?.[1];
  if (rawName) res.name = rawName.replace(/\s*(है|hai)$/i, "").trim();

  for (const [re, label] of TYPES) if (re.test(text)) { res.businessType = label; break; }

  const city = CITIES.find((c) => new RegExp(`(^|\\s)${c}`, "i").test(text));
  if (city) res.city = city;

  const expMatch = text.match(
    /(?:expense|expenses|cost|spend|kharch|खर्च|खर्चा)[^\d]{0,20}(\d+(?:\.\d+)?)\s*(thousand|hazaar|हज़ार|हजार|k)?/i,
  );
  const incMatch = text.match(
    /(?:income|earn|earning|profit|sale|sales|kamata|kamai|कमा\S*|आय|बिक्री)[^\d]{0,20}(\d+(?:\.\d+)?)\s*(thousand|hazaar|हज़ार|हजार|k)?/i,
  );
  const scale = (u: string | undefined) => {
    const unit = (u ?? "").toLowerCase();
    if (!unit) return 1;
    return unit === "k" ? 1000 : (WORD_NUM[unit] ?? 1);
  };

  let income: number | undefined;
  let expense: number | undefined;
  if (incMatch) income = parseFloat(incMatch[1] ?? "0") * scale(incMatch[2]);
  if (expMatch) expense = parseFloat(expMatch[1] ?? "0") * scale(expMatch[2]);

  if (income === undefined || expense === undefined) {
    const nums = numbersIn(text);
    const sorted = [...nums].sort((a, b) => b - a);
    if (sorted.length >= 2) {
      if (income === undefined) income = sorted[0];
      if (expense === undefined) expense = sorted[1];
    } else if (sorted.length === 1 && income === undefined) {
      income = sorted[0];
    }
  }

  if (income !== undefined) res.dailyIncome = income;
  if (expense !== undefined) res.dailyExpense = expense;

  return res;
}
