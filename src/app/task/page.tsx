import Link from "next/link"
import { CheckSquare, Square, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"

const tasks = [
  { id: 1, title: "Isi laporan Q2", kpi: "Target Revenue", due: "Besok", priority: "high", done: false },
  { id: 2, title: "Review data CSAT bulan ini", kpi: "Customer Satisfaction", due: "3 hari lagi", priority: "medium", done: false },
  { id: 3, title: "Meeting dengan tim sales", kpi: "Target Revenue", due: "5 hari lagi", priority: "low", done: false },
  { id: 4, title: "Submit bukti retensi karyawan", kpi: "Retensi Karyawan", due: "7 hari lagi", priority: "medium", done: false },
  { id: 5, title: "Update status KPI Efisiensi", kpi: "Efisiensi Operasional", due: "2 hari lagi", priority: "high", done: true },
]

const priorityConfig = {
  high: { label: "Tinggi", color: "text-red-600 bg-red-50 border-red-200" },
  medium: { label: "Sedang", color: "text-amber-600 bg-amber-50 border-amber-200" },
  low: { label: "Rendah", color: "text-zinc-500 bg-zinc-100 border-zinc-200" },
}

export default function TaskPage() {
  const pending = tasks.filter((t) => !t.done)
  const done = tasks.filter((t) => t.done)

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar title="My Tasks" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-5">
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Menunggu ({pending.length})
          </h2>
          <div className="space-y-2">
            {pending.map((t) => {
              const p = priorityConfig[t.priority as keyof typeof priorityConfig]
              return (
                <Card key={t.id} className="border-0 shadow-sm bg-white active:scale-[0.98] transition-transform">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Square className="w-5 h-5 text-zinc-300 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{t.title}</p>
                      <p className="text-[11px] text-zinc-400">{t.kpi} · {t.due}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] shrink-0 ${p.color}`}>
                      {p.label}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {done.length > 0 && (
          <section>
            <h2 className="text-[13px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
              Selesai ({done.length})
            </h2>
            <div className="space-y-2">
              {done.map((t) => (
                <Card key={t.id} className="border-0 shadow-sm bg-zinc-50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-[#4ecb71] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-through text-zinc-400">{t.title}</p>
                      <p className="text-[11px] text-zinc-400">{t.kpi}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
