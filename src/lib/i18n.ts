export type Lang = "en" | "hi" | "mr" | "ta" | "bn";

export const LANGS: { code: Lang; label: string; speech: string }[] = [
  { code: "en", label: "English", speech: "en-IN" },
  { code: "hi", label: "हिन्दी", speech: "hi-IN" },
  { code: "mr", label: "मराठी", speech: "mr-IN" },
  { code: "ta", label: "தமிழ்", speech: "ta-IN" },
  { code: "bn", label: "বাংলা", speech: "bn-IN" },
];

type Keys =
  | "appName"
  | "tagline"
  | "language"
  | "speak"
  | "listening"
  | "voiceHint"
  | "voiceUnsupported"
  | "heard"
  | "details"
  | "name"
  | "businessType"
  | "dailyIncome"
  | "dailyExpense"
  | "category"
  | "city"
  | "calculate"
  | "reset"
  | "ledger"
  | "monthlyIncome"
  | "monthlyExpense"
  | "netMonthly"
  | "margin"
  | "health"
  | "healthy"
  | "moderate"
  | "critical"
  | "eligibility"
  | "creditScore"
  | "suggestedLoan"
  | "schemes"
  | "loanLimit"
  | "subsidy"
  | "benefits"
  | "eligibilityCriteria"
  | "apply"
  | "matched"
  | "download"
  | "fillFirst"
  | "days"
  | "statement";

const en: Record<Keys, string> = {
  appName: "Sthanik Vikas AI",
  tagline: "Micro-Business Co-Pilot for India's entrepreneurs",
  language: "Language",
  speak: "Tap to Speak Business Details",
  listening: "Listening… speak now",
  voiceHint: 'Try: "My name is Ramesh, I run a tea stall, I earn 1200 rupees a day, expenses 600, in Pune"',
  voiceUnsupported:
    "Voice input is not supported in this browser. Please use Chrome on Android or desktop, or fill the form below — everything works without voice.",
  heard: "Heard",
  details: "Business Details",
  name: "Your Name",
  businessType: "Business Type",
  dailyIncome: "Average Daily Income (₹)",
  dailyExpense: "Average Daily Expense (₹)",
  category: "Category / Social Group",
  city: "City / Location",
  calculate: "Assess My Business",
  reset: "Clear",
  ledger: "Micro-Ledger & Assessment",
  monthlyIncome: "Monthly Income",
  monthlyExpense: "Monthly Expense",
  netMonthly: "Net Monthly Income",
  margin: "Profit Margin",
  health: "Business Health",
  healthy: "Healthy",
  moderate: "Moderate",
  critical: "Critical",
  eligibility: "Micro-Credit Eligibility",
  creditScore: "Eligibility Score",
  suggestedLoan: "Suggested Loan Ticket",
  schemes: "Government Scheme Matcher",
  loanLimit: "Loan Limit",
  subsidy: "Subsidy / Interest Benefit",
  benefits: "Benefits",
  eligibilityCriteria: "Eligibility & How to Apply",
  apply: "Apply Now",
  matched: "Best Match",
  download: "Download Bank-Ready Financial Statement",
  fillFirst: "Add your income and expense first.",
  days: "Working days / month",
  statement: "Bank-Ready Financial Statement",
};

const hi: Record<Keys, string> = {
  appName: "स्थानीय विकास AI",
  tagline: "भारत के सूक्ष्म उद्यमियों का को-पायलट",
  language: "भाषा",
  speak: "व्यापार की जानकारी बोलें",
  listening: "सुन रहे हैं… बोलिए",
  voiceHint: 'बोलें: "मेरा नाम रमेश है, मैं चाय की दुकान चलाता हूँ, रोज़ 1200 रुपये कमाता हूँ, खर्च 600, पुणे में"',
  voiceUnsupported:
    "इस ब्राउज़र में आवाज़ इनपुट उपलब्ध नहीं है। कृपया Chrome उपयोग करें या नीचे फ़ॉर्म भरें — सब कुछ बिना आवाज़ भी चलेगा।",
  heard: "सुना गया",
  details: "व्यापार की जानकारी",
  name: "आपका नाम",
  businessType: "व्यापार का प्रकार",
  dailyIncome: "औसत दैनिक आय (₹)",
  dailyExpense: "औसत दैनिक खर्च (₹)",
  category: "श्रेणी / सामाजिक वर्ग",
  city: "शहर / स्थान",
  calculate: "मेरा आकलन करें",
  reset: "साफ़ करें",
  ledger: "सूक्ष्म-बहीखाता और आकलन",
  monthlyIncome: "मासिक आय",
  monthlyExpense: "मासिक खर्च",
  netMonthly: "शुद्ध मासिक आय",
  margin: "लाभ मार्जिन",
  health: "व्यापार स्वास्थ्य",
  healthy: "स्वस्थ",
  moderate: "मध्यम",
  critical: "गंभीर",
  eligibility: "सूक्ष्म-ऋण पात्रता",
  creditScore: "पात्रता स्कोर",
  suggestedLoan: "सुझाई गई ऋण राशि",
  schemes: "सरकारी योजना मिलान",
  loanLimit: "ऋण सीमा",
  subsidy: "सब्सिडी / ब्याज लाभ",
  benefits: "लाभ",
  eligibilityCriteria: "पात्रता और आवेदन कैसे करें",
  apply: "आवेदन करें",
  matched: "सर्वोत्तम मिलान",
  download: "बैंक-तैयार वित्तीय विवरण डाउनलोड करें",
  fillFirst: "पहले आय और खर्च भरें।",
  days: "कार्य दिवस / माह",
  statement: "बैंक-तैयार वित्तीय विवरण",
};

