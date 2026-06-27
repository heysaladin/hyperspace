import Link from "next/link"
import { ChevronRight, LogOut, Bell, Shield, HelpCircle, Settings, BellRing, Key } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"

const menuItems = [
  { icon: Bell, label: "Notifikasi", href: "/notifikasi" },
  { icon: BellRing, label: "Pengaturan Notifikasi", href: "/profil/notifikasi-settings" },
  { icon: Shield, label: "Keamanan & Privasi", href: "/profil/keamanan" },
  { icon: Key, label: "Ganti Password", href: "/profil/ganti-password" },
  { icon: Settings, label: "Pengaturan Perusahaan", href: "/profil/perusahaan" },
  { icon: HelpCircle, label: "Bantuan & Dukungan", href: "/profil/bantuan" },
]

export default function ProfilPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar title="Profil" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-5">

        {/* Profile card */}
        <Card className="border-0 shadow-sm bg-[#1e1e30] text-white">
          <CardContent className="p-5 flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-amber-300 to-orange-400 text-white text-xl font-bold">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-bold text-lg">Adin Saputra</p>
              <p className="text-sm text-zinc-400">adin.saputra@ezer.id</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-[#4ecb71] text-[#1a5c35] text-[10px] font-bold px-2">
                  🥇 PLATINUM
                </Badge>
                <span className="text-[11px] text-zinc-400">+2500 XP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "KPI Aktif", value: "5" },
            { label: "Skor Individu", value: "78.5" },
            { label: "Streak", value: "6 bln" },
          ].map((s) => (
            <Card key={s.label} className="border-0 shadow-sm bg-white text-center">
              <CardContent className="p-3">
                <p className="text-xl font-black text-[#1a5c35]">{s.value}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Menu */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-0">
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  <Link href={item.href}>
                    <div className="flex items-center gap-3 px-4 py-4 active:bg-zinc-50">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-zinc-600" />
                      </div>
                      <span className="flex-1 text-sm font-medium">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </div>
                  </Link>
                  {i < menuItems.length - 1 && <div className="h-px bg-zinc-100 mx-4" />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-600 font-semibold text-sm active:bg-red-100">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
