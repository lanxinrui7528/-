"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { Users, LogIn, LogOut, UserCheck } from "lucide-react"

interface PersonnelRecord {
  id: number
  name: string
  role: string
  action: "in" | "out"
  time: string
  area: string
}

const initialRecords: PersonnelRecord[] = [
  { id: 1, name: "张伟", role: "仓库管理员", action: "in", time: "08:02:15", area: "A区" },
  { id: 2, name: "李强", role: "安全巡检员", action: "in", time: "08:10:33", area: "B区" },
  { id: 3, name: "王芳", role: "质检员", action: "in", time: "08:15:42", area: "C区" },
  { id: 4, name: "刘洋", role: "叉车操作员", action: "in", time: "08:22:08", area: "装卸区" },
  { id: 5, name: "陈磊", role: "安全主管", action: "in", time: "08:30:21", area: "全区" },
  { id: 6, name: "赵敏", role: "仓库管理员", action: "out", time: "09:45:10", area: "A区" },
  { id: 7, name: "孙浩", role: "维修工程师", action: "in", time: "10:01:05", area: "D区" },
  { id: 8, name: "周杰", role: "外来车辆司机", action: "in", time: "10:32:18", area: "装卸区" },
]

const names = ["张伟", "李强", "王芳", "刘洋", "陈磊", "赵敏", "孙浩", "周杰", "吴刚", "郑华"]
const roles = ["巡检员", "管理员", "质检员", "操作员", "工程师"]
const areas = ["A区", "B区", "C区", "D区", "装卸区"]

export function PersonnelAccess() {
  const [records, setRecords] = useState(initialRecords)

  const currentIn = records.filter((r) => r.action === "in").length
  const currentOut = records.filter((r) => r.action === "out").length

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      const newRecord: PersonnelRecord = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        action: Math.random() > 0.4 ? "in" : "out",
        time: timeStr,
        area: areas[Math.floor(Math.random() * areas.length)],
      }
      setRecords((prev) => [newRecord, ...prev.slice(0, 11)])
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Panel title="人员出入管理" icon={<Users className="h-4 w-4" />}>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <UserCheck className="h-5 w-5 text-primary" />
          <div>
            <div className="text-lg font-bold text-primary font-mono">{currentIn}</div>
            <div className="text-[10px] text-muted-foreground">{"在库人数"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <LogIn className="h-5 w-5 text-success" />
          <div>
            <div className="text-lg font-bold text-success font-mono">
              {records.filter((r) => r.action === "in").length}
            </div>
            <div className="text-[10px] text-muted-foreground">{"今日入库"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <LogOut className="h-5 w-5 text-warning" />
          <div>
            <div className="text-lg font-bold text-warning font-mono">{currentOut}</div>
            <div className="text-[10px] text-muted-foreground">{"今日出库"}</div>
          </div>
        </div>
      </div>

      {/* Records list */}
      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {records.slice(0, 8).map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between rounded-md bg-secondary/30 px-3 py-1.5 text-xs border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full ${record.action === "in" ? "bg-success" : "bg-warning"}`}
              />
              <span className="text-foreground font-medium">{record.name}</span>
              <span className="text-muted-foreground">{record.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{record.area}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  record.action === "in"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {record.action === "in" ? "入库" : "出库"}
              </span>
              <span className="font-mono text-muted-foreground">{record.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
