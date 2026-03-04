"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { Thermometer, Droplets } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function generateInitialData() {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${String(i * 2).padStart(2, "0")}:00`,
    temp: 22 + Math.random() * 6,
    humidity: 45 + Math.random() * 20,
  }))
}

function GaugeRing({
  value,
  max,
  label,
  unit,
  color,
  icon,
}: {
  value: number
  max: number
  label: string
  unit: string
  color: string
  icon: React.ReactNode
}) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(0,180,255,0.1)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">
            {value.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  )
}

export function TemperatureHumidity() {
  const [data, setData] = useState(generateInitialData)
  const [temp, setTemp] = useState(24.6)
  const [humidity, setHumidity] = useState(58.3)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(22 + Math.random() * 6)
      setHumidity(45 + Math.random() * 20)
      setData((prev) => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
          temp: 22 + Math.random() * 6,
          humidity: 45 + Math.random() * 20,
        })
        return newData
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Panel
      title="温湿度监测"
      icon={<Thermometer className="h-4 w-4" />}
    >
      <div className="flex justify-around mb-4">
        <GaugeRing
          value={temp}
          max={50}
          label="温度"
          unit="&#8451;"
          color="#00b4ff"
          icon={<Thermometer className="h-3 w-3" />}
        />
        <GaugeRing
          value={humidity}
          max={100}
          label="湿度"
          unit="%RH"
          color="#00ffc8"
          icon={<Droplets className="h-3 w-3" />}
        />
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b4ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00b4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffc8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00ffc8" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#00b4ff"
              fill="url(#tempGrad)"
              strokeWidth={2}
              name="温度"
            />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#00ffc8"
              fill="url(#humGrad)"
              strokeWidth={2}
              name="湿度"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
