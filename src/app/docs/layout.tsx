import Link from "next/link"

const NAV = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/sitemap", label: "App Map" },
  { href: "/docs/design-system", label: "Design System" },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f5f5f0] font-sans">
      <aside className="w-52 shrink-0 bg-[#1e1e30] text-white flex flex-col py-8 px-4 sticky top-0 h-screen">
        <Link href="/docs" className="mb-8 block">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-0.5">ezer KPI</p>
          <p className="font-bold text-lg leading-tight">Docs</p>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/10">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Kembali ke App
          </Link>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
