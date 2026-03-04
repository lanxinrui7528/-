"use client"

import { useEffect, useState } from "react"
import {
  ShieldCheck,
  Thermometer,
  Wind,
  Zap,
  Users,
  AlertTriangle,
  TrendingUp,
  Timer,
} from "lucide-react"

interface StatCard {
  label: string
  value: string | number
  unit?: string
  icon: React.ReactNode
  trend?: "up" | "down" | "stable"
  trendValue?: string
  color: string
}

export function SafetyStats() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      label: "综合安全指数",
      value: 96.8,
      unit: "分",
      icon: <ShieldCheck className="h-5 w-5" />,
      trend: "up",
      trendValue: "+0.3",
      color: "#00ffc8",
    },
    {
      label: "环境达标率",
      value: "98.5%",
      icon: <Thermometer className="h-5 w-5" />,
      trend: "stable",
      trendValue: "0",
      color: "#00b4ff",
    },
    {
      label: "通风换气次数",
      value: 12,
      unit: "次/h",
      icon: <Wind className="h-5 w-5" />,
      trend: "up",
      trendValue: "+2",
      color: "#00b4ff",
    },
    {
      label: "设备在线率",
      value: "97.3%",
      icon: <Zap className="h-5 w-5" />,
      trend: "stable",
      trendValue: "0",
      color: "#00ffc8",
    },
    {
      label: "在库人员",
      value: 8,
      unit: "人",
      icon: <Users className="h-5 w-5" />,
      color: "#00b4ff",
    },
    {
      label: "今日告警",
      value: 3,
      unit: "条",
      icon: <AlertTriangle className="h-5 w-5" />,
      trend: "down",
      trendValue: "-2",
      color: "#ff9f43",
    },
    {
      label: "隐患整改率",
      value: "100%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "#00ffc8",
    },
    {
      label: "应急响应时间",
      value: "< 3",
      unit: "min",
      icon: <Timer className="h-5 w-5" />,
      color: "#00b4ff",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.label === "综合安全指数") {
            const newVal = 95 + Math.random() * 4
            return { ...stat, value: Number(newVal.toFixed(1)) }
          }
          if (stat.label === "在库人员") {
            return { ...stat, value: 6 + Math.floor(Math.random() * 5) }
          }
          return stat
        })
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative rounded-lg border border-border bg-card/60 backdrop-blur-sm p-3 flex flex-col items-center gap-1.5 overflow-hidden group"
        >
          {/* Top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${stat.color}40, transparent)`,
            }}
          />

          <div
            className="flex items-center justify-center h-8 w-8 rounded-lg"
            style={{ background: `${stat.color}15`, color: stat.color }}
          >
            {stat.icon}
          </div>

          <div className="text-center">
            <div className="flex items-baseline justify-center gap-0.5">
              <span
                className="text-lg font-bold font-mono"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-[10px] text-muted-foreground">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              {stat.label}
            </div>
          </div>

          {stat.trend && (
            <div
              className={`text-[10px] font-mono ${
                stat.trend === "up"
                  ? "text-success"
                  : stat.trend === "down"
                    ? "text-warning"
                    : "text-muted-foreground"
              }`}
            >
              {stat.trendValue}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
