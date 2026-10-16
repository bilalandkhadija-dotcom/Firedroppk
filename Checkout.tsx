import { useEffect, useState } from "react";
import { STORE, formatPKR, type DiamondPack, type PaymentKey } from "../config";
import { CheckIcon, CopyIcon, DiamondIcon, TelegramIcon, WhatsAppIcon, XIcon } from "./Icons";

export type Order = {
  id: string;
  packId: string;
  diamonds: number;
  price: number;
  playerId: string;
  nickname: string;
  method: PaymentKey;
  sender: string;
  trxId: string;
  createdAt: number;
};

type Props = {
  pack: DiamondPack;
  onClose: () => void;
  onPlaced: (o: Order) => void;
};

const makeOrderId = () =>
  "FD" + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 5).toUpperCase();

export default function Checkout({ pack, onClose, onPlaced }: Props) {
  const [step, setStep] = useState(1);
  const [playerId, setPlayerId] = useState("");
  const [nickname, setNickname] = useState("");
  const [regionOk, setRegionOk] = useState(false);
  const [method, setMethod] = useState<PaymentKey>("jazzcash");
  const [sender, setSender] = useState("");
  const [trxId, setTrxId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const idValid = /^\d{8,12}$/.test(playerId);
  const senderValid = /^03\d{9}$/.test(sender.replace(/[-\s]/g, ""));
  const trxValid = trxId.trim().length >= 6;
  const pay = STORE.payments[method];

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const placeOrder = () => {
    const o: Order = {
      id: makeOrderId(),
      packId: pack.id,
      diamonds: pack.diamonds,
      price: pack.price,
      playerId,
      nickname: nickname.trim(),
      method,
      sender: sender.replace(/[-\s]/g, ""),
      trxId: trxId.trim(),
      createdAt: Date.now(),
    };
    setOrder(o);
    onPlaced(o);
    setStep(3);
  };

  const orderText = order
    ? `🔥 FireDrop PK Order\nOrder ID: ${order.id}\nPack: ${order.diamonds} Diamonds\nAmount: ${formatPKR(order.price)}\nPlayer ID: ${order.playerId}${order.nickname ? `\nNickname: ${order.nickname}` : ""}\nRegion: Pakistan\nPaid via: ${STORE.payments[order.method].label}\nSender: ${order.sender}\nTRX ID: ${order.trxId}`
    : "";

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-orange-900/30 sm:rounded-3xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <DiamondIcon className="h-8 w-8" />
            <div>
              <div className="font-bold text-white">{pack.diamonds.toLocaleString()} Diamonds</div>
              <div className="text-sm font-semibold text-orange-400">{formatPKR(pack.price)}</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white" aria-label="Close">
            <XIcon />
          </button>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 px-6 pt-5">
          {["Player ID", "Payment", "Done"].map((s, i) => (
            <div key={s} className="flex flex-1 flex-col gap-1.5">
              <div className={`h-1.5 rounded-full transition ${step > i ? "bg-gradient-to-r from-orange-500 to-yellow-400" : "bg-white/10"}`} />
              <span className={`text-xs ${step > i ? "text-orange-300" : "text-zinc-500"}`}>{i + 1}. {s}</span>
            </div>
          ))}
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Free Fire Player ID (UID) *</label>
                <input
                  inputMode="numeric"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value.replace(/\D/g, "").slice(0, 12))}
                  placeholder="e.g. 1234567890"
                  className={inputCls}
                />
                <p className={`mt-1.5 text-xs ${playerId && !idValid ? "text-red-400" : "text-zinc-500"}`}>
                  {playerId && !idValid ? "Player ID must be 8–12 digits." : "Find it in-game: tap your profile picture → copy UID."}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">In-game Nickname (optional)</label>
                <input value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 24))} placeholder="Your FF name" className={inputCls} />
              </div>

              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                <p className="text-sm font-semibold text-yellow-300">⚠️ Important — Region Check</p>
                <p className="mt-1 text-sm text-yellow-100/80">
                  Pakistan-region Diamonds only work on <b>Pakistan server</b> accounts. Wrong region = failed top-up.
                </p>
                <label className="mt-3 flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={regionOk} onChange={(e) => setRegionOk(e.target.checked)} className="mt-0.5 h-5 w-5 accent-orange-500" />
                  <span className="text-sm text-white">Haan, my account is on the Pakistan server.</span>
                </label>
              </div>

              <button
                disabled={!idValid || !regionOk}
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 py-3.5 font-bold text-black shadow-lg shadow-orange-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-medium text-zinc-300">Choose payment method</p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(STORE.payments) as PaymentKey[]).map((k) => {
                    const p = STORE.payments[k];
                    const active = method === k;
                    return (
                      <button
                        key={k}
                        onClick={() => setMethod(k)}
                        className={`relative rounded-2xl border p-4 text-left transition ${active ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5 hover:border-white/25"}`}
                      >
                        <div className={`mb-2 inline-flex rounded-lg bg-gradient-to-r ${p.color} px-2.5 py-1 text-xs font-bold text-white`}>{p.label}</div>
                        <div className="text-xs text-zinc-400">Mobile wallet</div>
                        {active && (
                          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-black">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`rounded-2xl bg-gradient-to-br ${pay.color} p-[1px]`}>
                <div className="space-y-3 rounded-2xl bg-zinc-950 p-4">
                  <p className="text-sm text-zinc-300">
                    Send exactly <b className="text-white">{formatPKR(pack.price)}</b> to this {pay.label} account:
                  </p>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <div>
                      <div className="text-xs text-zinc-500">Account Number</div>
                      <div className="font-mono text-lg font-bold tracking-wide text-white">{pay.accountNumber}</div>
                      <div className="text-xs text-zinc-400">Title: {pay.accountTitle}</div>
                    </div>
                    <button
                      onClick={() => copy(pay.accountNumber.replace(/-/g, ""), "acc")}
                      className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
                    >
                      {copied === "acc" ? <CheckIcon className="h-4 w-4" /> : <CopyIcon />}
                      {copied === "acc" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Your {pay.label} number (sender) *</label>
                <input inputMode="tel" value={sender} onChange={(e) => setSender(e.target.value.slice(0, 13))} placeholder="03XXXXXXXXX" className={inputCls} />
                {sender && !senderValid && <p className="mt-1.5 text-xs text-red-400">Enter a valid 11-digit number starting with 03.</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Transaction ID (TID) *</label>
                <input value={trxId} onChange={(e) => setTrxId(e.target.value.slice(0, 30))} placeholder="From your payment SMS" className={inputCls} />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="rounded-xl border border-white/15 px-5 py-3.5 font-medium text-white transition hover:bg-white/5">
                  Back
                </button>
                <button
                  disabled={!senderValid || !trxValid}
                  onClick={placeOrder}
                  className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 py-3.5 font-bold text-black shadow-lg shadow-orange-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && order && (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5">
                <CheckIcon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Order Placed!</h3>
                <p className="mt-1 text-sm text-zinc-400">Send your order to our bot to get Diamonds instantly.</p>
              </div>

              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm">
                {[
                  ["Order ID", order.id],
                  ["Pack", `${order.diamonds.toLocaleString()} Diamonds`],
                  ["Amount", formatPKR(order.price)],
                  ["Player ID", order.playerId],
                  ["Payment", STORE.payments[order.method].label],
                  ["TRX ID", order.trxId],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-zinc-500">{k}</span>
                    <span className="font-mono font-semibold text-white">{v}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://t.me/${STORE.telegramBot}?start=${order.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-3.5 font-bold text-white transition hover:brightness-110"
              >
                <TelegramIcon /> Send to Telegram Bot
              </a>
              <a
                href={`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(orderText)}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-bold text-black transition hover:brightness-110"
              >
                <WhatsAppIcon /> Send on WhatsApp
              </a>
              <button
                onClick={() => copy(orderText, "order")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                {copied === "order" ? <CheckIcon className="h-4 w-4" /> : <CopyIcon />} {copied === "order" ? "Copied!" : "Copy order details"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
