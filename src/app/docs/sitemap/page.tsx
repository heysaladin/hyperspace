import Link from "next/link"

/* ─── Types ─── */
type NodeColor = "dark" | "green" | "blue" | "amber" | "zinc" | "purple" | "rose"

interface MapNode {
  label: string
  path: string
  color?: NodeColor
  children?: MapNode[]
}

/* ─── Color map ─── */
const COLOR: Record<NodeColor, { bg: string; border: string; text: string; dot: string }> = {
  dark:   { bg: "bg-[#1e1e30]",   border: "border-[#1e1e30]",   text: "text-white",        dot: "bg-white" },
  green:  { bg: "bg-[#4ecb71]/15",border: "border-[#4ecb71]",   text: "text-[#1a5c35]",    dot: "bg-[#4ecb71]" },
  blue:   { bg: "bg-blue-50",      border: "border-blue-400",    text: "text-blue-800",     dot: "bg-blue-400" },
  amber:  { bg: "bg-amber-50",     border: "border-amber-400",   text: "text-amber-800",    dot: "bg-amber-400" },
  zinc:   { bg: "bg-zinc-100",     border: "border-zinc-300",    text: "text-zinc-700",     dot: "bg-zinc-400" },
  purple: { bg: "bg-purple-50",    border: "border-purple-400",  text: "text-purple-800",   dot: "bg-purple-400" },
  rose:   { bg: "bg-rose-50",      border: "border-rose-400",    text: "text-rose-800",     dot: "bg-rose-400" },
}

/* ─── App tree ─── */
const AUTH_NODES: MapNode[] = [
  { label: "Splash", path: "/splash", color: "dark" },
  {
    label: "Login", path: "/login", color: "dark",
    children: [
      { label: "Lupa Password", path: "/lupa-password", color: "zinc" },
    ],
  },
  {
    label: "Daftar", path: "/daftar", color: "dark",
    children: [
      { label: "Aktivasi Akun", path: "/aktivasi", color: "zinc" },
    ],
  },
]

const MAIN_TABS: MapNode[] = [
  { label: "Home", path: "/", color: "green" },
  { label: "Dashboard", path: "/dashboard", color: "blue" },
  {
    label: "My KPI", path: "/kpi", color: "green",
    children: [
      {
        label: "Detail KPI", path: "/kpi/[id]", color: "green",
        children: [
          { label: "Edit KPI", path: "/kpi/[id]/edit", color: "zinc" },
          { label: "Update Realisasi", path: "/kpi/[id]/update", color: "zinc" },
        ],
      },
      { label: "Buat KPI", path: "/kpi/create", color: "zinc" },
    ],
  },
  { label: "My Tasks", path: "/task", color: "amber" },
]

const MORE_NODES: MapNode[] = [
  { label: "Pencapaian", path: "/badges", color: "purple" },
  {
    label: "Team KPI", path: "/team-kpi", color: "blue",
    children: [
      { label: "KPI Anggota", path: "/team-kpi/[memberId]", color: "zinc" },
    ],
  },
  { label: "Approval", path: "/approval", color: "amber" },
  { label: "Verifikasi", path: "/verifikasi", color: "amber" },
  { label: "Notifikasi", path: "/notifikasi", color: "zinc" },
  {
    label: "Profil", path: "/profil", color: "zinc",
    children: [
      { label: "Ganti Password", path: "/profil/ganti-password", color: "zinc" },
      { label: "Pengaturan Notif", path: "/profil/notifikasi-settings", color: "zinc" },
    ],
  },
]

/* ─── Small node box ─── */
function Node({ node, depth = 0 }: { node: MapNode; depth?: number }) {
  const c = COLOR[node.color ?? "zinc"]
  const isDynamic = node.path.includes("[")
  const cls = `flex items-center gap-2 px-3 py-2 rounded-xl border ${c.bg} ${c.border} ${c.text} text-[13px] font-medium w-fit transition-opacity`
  const inner = (
    <>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      <span>{node.label}</span>
      <span className="text-[11px] opacity-50 font-normal">{node.path}</span>
    </>
  )
  return (
    <div className={`flex flex-col gap-2 ${depth > 0 ? "ml-5 pl-4 border-l-2 border-dashed border-zinc-200" : ""}`}>
      {isDynamic
        ? <span className={cls}>{inner}</span>
        : <Link href={node.path} className={`${cls} hover:opacity-80`}>{inner}</Link>
      }
      {node.children?.map((child) => (
        <Node key={child.path} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

/* ─── Section block ─── */
function Section({ title, subtitle, nodes, columns = 1 }: {
  title: string
  subtitle: string
  nodes: MapNode[]
  columns?: number
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6">
      <div className="mb-5">
        <h2 className="font-bold text-[#1e1e30] text-base">{title}</h2>
        <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
      </div>
      <div className={`grid gap-4 ${columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {nodes.map((node) => (
          <Node key={node.path} node={node} />
        ))}
      </div>
    </div>
  )
}

/* ─── Legend ─── */
const LEGEND: { color: NodeColor; label: string }[] = [
  { color: "dark",   label: "Auth / Onboarding" },
  { color: "green",  label: "KPI Core" },
  { color: "blue",   label: "Analytics & Team" },
  { color: "amber",  label: "Workflow (Task / Approval)" },
  { color: "purple", label: "Gamifikasi" },
  { color: "zinc",   label: "Sub-halaman / Settings" },
]

export default function SitemapPage() {
  return (
    <div className="px-8 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e30]">App Map</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Struktur dan alur navigasi seluruh halaman di ezer KPI. Klik node untuk membuka halaman.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {LEGEND.map(({ color, label }) => {
          const c = COLOR[color]
          return (
            <div key={color} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${c.bg} ${c.border} ${c.text}`}>
              <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              {label}
            </div>
          )
        })}
      </div>

      {/* Flow chart */}
      <div className="space-y-5">

        {/* Layer 0: Entry */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <div className="mb-5">
            <h2 className="font-bold text-[#1e1e30] text-base">Entry Point</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Layar pertama yang dilihat pengguna</p>
          </div>
          <Node node={{ label: "Splash Screen", path: "/splash", color: "dark" }} />
        </div>

        {/* Flow arrow */}
        <div className="flex items-center gap-2 px-6 text-zinc-300">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-xs">autentikasi</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Layer 1: Auth */}
        <Section
          title="Autentikasi & Onboarding"
          subtitle="Alur masuk, registrasi, dan aktivasi akun"
          nodes={AUTH_NODES}
          columns={2}
        />

        {/* Flow arrow */}
        <div className="flex items-center gap-2 px-6 text-zinc-300">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-xs">setelah login</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Layer 2: Main tabs */}
        <Section
          title="Navigasi Utama (Bottom Nav)"
          subtitle="4 tab utama + tombol More"
          nodes={MAIN_TABS}
          columns={2}
        />

        {/* Flow arrow */}
        <div className="flex items-center gap-2 px-6 text-zinc-300">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-xs">menu More</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Layer 3: More menu */}
        <Section
          title="Menu More"
          subtitle="Halaman tambahan via bottom sheet More"
          nodes={MORE_NODES}
          columns={2}
        />
      </div>

      {/* Route count */}
      <div className="mt-8 flex items-center gap-4 text-sm text-zinc-400">
        <span>Total halaman: <strong className="text-zinc-700">22</strong></span>
        <span>·</span>
        <span>Dynamic routes: <strong className="text-zinc-700">2</strong> <span className="text-xs">([id], [memberId])</span></span>
        <span>·</span>
        <span>Auth protected: <strong className="text-zinc-700">18</strong></span>
      </div>
    </div>
  )
}
