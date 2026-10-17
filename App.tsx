import { useEffect, useState } from "react";
import { PACKS, STORE, formatPKR, type DiamondPack } from "./config";
import Checkout, { type Order } from "./components/Checkout";
import Admin from "./Admin";
import { BoltIcon, DiamondIcon, ShieldIcon, TagIcon, TelegramIcon, WalletIcon, WhatsAppIcon } from "./components/Icons";

const ORDERS_KEY = "firedrop_orders";

const faqs = [
  { q: "Diamonds kitni der mein milte hain?", a: "Most orders are delivered within 1–5 minutes after payment verification through our Telegram bot. During rush hours it may take up to 15 minutes." },
  { q: "Player ID kahan se milegi?", a: "Open Free Fire, tap your profile picture in the top-left corner, and copy the UID number shown under your nickname." },
  { q: "Kya mera account ka password chahiye?", a: "Bilkul nahi! We only need your Player ID. Never share your password or login with anyone." },
  { q: "Which region is supported?", a: "We deliver Pakistan-region Diamonds only. Please make sure your Free Fire account is on the Pakistan server, otherwise the top-up will fail." },
  { q: "Payment kaise karun?", a: "Send the exact amount to our JazzCash or Easypaisa account shown at checkout, then enter your sender number and Transaction ID (TID) from your SMS." },
  { q: "Agar Diamonds na milein to?", a: "Contact us on WhatsApp with your Order ID. If we can't deliver for any reason on our side, you get a full refund to your wallet." },
];

