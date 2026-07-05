"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowRight, CheckCircle2, Clock3, Headphones, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { categories, chartData, liveOrders, products, promos } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { QuickOrderForm } from "@/components/quick-order-form";
import { SiteHeader } from "@/components/site-header";
import { rupiah } from "@/lib/utils";

export function HomePage() {
  return (
    <main className="soft-grid min-h-screen text-[#14211b]">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="paper-card hero-bento relative min-h-[620px] overflow-hidden rounded-[36px] p-8 md:p-10 xl:min-h-[640px]">
          <span className="absolute left-8 top-8 h-24 w-24 rounded-full bg-emerald-300/30 blur-2xl" />
          <span className="absolute bottom-12 right-24 h-28 w-28 rounded-full bg-blue-300/30 blur-2xl" />
          <div className="absolute right-0 top-0 h-full w-[58%]">
            <Image src="/images/goppob-hero.png" alt="Dashboard GoPPOB" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">PPOB Command Panel</span>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.02] md:text-7xl">Semua Pembayaran Digital Dalam Satu Panel</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">GoPPOB menyatukan pulsa, data, PLN, tagihan, e-wallet, game, dan voucher entertainment dalam dashboard yang cepat dipakai.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#order" className="inline-flex items-center gap-2 rounded-full bg-[#143d2b] px-7 py-4 font-black text-white shadow-lg shadow-emerald-200">Mulai Transaksi <ArrowRight size={18} /></Link>
              <Link href="/business" className="rounded-full bg-white px-7 py-4 font-black text-[#143d2b] shadow-sm">Solusi Bisnis</Link>
            </div>
            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/90 p-4 shadow-lg shadow-emerald-100">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">LIVE</span>
                  <Clock3 size={18} className="text-slate-400" />
                </div>
                <strong className="block text-2xl">Rp 42.8M</strong>
                <p className="text-sm text-slate-500">volume transaksi hari ini</p>
              </div>
              <div className="rounded-3xl bg-[#143d2b] p-4 text-white shadow-lg shadow-emerald-100">
                <Sparkles className="mb-2 text-lime-300" />
                <strong>Routing cepat</strong>
                <p className="text-sm text-white/70">mock provider adapter</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 z-10 grid gap-3 md:grid-cols-3">
            {["Provider online", "Invoice otomatis", "Support API"].map((item) => <span key={item} className="rounded-2xl bg-white/90 px-4 py-3 text-sm font-black shadow-sm">{item}</span>)}
          </div>
        </div>
        <div id="order"><QuickOrderForm /></div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-8">
        <div className="paper-card overflow-hidden rounded-3xl py-4">
          <div className="logo-marquee flex min-w-max gap-8 px-6">
            {[...products.slice(0, 10), ...products.slice(0, 10)].map((product, index) => (
              <span key={`${product.id}-${index}`} className="flex h-14 w-28 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-sm">
                <Image src={product.logo} alt={product.provider} width={92} height={34} className="max-h-8 w-auto object-contain" />
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-4">
        {[
          ["Cashback Kilat", "QRIS & e-wallet", "bg-emerald-500"],
          ["Game Weekend", "MLBB, FF, Steam", "bg-blue-600"],
          ["Tagihan Hemat", "PLN, BPJS, PDAM", "bg-orange-500"],
          ["Bisnis API", "Webhook + reports", "bg-[#143d2b]"],
        ].map(([title, copy, color]) => (
          <Link key={title} href="/promotions" className={`${color} relative min-h-40 overflow-hidden rounded-3xl p-6 text-white shadow-xl transition hover:-translate-y-2`}>
            <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20" />
            <span className="absolute bottom-4 right-4 h-16 w-16 rounded-full bg-white/10" />
            <h3 className="relative text-2xl font-black">{title}</h3>
            <p className="relative mt-2 text-sm text-white/80">{copy}</p>
            <span className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-black">Lihat <ArrowRight size={15} /></span>
          </Link>
        ))}
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="paper-card rounded-[30px] p-5">
          <h2 className="mb-4 text-xl font-black">Kategori</h2>
          <div className="grid gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.slug} href={`/${category.slug}`} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-bold text-slate-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${category.tone} text-white`}><Icon size={18} /></span>
                  {category.name}
                </Link>
              );
            })}
          </div>
        </aside>
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
            <div className="paper-card rounded-[30px] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black">Volume Hari Ini</h2>
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">Realtime</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => rupiah(Number(value))} />
                    <Bar dataKey="value" fill="#10b981" radius={[14, 14, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="paper-card rounded-[30px] p-6">
              <h2 className="mb-4 text-2xl font-black">Live Order</h2>
              <div className="grid gap-3">
                {liveOrders.slice(0, 4).map((order) => (
                  <div key={`${order.name}-${order.product}`} className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
                    <span><strong className="block">{order.name} · {order.city}</strong><span className="text-sm text-slate-500">{order.product}</span></span>
                    <span className="font-black text-emerald-700">{order.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {promos.map((promo) => (
              <Link key={promo.title} href="/promotions" className="paper-card group overflow-hidden rounded-3xl">
                <div className="relative h-36">
                  <Image src={promo.image} alt={promo.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5"><h3 className="font-black">{promo.title}</h3><p className="mt-2 text-sm text-slate-500">{promo.copy}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionTitle title="Produk Paling Sering Dipakai" copy="Produk dummy realistis dengan logo operator dan merchant." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-3">
        <Info title="Saldo Lebih Cepat" text="Gunakan deposit saldo untuk transaksi berulang dan biaya lebih ringan." />
        <Info title="Bayar Langsung" text="Pelanggan tamu tetap bisa checkout via QRIS, VA, atau gerai retail." />
        <Info title="Siap Bisnis" text="Dashboard bisnis, API key, webhook, provider log, dan laporan siap dikembangkan." />
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["1.1M+", "Transaksi"],
            ["520K+", "Pengguna"],
            ["35", "Provider Route"],
            ["99.7%", "Sukses"],
          ].map(([value, label]) => (
            <div key={label} className="paper-card rounded-3xl bg-gradient-to-br from-white to-emerald-50 p-6 text-center">
              <strong className="block text-3xl font-black text-[#143d2b]">{value}</strong>
              <span className="mt-2 block text-sm font-bold text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle title="Keamanan, FAQ, dan Blog" copy="Konten trust untuk pelanggan dan bisnis." />
        <div className="grid gap-5 md:grid-cols-3">
          {["Validasi input dan invoice unik.", "Provider mock adapter siap diganti API real.", "Refund dan audit log tersedia di CMS."].map((item) => <div key={item} className="paper-card rounded-3xl p-6"><ShieldCheck className="mb-4 text-emerald-600" /><p className="font-bold">{item}</p></div>)}
        </div>
      </section>
      <Link href="https://wa.me/6281234567890" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl" aria-label="WhatsApp customer service"><Headphones /></Link>
      <LiveToast />
      <Footer />
    </main>
  );
}

function SectionTitle({ title, copy }: { title: string; copy: string }) {
  return <div className="mb-9 text-center"><h2 className="text-3xl font-black md:text-4xl">{title}</h2><p className="mt-2 text-slate-500">{copy}</p></div>;
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="paper-card rounded-3xl p-7"><TrendingUp className="mb-4 text-emerald-600" /><h3 className="text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-slate-500">{text}</p></div>;
}

function LiveToast() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % liveOrders.length), 3400);
    return () => window.clearInterval(timer);
  }, []);
  const order = liveOrders[index];
  return (
    <div className="paper-card fixed bottom-24 left-5 z-40 hidden max-w-[330px] items-center gap-3 rounded-2xl p-3 md:flex">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 size={18} /></span>
      <div className="min-w-0"><p className="truncate text-sm font-bold">{order.name} dari {order.city} membeli {order.product}</p><p className="text-xs text-slate-500">transaksi berhasil · {order.amount}</p></div>
    </div>
  );
}
