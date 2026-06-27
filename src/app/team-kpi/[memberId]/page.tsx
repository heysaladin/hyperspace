import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"

interface MemberData {
  name: string
  role: string
  initials: string
  avgScore: number
  kpis: {
    id: string
    name: string
    progress: number
    status: string
  }[]
}

const memberData: Record<string, MemberData> = {
  budi: {
    name: "Budi Santoso",
    role: "Sales Manager",
    initials: "BS",
    avgScore: 82,
    kpis: [
      { id: "1", name: "Peningkatan Customer Satisfaction Score", progress: 82, status: "On Track" },
      { id: "2", name: "Peningkatan Jumlah Leads Bulanan", progress: 90, status: "On Track" },
      { id: "1", name: "Efisiensi Proses Closing Deal", progress: 65, status: "Perlu Perhatian" },
    ],
  },
  sari: {
    name: "Sari Wulandari",
    role: "HR Specialist",
    initials: "SW",
    avgScore: 76,
    kpis: [
      { id: "1", name: "Efisiensi Proses Onboarding Karyawan Baru", progress: 76, status: "On Track" },
      { id: "2", name: "Peningkatan Employee Engagement Score", progress: 70, status: "On Track" },
    ],
  },
  dani: {
    name: "Dani Prasetyo",
    role: "Product Designer",
    initials: "DP",
    avgScore: 91,
    kpis: [
      { id: "1", name: "Peningkatan User Experience Score", progress: 95, status: "Melampaui Target" },
      { id: "2", name: "Pengurangan Design Iteration Cycle", progress: 88, status: "On Track" },
      { id: "1", name: "Peningkatan Design System Coverage", progress: 91, status: "On Track" },
    ],
  },
  rina: {
    name: "Rina Maharani",
    role: "Customer Success",
    initials: "RM",
    avgScore: 68,
    kpis: [
      { id: "1", name: "Pengurangan Waktu Resolusi Tiket Support", progress: 68, status: "Perlu Perhatian" },
      { id: "2", name: "Peningkatan Net Promoter Score", progress: 72, status: "On Track" },
    ],
  },
  ferry: {
    name: "Ferry Kurniawan",
    role: "Backend Engineer",
    initials: "FK",
    avgScore: 85,
    kpis: [
      { id: "1", name: "Peningkatan API Response Time", progress: 88, status: "On Track" },
      { id: "2", name: "Penurunan Bug Rate di Production", progress: 80, status: "On Track" },
      { id: "1", name: "Peningkatan Code Coverage Testing", progress: 85, status: "On Track" },
    ],
  },
}

function statusBadge(status: string) {
  if (status === "Melampaui Target") {
    return (
      <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-50 text-[10px]">
        {status}
      </Badge>
    )
  }
  if (status === "On Track") {
    return (
      <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 text-[10px]">
        {status}
      </Badge>
    )
  }
  return (
    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 text-[10px]">
      {status}
    </Badge>
  )
}

export default function MemberKpiPage({
  params,
}: {
  params: { memberId: string }
}) {
  const member = memberData[params.memberId] ?? {
    name: "Anggota Tim",
    role: "Jabatan",
    initials: "AT",
    avgScore: 0,
    kpis: [],
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="KPI Tim" backHref="/team-kpi" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">
        {/* Member header card */}
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#1e1e30] flex items-center justify-center shrink-0">
                <span className="text-base font-bold text-white">{member.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-zinc-800">{member.name}</p>
                <p className="text-sm text-zinc-500">{member.role}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Skor rata-rata</span>
                    <span className="text-xs font-semibold text-zinc-700">{member.avgScore}/100</span>
                  </div>
                  <Progress value={member.avgScore} className="h-2 bg-zinc-100" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI list */}
        <div>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            KPI ({member.kpis.length})
          </h2>
          <div className="space-y-2">
            {member.kpis.map((kpi, idx) => (
              <Link key={`${kpi.id}-${idx}`} href={`/kpi/${kpi.id}`}>
                <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] font-medium text-zinc-800 leading-snug">
                            {kpi.name}
                          </p>
                          <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        </div>
                        {statusBadge(kpi.status)}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-400">Progres</span>
                            <span className="text-[11px] font-semibold text-zinc-700">
                              {kpi.progress}%
                            </span>
                          </div>
                          <Progress value={kpi.progress} className="h-1.5 bg-zinc-100" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {member.kpis.length === 0 && (
              <div className="text-center py-8 text-zinc-400 text-sm">
                Tidak ada KPI untuk anggota ini.
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
