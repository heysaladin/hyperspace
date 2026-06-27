"use client"

import { useState } from "react"
import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, ChevronRight } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  kpiCount: number
  avgScore: number
}

const members: TeamMember[] = [
  {
    id: "budi",
    name: "Budi Santoso",
    role: "Sales Manager",
    initials: "BS",
    kpiCount: 5,
    avgScore: 82,
  },
  {
    id: "sari",
    name: "Sari Wulandari",
    role: "HR Specialist",
    initials: "SW",
    kpiCount: 4,
    avgScore: 76,
  },
  {
    id: "dani",
    name: "Dani Prasetyo",
    role: "Product Designer",
    initials: "DP",
    kpiCount: 6,
    avgScore: 91,
  },
  {
    id: "rina",
    name: "Rina Maharani",
    role: "Customer Success",
    initials: "RM",
    kpiCount: 3,
    avgScore: 68,
  },
  {
    id: "ferry",
    name: "Ferry Kurniawan",
    role: "Backend Engineer",
    initials: "FK",
    kpiCount: 5,
    avgScore: 85,
  },
]

export default function TeamKpiPage() {
  const [search, setSearch] = useState("")

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Team KPI" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder="Cari anggota tim..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 bg-white border-zinc-200"
          />
        </div>

        {/* Team member list */}
        <div className="space-y-3">
          {filtered.map((member) => (
            <Link key={member.id} href={`/team-kpi/${member.id}`}>
              <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-xl bg-[#1e1e30] flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-white">{member.initials}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[14px] font-semibold text-zinc-800 truncate">
                          {member.name}
                        </p>
                        <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">{member.role}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-400">Skor rata-rata</span>
                            <span className="text-[11px] font-semibold text-zinc-700">
                              {member.avgScore}/100
                            </span>
                          </div>
                          <Progress value={member.avgScore} className="h-1.5 bg-zinc-100" />
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-semibold text-zinc-700">
                            {member.kpiCount} KPI
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-400 text-sm">
              Tidak ada anggota tim ditemukan.
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
