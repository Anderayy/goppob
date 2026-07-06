"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Grid3X3, Menu, Search, X } from "lucide-react";
import { categories, mainMenu } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  return (
    <>
      <div className="overflow-hidden bg-[#143d2b] px-4 py-2 text-xs font-semibold text-emerald-50">
        <Link href="/promotions" className="ticker block whitespace-nowrap">
          GoPPOB live: transaksi pulsa, data, PLN, e-wallet, game, dan tagihan dalam satu dashboard.
        </Link>
      </div>
      <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-[#fbfcf7]/88 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[190px_minmax(0,1fr)_auto] items-center gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-[#143d2b]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <Grid3X3 size={22} />
            </span>
            GoPPOB
          </Link>
          <nav className="hidden min-w-0 items-center justify-center gap-1 text-sm font-bold text-slate-700 lg:flex">
            {mainMenu.slice(1, 7).map(([label, href]) => (
              <Link key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 xl:px-4">
                {label}
              </Link>
            ))}
            <button className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700" onClick={() => setMega((value) => !value)} type="button">
              More <ChevronDown size={16} />
            </button>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <label className="hidden h-11 items-center gap-2 rounded-full bg-white px-4 text-sm text-slate-500 shadow-sm xl:flex">
              <Search size={17} />
              <input className="w-44 bg-transparent outline-none" placeholder="Cari produk..." />
            </label>
            <Link href="/login" className="font-bold text-[#143d2b]">Login</Link>
            <Link href="/reseller" className="font-bold text-[#143d2b]">Reseller</Link>
            <Link href="/admin/login" className="font-bold text-[#143d2b]">Admin CMS</Link>
            <Link href="/register" className="rounded-full bg-[#143d2b] px-6 py-3 font-black text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600">
              Register
            </Link>
          </div>
          <button className="justify-self-end lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" type="button">
            <Menu />
          </button>
        </div>
        {mega && (
          <div className="hidden border-t border-emerald-900/10 bg-[#fbfcf7] p-5 shadow-2xl lg:block">
            <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.slug} href={`/${category.slug}`} className="paper-card rounded-3xl p-5 transition hover:-translate-y-1">
                    <span className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${category.tone} text-white`}><Icon /></span>
                    <strong className="block text-[#143d2b]">{category.name}</strong>
                    <span className="text-sm text-slate-500">{category.description}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#fbfcf7] p-6 lg:hidden">
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 text-2xl font-black text-[#143d2b]"><Grid3X3 /> GoPPOB</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" type="button"><X /></button>
          </div>
          <div className="grid gap-3">
            {mainMenu.map(([label, href]) => (
              <Link onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm" key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm" href="/admin/login">Admin CMS</Link>
          </div>
        </div>
      )}
    </>
  );
}
