"use client"

import Link from "next/link"
import { ChevronLeft, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TopBarProps {
  title: string
  backHref?: string
  right?: React.ReactNode
}

export function TopBar({ title, backHref, right }: TopBarProps) {
  if (backHref) {
    return (
      <header className="sticky top-0 z-40 bg-[#f5f5f0] border-b border-zinc-200 flex items-center gap-2 px-4 py-3">
        <Link href={backHref}>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg text-zinc-700 hover:bg-zinc-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-[15px] font-semibold flex-1 text-center">{title}</h1>
        {right ? (
          <div className="flex items-center gap-2">{right}</div>
        ) : (
          <div className="w-8" />
        )}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 bg-[#f5f5f0] border-b border-zinc-200 flex items-center px-4 py-3 gap-2">
      <Link href="/profil" className="shrink-0">
        <Avatar className="w-9 h-9 active:opacity-80 transition-opacity">
          <AvatarFallback className="bg-[#1e1e30] text-white text-sm font-semibold">
            AD
          </AvatarFallback>
        </Avatar>
      </Link>
      <h1 className="text-[15px] font-semibold flex-1 text-center">{title}</h1>
      {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      <Link href="/notifikasi" className="shrink-0">
        <button className="relative w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center">
          <Bell className="w-4 h-4 text-zinc-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </Link>
    </header>
  )
}
