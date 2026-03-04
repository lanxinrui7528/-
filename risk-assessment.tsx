"use client"

import { Panel } from "./panel"
import { Package } from "lucide-react"

const inventoryData = [
  { name: "甲醇", category: "易燃液体", amount: 2450, capacity: 5000, unit: "L", level: "warning" },
  { name: "硫酸", category: "腐蚀品", amount: 1800, capacity: 3000, unit: "L", level: "normal" },
  { name: "氢氧化钠", category: "腐蚀品", amount: 3200, capacity: 4000, unit: "kg", level: "high" },
  { name: "丙酮", category: "易燃液体", amount: 890, capacity: 2000, unit: "L", level: "normal" },
  { name: "液氯", category: "有毒气体", amount: 420, capacity: 800, unit: "kg", level: "warning" },
  { name: "过氧化氢", category: "氧化剂", amount: 650, capacity: 1500, unit: "L", level: "normal" },
]

function getBarColor(percentage: number) {
  if (percentage >= 80) return "bg-destructive"
  if (percentage >= 50) return "bg-warning"
  return "bg-primary"
}

function getLevelDot(percentage: number) {
  if (percentage >= 80) return "bg-destructive"
  if (percentage >= 50) return "bg-warning"
  return "bg-success"
}

export function Inventory() {
  const totalItems = inventoryData.length
  const warningCount = inventoryData.filter(
    (i) => i.amount / i.capacity >= 0.5
  ).length

  return (
    <Panel title="仓库库存" icon={<Package className="h-4 w-4" />}>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-primary">{totalItems}</div>
          <div className="text-xs text-muted-foreground">{"品类总数"}</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-warning">{warningCount}</div>
          <div className="text-xs text-muted-foreground">{"需关注"}</div>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <div className="text-lg font-bold text-success">{"98%"}</div>
          <div className="text-xs text-muted-foreground">{"合规率"}</div>
        </div>
      </div>

      {/* Inventory list */}
      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
        {inventoryData.map((item) => {
          const percentage = (item.amount / item.capacity) * 100
          return (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${getLevelDot(percentage)}`}
                  />
                  <span className="text-foreground font-medium">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <span className="text-secondary-foreground font-mono">
                  {item.amount}/{item.capacity}
                  {item.unit}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(percentage)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
