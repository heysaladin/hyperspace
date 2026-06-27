"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, ListChecks, MoreHorizontal, MapPin, Users, ThumbsUp, ShieldCheck, Bell, User, Trophy } from "lucide-react"

const mainTabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/kpi", icon: MapPin, label: "My KPI", fab: true },
  { href: "/task", icon: ListChecks, label: "My Tasks" },
]

const moreTabs = [
  { href: "/badges", icon: Trophy, label: "Pencapaian" },
  { href: "/team-kpi", icon: Users, label: "Team KPI" },
  { href: "/approval", icon: ThumbsUp, label: "Approval" },
  { href: "/verifikasi", icon: ShieldCheck, label: "Verifikasi" },
  { href: "/notifikasi", icon: Bell, label: "Notifikasi" },
  { href: "/profil", icon: User, label: "Profil" },
]

export function BottomNav() {
  const path = usePathname()
  const [showMore, setShowMore] = useState(false)

  const isMoreActive = moreTabs.some((t) => path.startsWith(t.href))

  return (
    <>
      {showMore && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div
            className="absolute bottom-[64px] left-0 right-0 bg-white border-t border-zinc-200 rounded-t-2xl shadow-xl pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-zinc-300 rounded-full mx-auto mt-3 mb-3" />
            {moreTabs.map((tab) => {
              const Icon = tab.icon
              const active = path.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setShowMore(false)}
                  className={`flex items-center gap-3 px-6 py-3.5 border-b border-zinc-100 last:border-0 ${active ? "text-[#1e1e30] font-semibold" : "text-zinc-700"}`}
                >
                  <Icon className="w-5 h-5 text-zinc-500 shrink-0" />
                  <span className="text-sm">{tab.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e30] flex items-end justify-around px-2 pb-safe">
        {mainTabs.map((tab) => {
          const isActive = tab.href === "/" ? path === "/" : path.startsWith(tab.href)

          if (tab.fab) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center py-1 -mt-5"
              >
                <span
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-0.5 transition-colors ${
                    isActive
                      ? "bg-[#4ecb71] shadow-green-500/40"
                      : "bg-[#3ab060] shadow-green-900/30"
                  }`}
                >
                  <MapPin className="w-7 h-7 text-white" fill={isActive ? "white" : "transparent"} />
                </span>
                <span className={`text-[10px] ${isActive ? "text-white" : "text-zinc-400"}`}>
                  {tab.label}
                </span>
              </Link>
            )
          }

          const Icon = tab.icon!
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-3 px-3 rounded-xl transition-colors ${
                isActive ? "text-white" : "text-zinc-500"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500"}`} />
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          )
        })}

        <button
          onClick={() => setShowMore((v) => !v)}
          className={`flex flex-col items-center gap-1 py-3 px-3 rounded-xl transition-colors ${
            isMoreActive || showMore ? "text-white" : "text-zinc-500"
          }`}
        >
          <MoreHorizontal
            className={`w-5 h-5 ${isMoreActive || showMore ? "text-white" : "text-zinc-500"}`}
          />
          <span className="text-[10px]">More</span>
        </button>
      </nav>
    </>
  )
}
