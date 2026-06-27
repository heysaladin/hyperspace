/* ─── Design System Reference ─── */

/* ─── Color Palette ─── */
const BRAND_COLORS = [
  { name: "Navy", hex: "#1e1e30", role: "Primary dark — nav, headings, CTA dark" },
  { name: "Green", hex: "#4ecb71", role: "Primary action — buttons, active states, ring" },
  { name: "Green Dark", hex: "#1a5c35", role: "Text on green, deep accent" },
  { name: "Green Mid", hex: "#3ab060", role: "FAB inactive, hover states" },
  { name: "Background", hex: "#f5f5f0", role: "Page background (warm off-white)" },
]

const SEMANTIC_COLORS = [
  { name: "Success", hex: "#4ecb71", role: "Positive progress, badges" },
  { name: "Warning", hex: "#f59e0b", role: "Missing data, deadline warnings (amber-400)" },
  { name: "Danger", hex: "#ef4444", role: "Reject actions, below-target KPI (red-500)" },
  { name: "Info", hex: "#3b82f6", role: "Team KPI, analytics (blue-500)" },
  { name: "Purple", hex: "#a855f7", role: "Gamification / badges (purple-500)" },
]

const NEUTRAL_COLORS = [
  { name: "zinc-900", hex: "#18181b" },
  { name: "zinc-700", hex: "#3f3f46" },
  { name: "zinc-500", hex: "#71717a" },
  { name: "zinc-400", hex: "#a1a1aa" },
  { name: "zinc-300", hex: "#d4d4d8" },
  { name: "zinc-200", hex: "#e4e4e7" },
  { name: "zinc-100", hex: "#f4f4f5" },
  { name: "white",    hex: "#ffffff" },
]

/* ─── Typography ─── */
const TYPE_SCALE = [
  { name: "Display",  class: "text-4xl font-bold",    size: "36px / 40px",  usage: "Splash brand name" },
  { name: "H1",       class: "text-2xl font-bold",    size: "24px / 32px",  usage: "Page titles" },
  { name: "H2",       class: "text-xl font-semibold", size: "20px / 28px",  usage: "Section headers" },
  { name: "H3",       class: "text-base font-semibold",size: "16px / 24px", usage: "Card titles" },
  { name: "Body",     class: "text-sm",               size: "14px / 20px",  usage: "Default body text" },
  { name: "Small",    class: "text-xs",               size: "12px / 16px",  usage: "Labels, captions" },
  { name: "Tiny",     class: "text-[10px]",           size: "10px / 14px",  usage: "Nav labels, badges" },
  { name: "Label",    class: "text-[11px] uppercase tracking-widest font-semibold text-zinc-400", size: "11px", usage: "Section divider labels" },
]

/* ─── Border Radius ─── */
const RADII = [
  { name: "sm",  var: "--radius-sm",  value: "~7px",   class: "rounded-lg",    usage: "Small badges" },
  { name: "md",  var: "--radius-md",  value: "~10px",  class: "rounded-xl",    usage: "Inputs, small cards" },
  { name: "lg",  var: "--radius-lg",  value: "~12px",  class: "rounded-xl",    usage: "Cards (default)" },
  { name: "xl",  var: "--radius-xl",  value: "~17px",  class: "rounded-2xl",   usage: "Buttons, modals, FABs" },
  { name: "full",var: "—",           value: "999px",  class: "rounded-full",  usage: "Pills, avatars, dots" },
]

/* ─── Shadows ─── */
const SHADOWS = [
  { name: "sm",  class: "shadow-sm",  usage: "Cards, input fields" },
  { name: "md",  class: "shadow-md",  usage: "Bottom nav, floating elements" },
  { name: "lg",  class: "shadow-lg",  usage: "FAB, modals" },
  { name: "xl",  class: "shadow-xl",  usage: "Bottom sheet, more menu" },
]

/* ─── Spacing scale (common) ─── */
const SPACING = [
  { name: "1",  px: "4px",  usage: "Fine gaps" },
  { name: "2",  px: "8px",  usage: "Icon-label gap" },
  { name: "3",  px: "12px", usage: "Inline padding" },
  { name: "4",  px: "16px", usage: "Card content padding" },
  { name: "6",  px: "24px", usage: "Section padding" },
  { name: "8",  px: "32px", usage: "Page horizontal padding" },
]

