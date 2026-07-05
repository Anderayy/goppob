"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, WalletCards } from "lucide-react";
import { categories, products } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function QuickOrderForm() {
  const router = useRouter();
  const [category, setCategory] = useState("Pulsa");
  const [target, setTarget] = useState("");
  const [selected, setSelected] = useState(products[0].id);
  const [payment, setPayment] = useState("QRIS All Pay");
  const filtered = useMemo(() => products.filter((product) => product.category === category).slice(0, 4), [category]);
  const product = products.find((item) => item.id === selected) ?? filtered[0] ?? products[0];

  function submit() {
    const params = new URLSearchParams({ product: product.id, target: target || "0812-0099-7788", payment });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <section className="paper-card rounded-[30px] p-5 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-white"><WalletCards /></span>
        <div>
          <h2 className="text-xl font-black text-[#14211b]">Transaksi Cepat</h2>
          <p className="text-sm text-slate-500">Pilih kategori, masukkan nomor, lalu checkout.</p>
        </div>
      </div>
      <div className="grid gap-5">
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;
            const active = item.name === category;
            return (
              <button key={item.slug} onClick={() => { setCategory(item.name); setSelected(products.find((product) => product.category === item.name)?.id ?? products[0].id); }} className={`flex min-h-12 items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${active ? "bg-[#143d2b] text-white shadow-lg shadow-emerald-100" : "bg-white text-slate-600 hover:bg-emerald-50"}`} type="button">
                <Icon size={18} /> {item.name}
              </button>
            );
          })}
        </div>
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-slate-600">
            Nomor / ID Pelanggan
            <input value={target} onChange={(event) => setTarget(event.target.value)} className="h-14 rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500" placeholder="0812xxxx / ID pelanggan" />
          </label>
          <div className="grid gap-3">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setSelected(item.id)} className={`flex min-h-22 items-center gap-3 rounded-2xl border p-3 text-left transition hover:-translate-y-1 ${selected === item.id ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100" : "border-slate-200 bg-white"}`} type="button">
                <span className="grid h-14 w-20 shrink-0 place-items-center rounded-xl bg-white p-2 shadow-sm">
                  <Image src={item.logo} alt={`Logo ${item.provider}`} width={80} height={34} className="max-h-9 w-auto object-contain" />
                </span>
                <span><span className="block font-black text-[#14211b]">{item.name}</span><span className="text-xs text-slate-500">{rupiah(item.price + item.adminFee)}</span></span>
              </button>
            ))}
          </div>
          <div className="grid gap-3">
            <select value={payment} onChange={(event) => setPayment(event.target.value)} className="h-14 rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500">
              {["QRIS All Pay", "GoPay", "OVO", "ShopeePay", "BCA Virtual Account", "Mandiri Virtual Account", "Indomaret", "Alfamart"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <button onClick={submit} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#143d2b] px-8 font-black text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600" type="button">
              Lanjut Bayar <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