export default function App() {
  const [selected, setSelected] = useState<DiamondPack | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const links = [
    ["Diamonds", "#diamonds"],
    ["How it Works", "#how"],
    ["Payment", "#payment"],
    ["FAQ", "#faq"],
  ];
if (window.location.pathname === '/admin') {
  return <Admin />;
        }
  return (
    <div className="min-h-screen bg-[#0a0705] text-zinc-100 antialiased selection:bg-orange-500/40">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        🔥 Instant delivery 24/7 • JazzCash & Easypaisa Accepted • No card needed
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0705]/85 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-600/40">
              <BoltIcon className="h-5 w-5 text-yellow-200" />
            </span>
            <span className="text-lg font-black tracking-tight">
              Fire<span className="text-orange-500">Drop</span> <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">PK</span>
            </span>
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            {links.map(([l, h]) => (
              <li key={l}><a href={h} className="transition hover:text-orange-400">{l}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#diamonds"
              className="hidden rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2 text-sm font-bold text-black shadow-lg shadow-orange-600/30 transition hover:brightness-110 sm:inline-block"
            >
              Top Up Now
            </a>
            <button onClick={() => setMenu(!menu)} className="rounded-lg p-2 text-2xl leading-none md:hidden" aria-label="Menu">☰</button>
          </div>
        </nav>
        {menu && (
          <ul className="space-y-1 border-t border-white/5 px-5 py-3 md:hidden">
            {links.map(([l, h]) => (
              <li key={l}><a onClick={() => setMenu(false)} href={h} className="block rounded-lg px-3 py-2.5 text-zinc-300 hover:bg-white/5">{l}</a></li>
            ))}
          </ul>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-orange-600/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              🇵🇰 Made for Pakistani Gamers
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Pakistan Ka Apna{" "}
              <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">Free Fire Diamond</span>{" "}
              Store
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-zinc-400 md:mx-0">
              Instant Delivery. JazzCash & Easypaisa Accepted. Sasti rates, fast top-up — sirf Player ID chahiye.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a href="#diamonds" className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-7 py-3.5 font-bold text-black shadow-xl shadow-orange-600/30 transition hover:-translate-y-0.5 hover:brightness-110">
                💎 Buy Diamonds
              </a>
              <a
                href={`https://t.me/${STORE.telegramBot}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <TelegramIcon className="h-5 w-5 text-[#229ED9]" /> Open Bot
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
              {[
                ["⚡ 1–5 min", "Delivery"],
                ["🔒 100%", "Safe & Legit"],
                ["🕐 24/7", "Support"],
              ].map(([a, b]) => (
                <div key={b} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
                  <div className="text-sm font-bold text-white">{a}</div>
                  <div className="text-xs text-zinc-500">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-orange-500/30 blur-3xl" />
            <img
              src="/images/hero-diamond.png"
              alt="Free Fire Diamonds"
              className="animate-float relative w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl shadow-orange-900/40"
            />
            <div className="absolute -bottom-4 -left-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
              <DiamondIcon className="h-8 w-8" />
              <div>
                <div className="text-xs text-zinc-400">Starting from</div>
                <div className="font-bold text-orange-400">{formatPKR(PACKS[0].price)}</div>
              </div>
            </div>
            <div className="absolute -right-2 -top-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/90 px-4 py-2 text-sm font-bold text-emerald-300 shadow-xl sm:-right-4">
              ✓ Instant Delivery
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="diamonds" className="scroll-mt-20 border-y border-white/5 bg-gradient-to-b from-orange-950/20 to-transparent py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Diamond Packs</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Choose Your Top-Up</h2>
            <p className="mx-auto mt-3 max-w-lg text-zinc-400">Rates lower than market — pay with JazzCash or Easypaisa and get Diamonds on your Player ID in minutes.</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
            {PACKS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`group relative flex flex-col items-center overflow-hidden rounded-3xl border p-5 text-center transition duration-300 hover:-translate-y-1.5 ${
                  p.tag === "Best Seller"
                    ? "border-orange-500/70 bg-gradient-to-b from-orange-500/15 to-zinc-950 shadow-xl shadow-orange-900/30"
                    : "border-white/10 bg-gradient-to-b from-white/[0.06] to-zinc-950 hover:border-orange-500/50"
                } ${i === PACKS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                {p.tag && (
                  <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    {p.tag}
                  </span>
                )}
                <div className="relative mt-4">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl transition group-hover:bg-violet-400/40" />
                  <DiamondIcon className="relative h-14 w-14 transition duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="mt-4 text-3xl font-black text-white">{p.diamonds.toLocaleString()}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Diamonds</div>
                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="text-xl font-extrabold text-orange-400">{formatPKR(p.price)}</div>
                <div className="mt-1 text-[11px] text-zinc-500">Market: {p.market}</div>
                <span className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 py-2.5 text-sm font-bold text-black transition group-hover:brightness-110">
                  Buy Now
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            ⚠️ Pakistan server accounts only. Please double-check your Player ID before paying.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Simple Process</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Top-Up in 4 Easy Steps</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["💎", "Select Pack", "Choose the Diamond pack you want from the list above."],
              ["🆔", "Enter Player ID", "Type your Free Fire UID and confirm it's a Pakistan server account."],
              ["📲", "Pay via Wallet", "Send payment through JazzCash or Easypaisa and enter your TID."],
              ["⚡", "Get Diamonds", "Send your order to our Telegram bot — Diamonds arrive in minutes."],
            ].map(([icon, title, desc], i) => (
              <div key={title} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="absolute right-5 top-4 text-5xl font-black text-white/5">0{i + 1}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-600/20 text-2xl ring-1 ring-orange-500/30">{icon}</div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              [BoltIcon, "Instant Delivery", "Automated Telegram bot delivers your Diamonds within minutes, day or night."],
              [TagIcon, "Best Rates in PK", "Our prices sit below Daraz and local shops — more Diamonds for your rupees."],
              [WalletIcon, "No Card Needed", "Pay with the wallet you already use — JazzCash or Easypaisa."],
              [ShieldIcon, "Safe & Secure", "We only need your Player ID. Never your password. Refund if we can't deliver."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof BoltIcon;
              return (
                <div key={t as string} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:border-orange-500/40">
                  <I className="h-8 w-8 text-orange-400" />
                  <h3 className="mt-4 font-bold">{t as string}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment */}
      <section id="payment" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950">
            <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-12">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Payment Methods</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Pay the Pakistani Way</h2>
                <p className="mt-4 text-zinc-400">
                  No credit card, no hassle. Use JazzCash or Easypaisa from anywhere in Pakistan — city ho ya gaon.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {["Send exact amount to our wallet", "Enter your sender number & Transaction ID", "Order verified and Diamonds delivered"].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-400">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4">
                {Object.values(STORE.payments).map((p) => (
                  <div key={p.label} className={`rounded-3xl bg-gradient-to-r ${p.color} p-6 shadow-xl`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black text-white">{p.label}</div>
                        <div className="mt-1 text-sm text-white/80">Mobile Wallet • Instant</div>
                      </div>
                      <WalletIcon className="h-10 w-10 text-white/80" />
                    </div>
                    <div className="mt-6 font-mono text-lg tracking-wider text-white/90">{p.accountNumber}</div>
                    <div className="text-xs text-white/70">{p.accountTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Orders */}
      {orders.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-black">My Recent Orders</h2>
              <button onClick={() => setOrders([])} className="text-sm text-zinc-500 hover:text-red-400">Clear</button>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    {["Order ID", "Pack", "Amount", "Player ID", "Payment", "Date", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono font-semibold text-orange-300">{o.id}</td>
                      <td className="px-4 py-3">💎 {o.diamonds.toLocaleString()}</td>
                      <td className="px-4 py-3">{formatPKR(o.price)}</td>
                      <td className="px-4 py-3 font-mono">{o.playerId}</td>
                      <td className="px-4 py-3">{STORE.payments[o.method].label}</td>
                      <td className="px-4 py-3 text-zinc-400">{new Date(o.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</td>
                      <td className="px-4 py-3">
                        <a href={`https://t.me/${STORE.telegramBot}?start=${o.id}`} target="_blank" rel="noreferrer" className="text-[#229ED9] hover:underline">
                          Track
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 pb-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">FAQ</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Sawal Jawab</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                  {f.q}
                  <span className={`text-xl text-orange-400 transition ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 p-10 text-center md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
            <h2 className="relative text-3xl font-black text-white sm:text-4xl">Booyah! Ready for more Diamonds?</h2>
            <p className="relative mx-auto mt-3 max-w-lg text-white/85">Join thousands of Pakistani players topping up the fast and easy way.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a href="#diamonds" className="rounded-xl bg-black px-7 py-3.5 font-bold text-white transition hover:bg-zinc-900">💎 Top Up Now</a>
              <a
                href={`https://wa.me/${STORE.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-black transition hover:bg-zinc-100"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-lg font-black">
              Fire<span className="text-orange-500">Drop</span> PK
            </div>
            <p className="mt-1 text-sm text-zinc-500">{STORE.tagline}</p>
          </div>
          <div className="flex gap-3">
            <a href={`https://t.me/${STORE.telegramBot}`} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[#229ED9] transition hover:bg-white/10" aria-label="Telegram">
              <TelegramIcon />
            </a>
            <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[#25D366] transition hover:bg-white/10" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-3xl px-5 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} FireDrop PK. Independent reseller — not affiliated with or endorsed by Garena. Free Fire is a trademark of Garena International.
        </p>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${STORE.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/40 transition hover:scale-110"
        aria-label="WhatsApp support"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {selected && (
        <Checkout
          pack={selected}
          onClose={() => setSelected(null)}
          onPlaced={(o) => setOrders((prev) => [o, ...prev].slice(0, 20))}
        />
      )}
    </div>
  );
}