/* ─── Components ─── */
const COMPONENTS = [
  {
    name: "Button",
    import: "@/components/ui/button",
    variants: ["default (green bg)", "outline", "ghost", "secondary", "destructive", "link"],
    sizes: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    usage: "Primary CTAs, form actions, navigation triggers",
  },
  {
    name: "Card / CardContent",
    import: "@/components/ui/card",
    variants: ["default (white shadow)", "sm (tighter padding)"],
    sizes: ["default", "sm"],
    usage: "KPI cards, stat cards, form panels",
  },
  {
    name: "Badge",
    import: "@/components/ui/badge",
    variants: ["default (green)", "secondary", "destructive", "outline", "ghost", "link"],
    sizes: ["default"],
    usage: "Status labels, category tags, bobot %, domain markers",
  },
  {
    name: "Progress / ProgressTrack",
    import: "@/components/ui/progress",
    variants: ["default"],
    sizes: ["—"],
    usage: "XP bar, KPI progress, bobot total",
  },
  {
    name: "Avatar / AvatarFallback",
    import: "@/components/ui/avatar",
    variants: ["image", "initials fallback"],
    sizes: ["sm", "default", "lg"],
    usage: "TopBar user avatar, team member list",
  },
  {
    name: "Input",
    import: "@/components/ui/input",
    variants: ["text", "number", "password"],
    sizes: ["h-10 (default)", "h-12 (large)"],
    usage: "Forms: KPI create, login, update realisasi",
  },
  {
    name: "Textarea",
    import: "@/components/ui/textarea",
    variants: ["default"],
    sizes: ["—"],
    usage: "Komentar verifikasi, approval comments",
  },
  {
    name: "Label",
    import: "@/components/ui/label",
    variants: ["default"],
    sizes: ["—"],
    usage: "Form field labels",
  },
  {
    name: "Select / SelectTrigger",
    import: "@/components/ui/select",
    variants: ["default"],
    sizes: ["sm", "default"],
    usage: "Dropdown choices in KPI form",
  },
  {
    name: "Separator",
    import: "@/components/ui/separator",
    variants: ["horizontal", "vertical"],
    sizes: ["—"],
    usage: "Dividers in profile, detail pages",
  },
  {
    name: "TopBar",
    import: "@/components/top-bar",
    variants: [
      "main-screen: Avatar | Title | Bell",
      "sub-page: Back ← | Title | [right?]",
    ],
    sizes: ["h-14 fixed top"],
    usage: "Every authenticated page",
  },
  {
    name: "BottomNav",
    import: "@/components/bottom-nav",
    variants: ["5 tabs + More bottom sheet"],
    sizes: ["h-16 fixed bottom"],
    usage: "Main app navigation (not on auth/docs pages)",
  },
  {
    name: "Kepi",
    import: "@/components/kepi",
    variants: [
      "large", "neutral", "happy", "grin", "thinking",
      "confused", "sad", "angry", "celebrate",
      "p0", "p25", "p50", "p75", "p100",
      "streak1", "streak3", "streak5",
    ],
    sizes: ["size prop in px, default 64"],
    usage: "Mascot — splash, home, KPI hero, badges, streak card",
  },
]

/* ─── Tokens ─── */
const CSS_VARS = [
  { var: "--background",          value: "#f5f5f0" },
  { var: "--foreground",          value: "oklch(0.145 0 0)" },
  { var: "--card",                value: "#ffffff" },
  { var: "--primary",             value: "#4ecb71" },
  { var: "--primary-foreground",  value: "#ffffff" },
  { var: "--destructive",         value: "oklch(0.577 0.245 27.325)" },
  { var: "--border",              value: "oklch(0.922 0 0)" },
  { var: "--ring",                value: "#4ecb71" },
  { var: "--sidebar",             value: "#1e1e30" },
  { var: "--radius",              value: "0.75rem" },
  { var: "--font-sans",           value: "Geist Sans" },
  { var: "--font-mono",           value: "Geist Mono" },
]

