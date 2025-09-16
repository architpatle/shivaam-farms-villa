"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { StaffManagement } from "@/components/staff-management"
import { FinanceSection } from "@/components/finance-section"
import { BookingManagement } from "@/components/booking-management"
import { StockManagement } from "@/components/stock-management"
import { SettingsSection } from "@/components/settings-section"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("dashboard")

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <DashboardOverview />
      case "staff":
        return <StaffManagement />
      case "finance":
        return <FinanceSection />
      case "booking":
        return <BookingManagement />
      case "stock":
        return <StockManagement />
      case "settings":
        return <SettingsSection />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
