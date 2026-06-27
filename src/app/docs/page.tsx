import Link from "next/link"

const cards = [
  {
    href: "/docs/sitemap",
    emoji: "🗺️",
    title: "App Map",
    desc: "Diagram alur semua halaman dan navigasi antar layar.",
  },
  {
    href: "/docs/design-system",
    emoji: "🎨",
    title: "Design System",
    desc: "Token warna, tipografi, radius, dan inventori komponen.",
  },
]

export default function DocsHome() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold text-[#1e1e30] mb-2">Dokumentasi</h1>
      <p className="text-zinc-500 mb-10">Referensi teknis dan desain untuk app ezer KPI.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group bg-white rounded-2xl p-6 border border-zinc-200 hover:border-[#4ecb71] hover:shadow-md transition-all"
          >
            <p className="text-3xl mb-3">{c.emoji}</p>
            <p className="font-semibold text-[#1e1e30] text-lg group-hover:text-[#1a5c35]">{c.title}</p>
            <p className="text-sm text-zinc-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