/* ─── Helper sub-components ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-[#1e1e30] mb-4 pb-2 border-b border-zinc-200">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ hex, name, role }: { hex: string; name: string; role?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-xl border border-black/10 shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <p className="text-xs font-semibold text-zinc-700">{name}</p>
      <p className="font-mono text-[11px] text-zinc-400">{hex}</p>
      {role && <p className="text-[11px] text-zinc-400 leading-tight">{role}</p>}
    </div>
  )
}

/* ─── Page ─── */
export default function DesignSystemPage() {
  return (
    <div className="px-8 py-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#1e1e30]">Design System</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Token, tipografi, komponen, dan panduan visual ezer KPI.
        </p>
      </div>

      {/* ── Brand Colors ── */}
      <Section title="Brand Colors">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRAND_COLORS.map((c) => <Swatch key={c.hex} {...c} />)}
        </div>
      </Section>

      {/* ── Semantic Colors ── */}
      <Section title="Semantic Colors">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SEMANTIC_COLORS.map((c) => <Swatch key={c.hex} {...c} />)}
        </div>
      </Section>

      {/* ── Neutrals ── */}
      <Section title="Neutral Scale">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {NEUTRAL_COLORS.map((c) => <Swatch key={c.hex} name={c.name} hex={c.hex} />)}
        </div>
      </Section>

      {/* ── CSS Variables ── */}
      <Section title="CSS Variables (globals.css)">
        <div className="bg-[#1e1e30] rounded-2xl p-5 font-mono text-sm overflow-x-auto">
          {CSS_VARS.map((v) => (
            <div key={v.var} className="flex gap-3 py-0.5">
              <span className="text-[#4ecb71] shrink-0">{v.var}:</span>
              <span className="text-zinc-300">{v.value};</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography Scale">
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 text-xs text-zinc-400 uppercase tracking-wider">
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Preview</th>
                <th className="text-left px-4 py-3">Size</th>
                <th className="text-left px-4 py-3">Tailwind class</th>
                <th className="text-left px-4 py-3">Usage</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_SCALE.map((t, i) => (
                <tr key={t.name} className={`border-b border-zinc-50 ${i % 2 === 0 ? "" : "bg-zinc-50/50"}`}>
                  <td className="px-4 py-3 font-medium text-zinc-600 text-xs">{t.name}</td>
                  <td className="px-4 py-3">
                    <span className={t.class}>Aa</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-zinc-400">{t.size}</td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">{t.class}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">{t.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Border Radius ── */}
      <Section title="Border Radius">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col gap-2">
              <div className={`h-16 bg-[#4ecb71]/20 border-2 border-[#4ecb71] ${r.class}`} />
              <p className="text-xs font-semibold text-zinc-700">radius-{r.name}</p>
              <p className="text-[11px] font-mono text-zinc-400">{r.value}</p>
              <p className="text-[11px] text-zinc-400">{r.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing ── */}
      <Section title="Spacing Scale">
        <div className="space-y-2">
          {SPACING.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-400 w-5">{s.name}</span>
              <div className="bg-[#1e1e30]" style={{ width: s.px, height: "20px", borderRadius: "3px" }} />
              <span className="text-xs font-mono text-zinc-500">{s.px}</span>
              <span className="text-xs text-zinc-400">{s.usage}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Shadows ── */}
      <Section title="Shadows">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SHADOWS.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <div className={`h-16 bg-white rounded-xl ${s.class}`} />
              <p className="text-xs font-semibold text-zinc-700">{s.name}</p>
              <p className="text-[11px] font-mono text-zinc-400">{s.class}</p>
              <p className="text-[11px] text-zinc-400">{s.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Components ── */}
      <Section title="Component Inventory">
        <div className="space-y-3">
          {COMPONENTS.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-zinc-200 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-[#1e1e30] text-base">{c.name}</h3>
                  <code className="text-[11px] text-zinc-400 font-mono">{c.import}</code>
                </div>
                <span className="text-[11px] text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full shrink-0">{c.usage}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Variants</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.variants.map((v) => (
                      <span key={v} className="bg-[#4ecb71]/10 text-[#1a5c35] px-2 py-0.5 rounded-full font-medium">{v}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Sizes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.sizes.map((s) => (
                      <span key={s} className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Kepi Variants Visual ── */}
      <Section title="Kepi Mascot Variants">
        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-500 mb-4">
            Sprite sheet di <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">/public/kepi.png</code> (1534×1487px).
            Render via CSS <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">background-position</code>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {[
              { group: "Large", variants: ["large"] },
              { group: "Ekspresi", variants: ["neutral", "happy", "grin", "thinking", "confused", "sad", "angry", "celebrate"] },
              { group: "Progress", variants: ["p0", "p25", "p50", "p75", "p100"] },
              { group: "Streak", variants: ["streak1", "streak3", "streak5"] },
            ].map((g) => (
              <div key={g.group} className="bg-zinc-50 rounded-xl p-3 col-span-1">
                <p className="font-semibold text-zinc-600 mb-2">{g.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.variants.map((v) => (
                    <code key={v} className="bg-white border border-zinc-200 px-2 py-0.5 rounded text-[11px] text-zinc-600">{v}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-zinc-50 rounded-xl p-3 text-xs font-mono text-zinc-500">
            <p className="mb-1 text-zinc-400 font-sans font-semibold text-[11px]">Import</p>
            <p>{`import { Kepi, kepiForProgress, kepiMoodForScore } from "@/components/kepi"`}</p>
            <p className="mt-2 text-zinc-400 font-sans font-semibold text-[11px]">Helpers</p>
            <p>{`kepiForProgress(89)        // → "p75"`}</p>
            <p>{`kepiMoodForScore(78.5)     // → "happy"`}</p>
          </div>
        </div>
      </Section>

      <p className="text-center text-xs text-zinc-300 pb-8">ezer KPI · Design System v1.0</p>
    </div>
  )
}
