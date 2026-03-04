"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { ShieldAlert } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

const riskDimensions = [
  { dimension: "火灾", fullMark: 100 },
  { dimension: "爆炸", fullMark: 100 },
  { dimension: "泄漏", fullMark: 100 },
  { dimension: "中毒", fullMark: 100 },
  { dimension: "腐蚀", fullMark: 100 },
  { dimension: "环境", fullMark: 100 },
]

const riskAreas = [
  { area: "A区-易燃存储", level: "中", color: "#ff9f43", score: 65 },
  { area: "B区-腐蚀品库", level: "低", color: "#00ffc8", score: 32 },
  { area: "C区-氧化剂库", level: "低", color: "#00ffc8", score: 28 },
  { area: "D区-有毒气体", level: "高", color: "#ff4d4d", score: 78 },
  { area: "装卸作业区", level: "中", color: "#ff9f43", score: 55 },
]

export function RiskAssessment() {
  const [radarData, setRadarData] = useState(
    riskDimensions.map((d) => ({
      ...d,
      safety: 70 + Math.random() * 25,
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarData(
        riskDimensions.map((d) => ({
          ...d,
          safety: 70 + Math.random() * 25,
        }))
      )
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const avgScore =
    riskAreas.reduce((acc, a) => acc + a.score, 0) / riskAreas.length

  return (
    <Panel title="风险评估" icon={<ShieldAlert className="h-4 w-4" />}>
      <div className="flex gap-4">
        {/* Radar chart */}
        <div className="w-1/2 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid stroke="rgba(0,180,255,0.15)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 10, fill: "#5a8ab5" }}
              />
              <Radar
                name="安全指数"
                dataKey="safety"
                stroke="#00b4ff"
                fill="#00b4ff"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk area list */}
        <div className="w-1/2 space-y-2">
          <div className="text-center mb-3">
            <div className="text-[10px] text-muted-foreground">{"综合风险分"}</div>
            <div
              className="text-2xl font-bold font-mono"
              style={{
                color: avgScore > 60 ? "#ff9f43" : avgScore > 40 ? "#00b4ff" : "#00ffc8",
              }}
            >
              {avgScore.toFixed(1)}
            </div>
          </div>
          {riskAreas.map((area) => (
            <div
              key={area.area}
              className="flex items-center justify-between text-xs rounded-md bg-secondary/30 px-2 py-1.5 border border-border/50"
            >
              <span className="text-foreground/80">{area.area}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${area.score}%`,
                      background: area.color,
                    }}
                  />
                </div>
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    color: area.color,
                    background: `${area.color}15`,
                  }}
                >
                  {area.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
