// ============================================================
//  FireDrop PK — STORE SETTINGS
//  Edit these values to connect your real accounts.
// ============================================================

export const STORE = {
  name: "FireDrop PK",
  tagline: "Pakistan Ka Apna Free Fire Diamond Store",
  subTagline: "Instant Delivery • JazzCash & Easypaisa Accepted",

  // Your Telegram bot username (without @)
  telegramBot: "FireDropPK_bot",
  // WhatsApp Business number in international format, no + or spaces
  whatsappNumber: "923274961389",

  // Payment accounts — customers send money to this number
  payments: {
    jazzcash: {
      label: "JazzCash",
      accountTitle: "NASEEM MANZOOR",
      accountNumber: "03452911049",
      color: "from-red-600 to-orange-500",
      dot: "bg-red-500",
    },
    easypaisa: {
      label: "Easypaisa",
      accountTitle: "NASEEM MANZOOR",
      accountNumber: "03452911049",
      color: "from-emerald-600 to-green-500",
      dot: "bg-emerald-500",
    },
  },
} as const;

export type PaymentKey = keyof typeof STORE.payments;

export type DiamondPack = {
  id: string;
  diamonds: number;
  price: number;
  market: string;
  tag?: string;
};

export const PACKS: DiamondPack[] = [
  { id: "d100", diamonds: 100, price: 230, market: "PKR 200–250" },
  { id: "d310", diamonds: 310, price: 700, market: "PKR 650–750", tag: "Best Seller" },
  { id: "d520", diamonds: 520, price: 1150, market: "PKR 1,100–1,200" },
  { id: "d1080", diamonds: 1080, price: 2350, market: "PKR 2,200–2,500", tag: "Popular" },
  { id: "d2200", diamonds: 2200, price: 4700, market: "PKR 4,400–4,800", tag: "Best Value" },
];

export const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");