const mr: Record<Keys, string> = {
  ...en,
  appName: "स्थानिक विकास AI",
  tagline: "भारतातील सूक्ष्म उद्योजकांचा सहकारी",
  language: "भाषा",
  speak: "व्यवसायाची माहिती बोला",
  listening: "ऐकत आहोत… बोला",
  details: "व्यवसाय माहिती",
  name: "तुमचे नाव",
  businessType: "व्यवसाय प्रकार",
  dailyIncome: "सरासरी दैनिक उत्पन्न (₹)",
  dailyExpense: "सरासरी दैनिक खर्च (₹)",
  category: "प्रवर्ग / सामाजिक गट",
  city: "शहर / ठिकाण",
  calculate: "माझे मूल्यांकन करा",
  ledger: "सूक्ष्म-खतावणी व मूल्यांकन",
  netMonthly: "निव्वळ मासिक उत्पन्न",
  margin: "नफा मार्जिन",
  health: "व्यवसाय आरोग्य",
  healthy: "उत्तम",
  moderate: "मध्यम",
  critical: "गंभीर",
  schemes: "सरकारी योजना जुळणी",
  download: "बँक-सज्ज आर्थिक विवरण डाउनलोड करा",
};

const ta: Record<Keys, string> = {
  ...en,
  appName: "ஸ்தானிக் விகாஸ் AI",
  tagline: "இந்திய நுண் தொழில்முனைவோருக்கான உதவியாளர்",
  language: "மொழி",
  speak: "வணிக விவரங்களைப் பேசுங்கள்",
  listening: "கேட்கிறோம்… பேசுங்கள்",
  details: "வணிக விவரங்கள்",
  name: "உங்கள் பெயர்",
  businessType: "வணிக வகை",
  dailyIncome: "சராசரி தினசரி வருமானம் (₹)",
  dailyExpense: "சராசரி தினசரி செலவு (₹)",
  category: "வகை / சமூகக் குழு",
  city: "நகரம் / இடம்",
  calculate: "என் வணிகத்தை மதிப்பிடு",
  ledger: "நுண் கணக்கு & மதிப்பீடு",
  netMonthly: "நிகர மாத வருமானம்",
  margin: "லாப விகிதம்",
  health: "வணிக ஆரோக்கியம்",
  healthy: "நல்லது",
  moderate: "நடுத்தரம்",
  critical: "கவலைக்குரியது",
  schemes: "அரசு திட்ட பொருத்தம்",
  download: "வங்கிக்குத் தயார் நிதி அறிக்கையைப் பதிவிறக்கு",
};

const bn: Record<Keys, string> = {
  ...en,
  appName: "স্থানীয় বিকাশ AI",
  tagline: "ভারতের ক্ষুদ্র উদ্যোক্তাদের সহায়ক",
  language: "ভাষা",
  speak: "ব্যবসার তথ্য বলুন",
  listening: "শুনছি… বলুন",
  details: "ব্যবসার তথ্য",
  name: "আপনার নাম",
  businessType: "ব্যবসার ধরন",
  dailyIncome: "গড় দৈনিক আয় (₹)",
  dailyExpense: "গড় দৈনিক খরচ (₹)",
  category: "শ্রেণি / সামাজিক গোষ্ঠী",
  city: "শহর / স্থান",
  calculate: "মূল্যায়ন করুন",
  ledger: "ক্ষুদ্র-খতিয়ান ও মূল্যায়ন",
  netMonthly: "নিট মাসিক আয়",
  margin: "লাভের হার",
  health: "ব্যবসার স্বাস্থ্য",
  healthy: "ভালো",
  moderate: "মধ্যম",
  critical: "সংকটজনক",
  schemes: "সরকারি প্রকল্প মেলানো",
  download: "ব্যাংক-প্রস্তুত আর্থিক বিবরণী ডাউনলোড",
};

export const DICT: Record<Lang, Record<Keys, string>> = { en, hi, mr, ta, bn };

export const useT = (lang: Lang) => (k: Keys) => DICT[lang][k];
