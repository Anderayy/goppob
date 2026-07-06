"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, ShieldQuestion, User } from "lucide-react";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/data";
import { rupiah } from "@/lib/utils";

type PaymentMethod = { label: string; logo: string; subtitle: string };
const methods: PaymentMethod[] = [
  { label: "QRIS All Pay", logo: "/brands/qris.svg", subtitle: "Scan semua bank & e-wallet" },
  { label: "GoPay", logo: "/brands/gopay.svg", subtitle: "Bayar instan via GoPay" },
  { label: "OVO", logo: "/brands/ovo.svg", subtitle: "Saldo OVO aktif" },
  { label: "ShopeePay", logo: "/brands/shopeepay.svg", subtitle: "Bayar lewat ShopeePay" },
  { label: "BCA Virtual Account", logo: "/brands/bca.svg", subtitle: "ATM, m-BCA, myBCA" },
  { label: "Mandiri Virtual Account", logo: "/brands/mandiri.svg", subtitle: "Livin, ATM, internet banking" },
  { label: "Indomaret / Ceriamart", logo: "/brands/indomaret.svg", subtitle: "Bayar di kasir Indomaret" },
  { label: "Alfamart / Alfamidi", logo: "/brands/alfamart.svg", subtitle: "Bayar di kasir Alfamart" },
];

export function CheckoutClient() {
  const params = useSearchParams();
  const product = products.find((item) => item.id === params.get("product")) ?? products[0];
  const target = params.get("target") ?? "0812-0099-7788";
  const subtotal = product.price || 50000;
  const total = subtotal + product.adminFee - 750;
  return (
    <main className="soft-grid min-h-screen text-[#14211b]">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-8">
          <div className="paper-card rounded-[30px] p-7">
            <div className="grid gap-4 sm:grid-cols-4">
              {["Menunggu Bayar", "Dibayar", "Diproses", "Berhasil"].map((step, index) => <div key={step} className="text-center"><span className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${index < 2 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>{index === 0 ? <CreditCard /> : <CheckCircle2 />}</span><strong className="mt-3 block text-sm">{step}</strong></div>)}
            </div>
          </div>
          <div className="paper-card rounded-[30px] p-7">
            <h1 className="mb-8 text-3xl font-black">Pilih Metode Pembayaran</h1>
            <PaymentGroup title="E-Wallet & QRIS" methods={methods.slice(0, 4)} />
            <PaymentGroup title="Virtual Account" methods={methods.slice(4, 6)} columns="md:grid-cols-2" />
            <PaymentGroup title="Gerai Retail" methods={methods.slice(6)} columns="md:grid-cols-2" />
          </div>
        </div>
        <aside className="grid content-start gap-6">
          <div className="paper-card overflow-hidden rounded-[30px]">
            <div className={`bg-gradient-to-br ${product.tone} p-7`}>
              <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-black text-[#143d2b]">INVOICE</span>
              <div className="mt-5 flex items-center gap-4">
                <span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-3"><Image src={product.logo} alt={product.provider} width={112} height={48} className="max-h-12 w-auto object-contain" /></span>
                <div><h2 className="text-2xl font-black">{product.name}</h2><p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-600"><User size={16} /> {target}</p></div>
              </div>
            </div>
            <div className="p-7">
              <Row label="Harga Produk" value={rupiah(subtotal)} />
              <Row label="Biaya Layanan" value={rupiah(product.adminFee)} />
              <Row label="Diskon Promo" value="-Rp 750" accent />
              <div className="mt-6 border-t border-slate-200 pt-6"><Row label="Total Bayar" value={rupiah(total)} big accent /></div>
              <Link href="/login?next=checkout" className="mt-6 block w-full rounded-full bg-[#143d2b] py-4 text-center text-xl font-black text-white shadow-lg shadow-emerald-200">Login untuk Bayar</Link>
            </div>
          </div>
          <div className="paper-card rounded-[28px] p-7">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-700">UNPAID</span>
            <h3 className="mt-4 font-black uppercase text-slate-500">Invoice ID</h3>
            <p className="text-xl font-black">GP-20260704-44091</p>
            <h3 className="mt-6 font-black uppercase text-slate-500">Waktu Transaksi</h3>
            <p className="text-lg text-slate-700">04 Juli 2026, 13:00 WIB</p>
            <Link href="/help-center" className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-5 font-black text-emerald-700"><ShieldQuestion /> Butuh Bantuan?</Link>
          </div>
        </aside>
      </section>
      <Footer />
    </main>
  );
}

function PaymentGroup({ title, methods, columns = "md:grid-cols-4" }: { title: string; methods: PaymentMethod[]; columns?: string }) {
  return <><h2 className="mb-4 mt-8 first:mt-0 font-black uppercase tracking-wide text-[#143d2b]">{title}</h2><div className={`grid gap-4 ${columns}`}>{methods.map((method, index) => <PaymentButton key={method.label} method={method} active={index === 0 && title === "E-Wallet & QRIS"} />)}</div></>;
}

function PaymentButton({ method, active = false }: { method: PaymentMethod; active?: boolean }) {
  return <button className={`overflow-hidden rounded-[24px] border text-left transition hover:-translate-y-1 hover:shadow-lg ${active ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`} type="button"><div className="grid h-28 place-items-center bg-slate-50 p-5"><span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-3 shadow-sm"><Image src={method.logo} alt={`Logo ${method.label}`} width={112} height={56} className="max-h-12 w-auto object-contain" /></span></div><div className="p-5"><strong className="block font-black">{method.label}</strong><span className="mt-1 block text-sm font-medium text-slate-500">{method.subtitle}</span></div></button>;
}

function Row({ label, value, accent = false, big = false }: { label: string; value: string; accent?: boolean; big?: boolean }) {
  return <div className={`mb-4 flex justify-between gap-4 ${big ? "text-2xl font-black" : "text-lg"}`}><span className="text-slate-600">{label}</span><strong className={accent ? "text-emerald-700" : ""}>{value}</strong></div>;
}
