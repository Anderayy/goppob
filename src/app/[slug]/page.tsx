import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { categories, mainMenu, products, promos } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const content: Record<string, { title: string; copy: string }> = {
  promotions: { title: "Promotions", copy: "Flash promo, cashback, dan campaign produk digital aktif." },
  "transaction-tracking": { title: "Transaction Tracking", copy: "Pantau invoice, pembayaran, dan status provider secara realtime." },
  business: { title: "Business", copy: "Akun bisnis dengan deposit saldo, API key, webhook, dan laporan." },
  "api-documentation": { title: "API Documentation", copy: "Dokumentasi mock endpoint untuk integrasi PPOB dan callback webhook." },
  "help-center": { title: "Help Center", copy: "Panduan transaksi, refund, pembayaran, dan tiket bantuan." },
  blog: { title: "Blog", copy: "Update produk, strategi PPOB, dan insight transaksi digital." },
  login: { title: "Login", copy: "Demo user: user@goppob.com / password123." },
  register: { title: "Register", copy: "Buat akun pelanggan atau bisnis untuk akses saldo dan API." },
  terms: { title: "Terms", copy: "Syarat penggunaan layanan GoPPOB." },
  "privacy-policy": { title: "Privacy Policy", copy: "Kebijakan privasi dan pengelolaan data pelanggan." },
};

export function generateStaticParams() {
  return [
    ...categories.map((item) => ({ slug: item.slug })),
    ...Object.keys(content).map((slug) => ({ slug })),
  ];
}

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  const page = content[slug];
  if (!category && !page) notFound();

  const list = category ? products.filter((product) => product.category === category.name) : products;
  const title = category?.name ?? page.title;
  const copy = category?.description ?? page.copy;

  return (
    <main className="soft-grid min-h-screen text-[#14211b]">
      <SiteHeader />
      <section className="relative overflow-hidden px-5 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.2),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl">
          <span className="rounded-full border bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">goppob.com</span>
          <h1 className="mt-6 text-5xl font-black text-[#14211b] md:text-7xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{copy}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        {slug === "transaction-tracking" ? <TrackingPanel /> : slug === "promotions" ? <PromoList /> : slug === "login" || slug === "register" ? <AuthPanel mode={slug} /> : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#14211b]">{category ? `${category.name} Products` : "Product Catalog"}</h2>
              <div className="flex flex-wrap gap-3">
                {mainMenu.slice(1, 6).map(([label, href]) => <Link className="rounded-full border border-cyan-400/15 bg-white/5 px-4 py-2 text-sm font-bold text-slate-600" key={href} href={href}>{label}</Link>)}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}

function TrackingPanel() {
  return (
    <div className="paper-card grid gap-6 rounded-[30px] p-8 md:grid-cols-[1fr_1fr]">
      <div>
        <h2 className="text-2xl font-black text-[#14211b]">Track Invoice</h2>
        <p className="mt-2 text-slate-500">Contoh invoice: VP-20260704-44091.</p>
        <input className="mt-6 h-14 w-full rounded-2xl border border-cyan-400/20 bg-black/30 px-4 text-[#14211b] outline-none focus:border-cyan-300" placeholder="Masukkan invoice ID" />
        <button className="mt-4 rounded-2xl bg-[#143d2b] px-6 py-3 font-black text-white" type="button">Track</button>
      </div>
      <div className="rounded-3xl border border-cyan-400/15 bg-white/5 p-6">
        <span className="rounded-full bg-lime-300 px-3 py-1 text-sm font-black text-[#050816]">Processing</span>
        <h3 className="mt-4 text-xl font-black text-[#14211b]">GoPay 50K</h3>
        <p className="mt-2 text-slate-500">Payment accepted. Provider delivery is running through mock adapter.</p>
      </div>
    </div>
  );
}

function PromoList() {
  return <div className="grid gap-6 md:grid-cols-3">{promos.map((promo) => <article className="paper-card rounded-[28px] p-6" key={promo.title}><h2 className="text-2xl font-black text-[#14211b]">{promo.title}</h2><p className="mt-3 text-slate-500">{promo.copy}</p><button className="mt-6 rounded-full bg-[#143d2b] px-6 py-3 font-black text-white" type="button">Activate</button></article>)}</div>;
}

function AuthPanel({ mode }: { mode: string }) {
  return (
    <div className="paper-card mx-auto max-w-xl rounded-[28px] p-8">
      <h2 className="text-2xl font-black text-[#14211b]">{mode === "login" ? "Login Account" : "Register Account"}</h2>
      <input className="mt-6 h-14 w-full rounded-2xl border border-cyan-400/20 bg-black/30 px-4 text-[#14211b]" placeholder="Email" />
      <input className="mt-3 h-14 w-full rounded-2xl border border-cyan-400/20 bg-black/30 px-4 text-[#14211b]" placeholder="Password" type="password" />
      <Link href="/dashboard" className="mt-5 block rounded-2xl bg-cyan-400 px-6 py-4 text-center font-black text-[#050816]">{mode === "login" ? "Login" : "Register"}</Link>
    </div>
  );
}

