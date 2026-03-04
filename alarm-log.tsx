"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SafetyStats } from "@/components/dashboard/safety-stats"
import { TemperatureHumidity } from "@/components/dashboard/temperature-humidity"
import { Inventory } from "@/components/dashboard/inventory"
import { GasConcentration } from "@/components/dashboard/gas-concentration"
import { FireEquipment } from "@/components/dashboard/fire-equipment"
import { VideoMonitor } from "@/components/dashboard/video-monitor"
import { AlarmLog } from "@/components/dashboard/alarm-log"
import { PersonnelAccess } from "@/components/dashboard/personnel-access"
import { RiskAssessment } from "@/components/dashboard/risk-assessment"
import { Ventilation } from "@/components/dashboard/ventilation"
import { HazardLabels } from "@/components/dashboard/hazard-labels"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen flex bg-background overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,180,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,200,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Sidebar */}
      <div className="relative z-20">
        <SidebarNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-4 overflow-hidden">
          {activeSection === "overview" && <OverviewView />}
          {activeSection === "safety" && <SafetyView />}
          {activeSection === "inventory" && <InventoryView />}
          {activeSection === "personnel" && <PersonnelView />}
          {activeSection === "environment" && <EnvironmentView />}
          {activeSection === "fire" && <FireView />}
          {activeSection === "video" && <VideoView />}
          {activeSection === "alarm" && <AlarmView />}
          {activeSection === "report" && <ReportView />}
          {activeSection === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  )
}

/* ===================== View Components ===================== */

function OverviewView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      {/* KPI Stats Bar */}
      <SafetyStats />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left panels */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TemperatureHumidity />
            <GasConcentration />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inventory />
            <FireEquipment />
          </div>
          <AlarmLog />
        </div>

        {/* Right: Video */}
        <div className="lg:col-span-5">
          <VideoMonitor />
        </div>
      </div>
    </div>
  )
}

function SafetyView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <SafetyStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RiskAssessment />
        <GasConcentration />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TemperatureHumidity />
        <Ventilation />
      </div>
      <AlarmLog />
    </div>
  )
}

function InventoryView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Inventory />
        <HazardLabels />
      </div>
      <RiskAssessment />
      <AlarmLog />
    </div>
  )
}

function PersonnelView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <PersonnelAccess />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-7">
          <AlarmLog />
        </div>
        <div className="lg:col-span-5">
          <VideoMonitor />
        </div>
      </div>
    </div>
  )
}

function EnvironmentView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TemperatureHumidity />
        <GasConcentration />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Ventilation />
        <RiskAssessment />
      </div>
    </div>
  )
}

function FireView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <FireEquipment />
        </div>
        <div className="lg:col-span-5">
          <TemperatureHumidity />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GasConcentration />
        <Ventilation />
      </div>
      <AlarmLog />
    </div>
  )
}

function VideoView() {
  return (
    <div className="h-full">
      <VideoMonitor />
    </div>
  )
}

function AlarmView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <AlarmLog />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RiskAssessment />
        <FireEquipment />
      </div>
    </div>
  )
}

function ReportView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <SafetyStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RiskAssessment />
        <HazardLabels />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Inventory />
        <PersonnelAccess />
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="relative rounded-lg border border-border bg-card backdrop-blur-sm p-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <h2 className="text-sm font-medium text-primary mb-6">{"系统设置"}</h2>

        <div className="space-y-4">
          {[
            { label: "告警阈值配置", desc: "设置温度、湿度、气体浓度预警上下限" },
            { label: "视频流源管理", desc: "配置 RTSP/HLS 视频流地址和摄像头参数" },
            { label: "人员权限管理", desc: "设置不同角色的访问权限和操作范围" },
            { label: "数据上报频率", desc: "传感器采集间隔和云端同步周期" },
            { label: "消防联动配置", desc: "配置消防设备联动规则和自动响应策略" },
            { label: "MSDS资料库更新", desc: "安全数据表同步与版本管理" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div>
                <div className="text-sm text-foreground font-medium">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </div>
              </div>
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
