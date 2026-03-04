"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { Fan, Gauge, ArrowUpDown } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function generateVentData() {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${String(i * 2).padStart(2, "0")}:00`,
    airflow: 800 + Math.random() * 400,
    pressure: -20 + Math.random() * 10,
  }))
}

const ventZones = [
  { zone: "A区送风", speed: 4.2, status: "normal" },
  { zone: "B区排风", speed: 3.8, status: "normal" },
  { zone: "C区送风", speed: 4.5, status: "normal" },
  { zone: "D区排风", speed: 1.2, status: "warning" },
]

export function Ventilation() {
  const [data, setData] = useState(generateVentData)
  const [pressure, setPressure] = useState(-15.2)
  const [airflow, setAirflow] = useState(1050)
  const [exchanges, setExchanges] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => {
      setPressure(-20 + Math.random() * 10)
      setAirflow(800 + Math.random() * 400)
      setExchanges(10 + Math.floor(Math.random() * 5))
      setData((prev) => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
          airflow: 800 + Math.random() * 400,
          pressure: -20 + Math.random() * 10,
        })
        return newData
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Panel title="通风与压差监测" icon={<Fan className="h-4 w-4" />}>
      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Gauge className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{"负压值"}</span>
          </div>
          <div className="text-base font-bold text-primary font-mono">
            {pressure.toFixed(1)}
          </div>
          <div className="text-[10px] text-muted-foreground">Pa</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Fan className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{"风量"}</span>
          </div>
          <div className="text-base font-bold text-accent font-mono">
            {airflow.toFixed(0)}
          </div>
          <div className="text-[10px] text-muted-foreground">{"m\u00B3/h"}</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{"换气"}</span>
          </div>
          <div className="text-base font-bold text-primary font-mono">
            {exchanges}
          </div>
          <div className="text-[10px] text-muted-foreground">{"次/h"}</div>
        </div>
      </div>

      {/* Ventilation zones */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {ventZones.map((zone) => (
          <div
            key={zone.zone}
            className="flex items-center justify-between rounded-md bg-secondary/30 px-2 py-1.5 text-xs border border-border/50"
          >
            <div className="flex items-center gap-1.5">
              <Fan
                className={`h-3 w-3 ${zone.status === "normal" ? "text-success" : "text-warning"} ${zone.status === "normal" ? "animate-spin" : ""}`}
                style={{ animationDuration: "3s" }}
              />
              <span className="text-foreground/80">{zone.zone}</span>
            </div>
            <span
              className={`font-mono ${zone.status === "normal" ? "text-success" : "text-warning"}`}
            >
              {zone.speed}m/s
            </span>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#5a8ab5" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgba(10,22,40,0.95)",
                border: "1px solid rgba(0,180,255,0.3)",
                borderRadius: "6px",
                color: "#e0eaff",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="airflow"
              stroke="#00b4ff"
              strokeWidth={2}
              dot={false}
              name="风量 (m\u00B3/h)"
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#00ffc8"
              strokeWidth={2}
              dot={false}
              name="压差 (Pa)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
