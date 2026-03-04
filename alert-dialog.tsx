"use client"

import { useEffect, useState } from "react"
import { Panel } from "./panel"
import { Camera, Maximize2, Video } from "lucide-react"

const cameras = [
  { id: 1, name: "A区入口", location: "1号仓库入口", status: "online" },
  { id: 2, name: "B区存储", location: "2号仓库内部", status: "online" },
  { id: 3, name: "C区装卸", location: "装卸货区域", status: "online" },
  { id: 4, name: "D区通道", location: "消防通道", status: "offline" },
]

function CameraFeed({
  camera,
  isMain = false,
}: {
  camera: (typeof cameras)[0]
  isMain?: boolean
}) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`relative rounded-md border border-border overflow-hidden group ${
        isMain ? "h-full" : "h-full"
      }`}
    >
      {/* Simulated camera feed background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#071222] ${
          camera.status === "offline" ? "opacity-40" : ""
        }`}
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,180,255,0.03)_2px,rgba(0,180,255,0.03)_4px)]" />

        {/* Grid overlay for camera feed effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.06)_0%,transparent_70%)]" />

        {/* Camera icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {camera.status === "online" ? (
            <div className="flex flex-col items-center gap-2">
              <Video className={`${isMain ? "h-12 w-12" : "h-8 w-8"} text-primary/20`} />
              <span className="text-xs text-primary/30">{"RTSP://实时视频流"}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Camera className={`${isMain ? "h-12 w-12" : "h-8 w-8"} text-destructive/30`} />
              <span className="text-xs text-destructive/50">{"信号中断"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Top overlay info */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1 bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              camera.status === "online"
                ? "bg-destructive animate-pulse"
                : "bg-muted-foreground"
            }`}
          />
          <span className="text-[10px] text-foreground/80 font-medium">
            {camera.status === "online" ? "REC" : "OFF"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {camera.name}
          </span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity" aria-label="全屏">
          <Maximize2 className="h-3 w-3 text-foreground/60 hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Bottom overlay info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1 bg-gradient-to-t from-black/50 to-transparent z-10">
        <span className="text-[10px] text-muted-foreground">
          {camera.location}
        </span>
        <span className="text-[10px] text-primary/60 font-mono">{time}</span>
      </div>
    </div>
  )
}

export function VideoMonitor() {
  const [activeCamera, setActiveCamera] = useState(0)

  return (
    <Panel title="实时监控" icon={<Camera className="h-4 w-4" />} className="h-full">
      <div className="flex flex-col gap-3 h-full">
        {/* Main view */}
        <div className="flex-1 min-h-[280px]">
          <CameraFeed camera={cameras[activeCamera]} isMain />
        </div>

        {/* Camera thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {cameras.map((camera, index) => (
            <button
              key={camera.id}
              onClick={() => setActiveCamera(index)}
              className={`relative h-20 rounded-md overflow-hidden transition-all ${
                index === activeCamera
                  ? "ring-1 ring-primary"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <CameraFeed camera={camera} />
            </button>
          ))}
        </div>
      </div>
    </Panel>
  )
}
