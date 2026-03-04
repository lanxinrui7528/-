"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { Wind } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts"

interface GasData {
  name: string
  value: number
  limit: number
  unit: string
}

const initialGasData: GasData[] = [
  { name: "CO", value: 12, limit: 50, unit: "ppm" },
  { name: "H2S", value: 3.2, limit: 10, unit: "ppm" },
  { name: "CH4", value: 0.8, limit: 5, unit: "%LEL" },
  { name: "NH3", value: 8.5, limit: 25, unit: "ppm" },
  { name: "Cl2", value: 0.3, limit: 1, unit: "ppm" },
  { name: "VOCs", value: 45, limit: 100, unit: "mg/m\u00B3" },
]

function getGasStatus(value: number, limit: number) {
  const ratio = value / limit
  if (ratio >= 0.8) return { color: "#ff4d4d", status: "danger" }
  if (ratio >= 0.5) return { color: "#ff9f43", status: "warning" }
  return { color: "#00ffc8", status: "normal" }
}

export function GasConcentration() {
  const [gasData, setGasData] = useState<GasData[]>(initialGasData)

  useEffect(() => {
    const interval = setInterval(() => {
      setGasData((prev) =>
        prev.map((gas) => ({
          ...gas,
          value: Math.max(
            0,
            gas.value + (Math.random() - 0.5) * gas.limit * 0.1
          ),
        }))
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const chartData = gasData.map((g) => ({
    name: g.name,
    percentage: (g.value / g.limit) * 100,
    ...g,
  }))

  return (
    <Panel title="气体浓度监测" icon={<Wind className="h-4 w-4" />}>
      {/* Gas indicators */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {gasData.map((gas) => {
          const status = getGasStatus(gas.value, gas.limit)
          return (
            <div
              key={gas.name}
              className="rounded-md bg-secondary p-2 text-center border border-border"
            >
              <div className="text-xs text-muted-foreground mb-0.5">
                {gas.name}
              </div>
              <div
                className="text-base font-bold font-mono"
                style={{ color: status.color }}
              >
                {gas.value.toFixed(1)}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {gas.unit} / {gas.limit}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bar chart */}
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={16}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#5a8ab5" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#5a8ab5" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,22,40,0.95)",
                border: "1px solid rgba(0,180,255,0.3)",
                borderRadius: "6px",
                color: "#e0eaff",
                fontSize: 12,
              }}
              formatter={(value: number) => [
                `${value.toFixed(1)}%`,
                "限值占比",
              ]}
            />
            <Bar dataKey="percentage" radius={[3, 3, 0, 0]}>
              {chartData.map((entry) => {
                const status = getGasStatus(entry.value, entry.limit)
                return <Cell key={entry.name} fill={status.color} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
