"use client"

import { useEffect, useState, useRef } from "react"
import { Panel } from "./panel"
import { AlertTriangle } from "lucide-react"

interface AlarmEntry {
  id: number
  time: string
  type: "warning" | "danger" | "info"
  message: string
}

const initialAlarms: AlarmEntry[] = [
  { id: 1, time: "14:32:18", type: "warning", message: "B区温度接近预警阈值 (27.8\u2103)" },
  { id: 2, time: "13:45:02", type: "info", message: "A区消防设备巡检完成" },
  { id: 3, time: "12:11:33", type: "danger", message: "D区通道监控信号中断" },
  { id: 4, time: "11:28:47", type: "warning", message: "B区气体灭火装置电量低 (32%)" },
  { id: 5, time: "10:05:12", type: "info", message: "甲醇库存更新: +500L" },
  { id: 6, time: "09:33:56", type: "warning", message: "C区湿度偏高 (68.5%RH)" },
]

const typeStyles = {
  warning: "border-l-warning text-warning",
  danger: "border-l-destructive text-destructive",
  info: "border-l-primary text-primary",
}

export function AlarmLog() {
  const [alarms, setAlarms] = useState(initialAlarms)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const messages = [
      "A区温度传感器数据正常",
      "B区烟感探测器自检通过",
      "C区VOCs浓度轻微波动",
      "消防水池液位正常",
      "D区摄像头恢复连接",
      "仓库通风系统运行正常",
    ]
    const types: AlarmEntry["type"][] = ["info", "warning", "info"]

    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      const newAlarm: AlarmEntry = {
        id: Date.now(),
        time: timeStr,
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
      }
      setAlarms((prev) => [newAlarm, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Panel title="告警日志" icon={<AlertTriangle className="h-4 w-4" />}>
      <div
        ref={containerRef}
        className="space-y-1.5 max-h-36 overflow-y-auto pr-1"
      >
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`flex items-start gap-2 rounded-sm border-l-2 bg-secondary/30 px-2 py-1.5 text-xs ${typeStyles[alarm.type]} animate-in fade-in slide-in-from-top-1 duration-300`}
          >
            <span className="font-mono text-muted-foreground shrink-0">
              {alarm.time}
            </span>
            <span className="text-foreground/80">{alarm.message}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
