"use client"

import { Panel } from "./panel"
import { Flame, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2 } from "lucide-react"

const equipmentData = [
  {
    name: "烟雾报警器",
    location: "A区-01",
    status: "normal",
    lastCheck: "2026-03-03",
    battery: 95,
  },
  {
    name: "温感探测器",
    location: "A区-02",
    status: "normal",
    lastCheck: "2026-03-02",
    battery: 88,
  },
  {
    name: "自动喷淋系统",
    location: "B区-01",
    status: "normal",
    lastCheck: "2026-03-01",
    battery: 100,
  },
  {
    name: "气体灭火装置",
    location: "B区-02",
    status: "warning",
    lastCheck: "2026-02-28",
    battery: 32,
  },
  {
    name: "手动报警按钮",
    location: "C区-01",
    status: "normal",
    lastCheck: "2026-03-03",
    battery: 76,
  },
  {
    name: "防火卷帘门",
    location: "C区-02",
    status: "normal",
    lastCheck: "2026-03-01",
    battery: 100,
  },
  {
    name: "应急照明",
    location: "全区",
    status: "fault",
    lastCheck: "2026-02-25",
    battery: 0,
  },
  {
    name: "消防栓",
    location: "D区-01",
    status: "normal",
    lastCheck: "2026-03-02",
    battery: 100,
  },
]

function StatusBadge({ status }: { status: string }) {
  if (status === "normal") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success">
        <CheckCircle2 className="h-3 w-3" />
        {"正常"}
      </span>
    )
  }
  if (status === "warning") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] text-warning">
        <AlertTriangle className="h-3 w-3" />
        {"待维护"}
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
      <ShieldAlert className="h-3 w-3" />
      {"故障"}
    </span>
  )
}

export function FireEquipment() {
  const normalCount = equipmentData.filter((e) => e.status === "normal").length
  const warningCount = equipmentData.filter(
    (e) => e.status === "warning"
  ).length
  const faultCount = equipmentData.filter((e) => e.status === "fault").length

  return (
    <Panel title="消防设备状态" icon={<Flame className="h-4 w-4" />}>
      {/* Status summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <ShieldCheck className="h-5 w-5 text-success" />
          <div>
            <div className="text-lg font-bold text-success">{normalCount}</div>
            <div className="text-[10px] text-muted-foreground">{"正常"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div>
            <div className="text-lg font-bold text-warning">{warningCount}</div>
            <div className="text-[10px] text-muted-foreground">{"待维护"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          <div>
            <div className="text-lg font-bold text-destructive">
              {faultCount}
            </div>
            <div className="text-[10px] text-muted-foreground">{"故障"}</div>
          </div>
        </div>
      </div>

      {/* Equipment list */}
      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
        {equipmentData.map((item) => (
          <div
            key={`${item.name}-${item.location}`}
            className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-1.5 text-xs border border-border/50"
          >
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">{item.name}</span>
              <span className="text-muted-foreground">{item.location}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.battery < 100 && (
                <span
                  className={`text-[10px] font-mono ${item.battery <= 30 ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {item.battery}%
                </span>
              )}
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
