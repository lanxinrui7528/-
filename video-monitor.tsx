"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShieldAlert,
  Package,
  Users,
  Flame,
  Camera,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wind,
  Activity,
} from "lucide-react"

interface SidebarNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { id: "overview", label: "系统总览", icon: LayoutDashboard },
  { id: "safety", label: "安全监测", icon: ShieldAlert },
  { id: "inventory", label: "库存管理", icon: Package },
  { id: "personnel", label: "人员管理", icon: Users },
  { id: "environment", label: "环境监测", icon: Wind },
  { id: "fire", label: "消防系统", icon: Flame },
  { id: "video", label: "视频监控", icon: Camera },
  { id: "alarm", label: "告警中心", icon: Bell },
  { id: "report", label: "运营报表", icon: Activity },
  { id: "settings", label: "系统设置", icon: Settings },
]

export function SidebarNav({
  activeSection,
  onSectionChange,
  collapsed,
  onToggle,
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "relative flex flex-col h-full border-r border-border bg-card/60 backdrop-blur-md transition-all duration-300 ease-in-out shrink-0",
        collapsed ? "w-16" : "w-48"
      )}
    >
      {/* Top glow */}
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/40 via-transparent to-primary/20" />

      {/* Logo area */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
        <div className="flex items-center justify-center h-8 w-8 shrink-0 rounded-lg bg-primary/10 border border-primary/30">
          <ShieldAlert className="h-4 w-4 text-primary" />
        </div>
        {!collapsed && (
          <span className="text-xs font-bold text-primary tracking-wider whitespace-nowrap overflow-hidden">
            {"HAZMAT-MS"}
          </span>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20 shadow-[0_0_12px_rgba(0,180,255,0.1)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive && "drop-shadow-[0_0_4px_rgba(0,180,255,0.6)]")} />
              {!collapsed && (
                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Collapse toggle */}
      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>{"收起菜单"}</span>
            </>
          )}
        </button>
      </div>
    </nav>
  )
}
