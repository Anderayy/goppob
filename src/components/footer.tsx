import Link from "next/link";
import { Grid3X3, Mail, MessageCircle, Send } from "lucide-react";

const footerLinks: Record<string, Array<[string, string]>> = {
  Produk: [
    ["Pulsa", "/pulsa"],
    ["Data", "/data"],
    ["PLN", "/pln"],
    ["E-Wallet", "/e-wallet"],
  ],
  Platform: [
    ["Business", "/business"],
    ["API Documentation", "/api-documentation"],
    ["Transaction Tracking", "/transaction-tracking"],
    ["Promotions", "/promotions"],
  ],
  Akun: [
    ["Login", "/login"],
    ["Register", "/register"],
    ["Dashboard", "/dashboard"],
    ["Admin CMS", "/admin/login"],
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-emerald-900/10 bg-[#f6f8f3]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-[#143d2b]"><Grid3X3 /> GoPPOB</h2>
          <p className="text-sm leading-7 text-slate-600">Platform PPOB modern untuk mengelola pembayaran digital pelanggan dan bisnis dalam satu panel.</p>
          <div className="mt-5 flex gap-3 text-emerald-700"><Send /><MessageCircle /><Mail /></div>
        </div>
        {Object.entries(footerLinks).map(([title, items]) => <FooterGroup key={title} title={title} items={items} />)}
      </div>
      <div className="border-t border-emerald-900/10 py-5 text-center text-xs text-slate-500">&copy; 2026 goppob.com - Semua Pembayaran Digital Dalam Satu Panel.</div>
    </footer>
  );
}

function FooterGroup({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <div>
      <h3 className="mb-4 font-bold uppercase tracking-wide text-[#143d2b]">{title}</h3>
      <div className="grid gap-3 text-sm text-slate-600">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="hover:text-emerald-700">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
