import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import type { Mentor } from "../types"

const formatRegisteredAt = (value: string | undefined): string => {
  if (!value) {
    return ""
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString()
}

const mentorRows = (mentors: Mentor[]): string[][] =>
  mentors.map((mentor, index) => [
    String(index + 1),
    mentor.name,
    mentor.surname,
    mentor.fin ?? "",
    mentor.email,
    mentor.dateOfBirth ?? (mentor.age ? String(mentor.age) : ""),
    mentor.country ?? "",
    formatRegisteredAt(mentor.registeredAt),
  ])

const headers = ["#", "Name", "Surname", "FIN", "Email", "Date of Birth", "Country", "Registered"]

export const exportMentorsPdf = (mentors: Mentor[]): void => {
  const doc = new jsPDF({ orientation: mentors.length > 8 ? "landscape" : "portrait" })
  const generatedAt = new Date().toLocaleString()

  doc.setFontSize(18)
  doc.text("NextGen Robotics — Mentor Registrations", 14, 18)
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  doc.text(`Generated: ${generatedAt}  •  Total: ${mentors.length}`, 14, 26)
  doc.setTextColor(0, 0, 0)

  if (mentors.length === 0) {
    doc.setFontSize(12)
    doc.text("No mentor registrations yet.", 14, 40)
  } else {
    autoTable(doc, {
      startY: 32,
      head: [headers],
      body: mentorRows(mentors),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 14, right: 14 },
    })
  }

  const blobUrl = doc.output("bloburl")
  window.open(blobUrl, "_blank", "noopener,noreferrer")
}

export const exportMentorsExcel = (mentors: Mentor[]): void => {
  const sheetData = [headers, ...mentorRows(mentors)]
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mentors")

  worksheet["!cols"] = [
    { wch: 4 },
    { wch: 16 },
    { wch: 16 },
    { wch: 14 },
    { wch: 28 },
    { wch: 14 },
    { wch: 22 },
    { wch: 22 },
  ]

  XLSX.writeFile(workbook, `mentor-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
