"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, ListChecks, MoreHorizontal, MapPin } from "lucide-react"

const mainTabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/kpi", icon: MapPin, label: "My KPI", fab: true },
  { href: "/task", icon: ListChecks, label: "My Tasks" },
]

const MORE_HREFS = ["/badges", "/team-kpi", "/approval", "/verifikasi"]

export function BottomNav() {
  const path = usePathname()
  const isMoreActive = MORE_HREFS.some((h) => path.startsWith(h)) || path === "/more"

  return (
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

      <Link
        href="/more"
        className={`flex flex-col items-center gap-1 py-3 px-3 rounded-xl transition-colors ${
          isMoreActive ? "text-white" : "text-zinc-500"
        }`}
      >
        <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? "text-white" : "text-zinc-500"}`} />
        <span className="text-[10px]">More</span>
      </Link>
    </nav>
  )
}
