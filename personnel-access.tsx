"use client"

import { useEffect, useState } from "react"
import { Shield, Bell, MapPin } from "lucide-react"

export function DashboardHeader() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      )
      setDate(
        `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-md">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Left: Logo & title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-wider text-foreground">
            {"危化品仓库智能监控系统"}
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{"XX化工园区 - 3号仓储中心"}</span>
          </div>
        </div>
      </div>

      {/* Center: Status */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-success">{"系统运行正常"}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{"安全运行"}</span>
          <span className="text-primary font-bold font-mono">{"1,247"}</span>
          <span>{"天"}</span>
        </div>
      </div>

      {/* Right: Time & notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" aria-label="通知">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background" />
        </button>
        <div className="text-right">
          <div className="text-lg font-bold font-mono text-primary tracking-wider">
            {time}
          </div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
      </div>
    </header>
  )
}
