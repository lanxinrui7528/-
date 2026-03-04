"use client"

import { Panel } from "./panel"
import { Tag } from "lucide-react"

const hazardCategories = [
  {
    code: "3.1",
    name: "易燃液体",
    count: 12,
    icon: "fire",
    color: "#ff4d4d",
    examples: "甲醇、丙酮、乙醇",
    msdsCount: 12,
  },
  {
    code: "8",
    name: "腐蚀品",
    count: 8,
    icon: "droplet",
    color: "#ff9f43",
    examples: "硫酸、氢氧化钠、盐酸",
    msdsCount: 8,
  },
  {
    code: "2.3",
    name: "有毒气体",
    count: 4,
    icon: "skull",
    color: "#ff4d4d",
    examples: "液氯、氨气、硫化氢",
    msdsCount: 4,
  },
  {
    code: "5.1",
    name: "氧化剂",
    count: 5,
    icon: "flame",
    color: "#ff9f43",
    examples: "过氧化氢、高锰酸钾",
    msdsCount: 5,
  },
  {
    code: "6.1",
    name: "毒害品",
    count: 3,
    icon: "alert",
    color: "#ff4d4d",
    examples: "氰化钠、砒霜",
    msdsCount: 3,
  },
  {
    code: "4.1",
    name: "易燃固体",
    count: 2,
    icon: "box",
    color: "#ff9f43",
    examples: "硫磺、红磷",
    msdsCount: 2,
  },
]

export function HazardLabels() {
  const totalChemicals = hazardCategories.reduce((a, c) => a + c.count, 0)
  const totalMsds = hazardCategories.reduce((a, c) => a + c.msdsCount, 0)

  return (
    <Panel title="危化品分类与MSDS" icon={<Tag className="h-4 w-4" />}>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-primary font-mono">
            {hazardCategories.length}
          </div>
          <div className="text-[10px] text-muted-foreground">{"危险类别"}</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-accent font-mono">{totalChemicals}</div>
          <div className="text-[10px] text-muted-foreground">{"化学品种数"}</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-success font-mono">{totalMsds}</div>
          <div className="text-[10px] text-muted-foreground">{"MSDS档案"}</div>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
        {hazardCategories.map((cat) => (
          <div
            key={cat.code}
            className="rounded-md border border-border/50 bg-secondary/20 p-2.5"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-5 w-5 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `${cat.color}20`,
                    color: cat.color,
                    border: `1px solid ${cat.color}40`,
                  }}
                >
                  {cat.code}
                </div>
                <span className="text-xs font-medium text-foreground">
                  {cat.name}
                </span>
              </div>
              <span className="text-xs font-mono text-primary">
                {cat.count}
                <span className="text-muted-foreground text-[10px]">{"种"}</span>
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-relaxed">
              {cat.examples}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
