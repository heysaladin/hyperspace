"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const MORE_HREFS = ["/badges", "/team-kpi", "/approval", "/verifikasi"]

export function BottomNav() {
  const path = usePathname()
  const isHomeActive = path === "/"
  const isDashActive = path.startsWith("/dashboard")
  const isKpiActive = path.startsWith("/kpi")
  const isTaskActive = path.startsWith("/task")
  const isMoreActive = MORE_HREFS.some((h) => path.startsWith(h)) || path === "/more"

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E7E5E4]">
      <div className="flex items-end justify-around h-16">

        {/* Home */}
        <Link href="/" className="flex-1 flex justify-center py-2">
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <Image
              src={isHomeActive ? "/img/Iconly/Bold/Home.svg" : "/img/Iconly/Light/Home.svg"}
              width={24} height={24} alt="Home"
            />
            <span className={`text-[10px] font-medium leading-none ${isHomeActive ? "text-[#0F0E0E]" : "text-[#A8A29E]"}`}>
              Home
            </span>
          </div>
        </Link>

        {/* Dashboard */}
        <Link href="/dashboard" className="flex-1 flex justify-center py-2">
          <div className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
            isDashActive ? "bg-[#F5F5F4] rounded-2xl" : ""
          }`}>
            <Image
              src={isDashActive ? "/img/Iconly/Bold/Chart.svg" : "/img/Iconly/Light/Chart.svg"}
              width={24} height={24} alt="Dashboard"
            />
            <span className={`text-[10px] font-medium leading-none ${isDashActive ? "text-[#0F0E0E]" : "text-[#A8A29E]"}`}>
              Dashboard
            </span>
          </div>
        </Link>

        {/* KPI – elevated FAB */}
        <Link href="/kpi" className="flex-1 flex flex-col items-center -mt-4">
          <div className="w-10 h-10 rounded-[14px] bg-[#0F0E0E] flex items-center justify-center shadow-md">
            <Image
              src={isKpiActive ? "/img/Iconly/Bold/Activity.svg" : "/img/Iconly/Light/Activity.svg"}
              width={24} height={24} alt="KPI"
            />
          </div>
          <span className={`text-[10px] font-medium leading-none mt-1 ${isKpiActive ? "text-[#0F0E0E]" : "text-[#A8A29E]"}`}>
            KPI
          </span>
        </Link>

        {/* Task */}
        <Link href="/task" className="flex-1 flex justify-center py-2">
          <div className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
            isTaskActive ? "bg-[#F5F5F4] rounded-2xl" : ""
          }`}>
            <Image
              src={isTaskActive ? "/img/Iconly/Bold/Work.svg" : "/img/Iconly/Light/Work.svg"}
              width={24} height={24} alt="Task"
            />
            <span className={`text-[10px] font-medium leading-none ${isTaskActive ? "text-[#0F0E0E]" : "text-[#A8A29E]"}`}>
              Task
            </span>
          </div>
        </Link>

        {/* More */}
        <Link href="/more" className="flex-1 flex justify-center py-2">
          <div className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
            isMoreActive ? "bg-[#F5F5F4] rounded-2xl" : ""
          }`}>
            <Image
              src={isMoreActive ? "/img/Iconly/Bold/Category.svg" : "/img/Iconly/Light/Category.svg"}
              width={24} height={24} alt="More"
            />
            <span className={`text-[10px] font-medium leading-none ${isMoreActive ? "text-[#0F0E0E]" : "text-[#A8A29E]"}`}>
              More
            </span>
          </div>
        </Link>

      </div>

      {/* iOS home indicator */}
      <div className="flex justify-center pt-1 pb-[env(safe-area-inset-bottom,8px)]">
        <div className="w-32 h-1 bg-[#E7E5E4] rounded-full" />
      </div>
    </nav>
  )
}
