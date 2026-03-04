"use client"

import { cn } from "@/lib/utils"

interface PanelProps {
  title: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function Panel({ title, children, className, icon }: PanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card backdrop-blur-sm",
        "before:absolute before:inset-0 before:rounded-lg before:border before:border-primary/10",
        "overflow-hidden",
        className
      )}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="text-sm font-medium tracking-wider text-primary/90 uppercase">
          {title}
        </h3>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">{"在线"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
