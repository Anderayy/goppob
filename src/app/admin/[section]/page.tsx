import { AdminShell } from "@/components/admin-shell";
import { adminMenu } from "@/lib/data";

type PageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return adminMenu
    .filter((menu) => String(menu[1]).split("/").filter(Boolean).length > 1)
    .map((menu) => ({ section: String(menu[1]).split("/").filter(Boolean).pop() ?? "admin" }));
}

export default async function AdminSectionPage({ params }: PageProps) {
  const { section } = await params;
  const item = adminMenu.find((menu) => String(menu[1]).endsWith(section));
  return <AdminShell section={item ? String(item[0]) : section.replaceAll("-", " ")} />;
}
