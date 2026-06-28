"use client"

import Link from "next/link"
import { ChevronLeft, Bell } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TopBarProps {
  title: string
  backHref?: string
  right?: React.ReactNode
}

export function TopBar({ title, backHref, right }: TopBarProps) {
  if (backHref) {
    return (
      <header className="sticky top-0 z-40 bg-white border-b border-[#F5F5F4] flex items-center gap-2 px-4 py-3">
        <Link href={backHref}>
          <span className="w-9 h-9 rounded-xl bg-[#F5F5F4] flex items-center justify-center active:bg-[#E7E5E4] transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#130F26]" strokeWidth={2} />
          </span>
        </Link>
        <h1 className="text-[15px] font-semibold flex-1 text-center text-[#130F26]">{title}</h1>
        {right ? (
          <div className="flex items-center gap-2">{right}</div>
        ) : (
          <div className="w-9" />
        )}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F5F5F4] flex items-center px-4 py-3 gap-2">
      <Link href="/profil" className="shrink-0">
        <Avatar className="w-9 h-9 active:opacity-80 transition-opacity">
          <AvatarFallback className="bg-[#0F0E0E] text-white text-sm font-semibold">
            AD
          </AvatarFallback>
        </Avatar>
      </Link>
      <h1 className="text-[15px] font-semibold flex-1 text-center text-[#130F26]">{title}</h1>
      {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      <Link href="/notifikasi" className="shrink-0">
        <button className="relative w-9 h-9 rounded-xl bg-[#F5F5F4] flex items-center justify-center active:bg-[#E7E5E4] transition-colors">
          <Bell className="w-4 h-4 text-[#130F26]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </Link>
    </header>
  )
}
