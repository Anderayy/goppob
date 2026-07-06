"use client";

import { useState } from "react";

export function ResellerForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input className="h-14 rounded-2xl border border-emerald-200 bg-white px-4 outline-none focus:border-emerald-500" required placeholder="Nama pemilik" />
        <input className="h-14 rounded-2xl border border-emerald-200 bg-white px-4 outline-none focus:border-emerald-500" required placeholder="Nomor WhatsApp" />
        <input className="h-14 rounded-2xl border border-emerald-200 bg-white px-4 outline-none focus:border-emerald-500" required placeholder="Nama toko / loket" />
        <input className="h-14 rounded-2xl border border-emerald-200 bg-white px-4 outline-none focus:border-emerald-500" required placeholder="Kota operasional" />
      </div>
      <select className="h-14 rounded-2xl border border-emerald-200 bg-white px-4 outline-none focus:border-emerald-500" required defaultValue="">
        <option value="" disabled>Kebutuhan utama</option>
        <option>Jual pulsa, data, dan e-wallet</option>
        <option>Loket tagihan PLN/BPJS/PDAM</option>
        <option>Top up game dan voucher digital</option>
        <option>Butuh API bisnis dan webhook</option>
      </select>
      <button className="rounded-2xl bg-[#143d2b] px-6 py-4 font-black text-white shadow-lg shadow-emerald-100" type="submit">
        Kirim Pendaftaran Reseller
      </button>
      {sent && <p className="rounded-2xl bg-emerald-50 px-4 py-3 font-bold text-emerald-700">Pendaftaran reseller terkirim. Admin GoPPOB akan follow up via WhatsApp.</p>}
    </form>
  );
}
