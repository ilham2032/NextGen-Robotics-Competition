import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  contactAutoReplyEmail,
  contactInboxEmail,
  memberWelcomeEmail,
  mentorWelcomeEmail,
} from "./_lib/emailTemplates"
import {
  ORG_INBOX,
  isEmailConfigured,
  jsonError,
  parseRequestBody,
  sendContactViaFormSubmit,
  sendEmail,
} from "./_lib/mailer"

type EmailType = "contact" | "mentor_welcome" | "member_welcome"

const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return jsonError(res, 405, "Method not allowed")
    }

    const body = parseRequestBody(req)
    const type = body.type as EmailType | undefined

    if (!type) {
      return jsonError(res, 400, "Missing email type.")
    }

    if (type === "contact") {
      const name = escapeHtml(String(body.name ?? "").trim())
      const email = String(body.email ?? "").trim().toLowerCase()
      const message = escapeHtml(String(body.message ?? "").trim())

      if (!name || !email || !message) {
        return jsonError(res, 400, "Name, email, and message are required.")
      }
      if (!isValidEmail(email)) {
        return jsonError(res, 400, "Invalid email address.")
      }
      if (message.length > 5000) {
        return jsonError(res, 400, "Message is too long.")
      }

      let delivered = false

      if (isEmailConfigured()) {
        const inbox = contactInboxEmail(name, email, message)
        const toOrg = await sendEmail({
          to: ORG_INBOX,
          subject: inbox.subject,
          html: inbox.html,
          replyTo: email,
        })
        if (toOrg.ok) {
          delivered = true
          const autoReply = contactAutoReplyEmail(name)
          await sendEmail({ to: email, subject: autoReply.subject, html: autoReply.html }).catch(() => undefined)
        }
      }

      if (!delivered) {
        const relay = await sendContactViaFormSubmit(name, email, message)
        if (!relay.ok) {
          return jsonError(res, 502, relay.error ?? "Failed to deliver message. Please email nextgenazer@gmail.com directly.")
        }
      }

      return res.status(200).json({ ok: true })
    }

    if (!isEmailConfigured()) {
      return jsonError(
        res,
        503,
        "Welcome emails require RESEND_API_KEY or GMAIL_APP_PASSWORD on the server. Contact form works without them.",
      )
    }

    if (type === "mentor_welcome") {
      const name = escapeHtml(String(body.name ?? "").trim())
      const surname = escapeHtml(String(body.surname ?? "").trim())
      const email = String(body.email ?? "").trim().toLowerCase()

      if (!name || !surname || !email) {
        return jsonError(res, 400, "Name, surname, and email are required.")
      }
      if (!isValidEmail(email)) {
        return jsonError(res, 400, "Invalid email address.")
      }

      const template = mentorWelcomeEmail(name, surname)
      const toMentor = await sendEmail({ to: email, subject: template.subject, html: template.html })
      if (!toMentor.ok) {
        return jsonError(res, 502, toMentor.error ?? "Failed to send welcome email.")
      }

      return res.status(200).json({ ok: true })
    }

    if (type === "member_welcome") {
      const name = escapeHtml(String(body.name ?? "").trim())
      const surname = escapeHtml(String(body.surname ?? "").trim())
      const email = String(body.email ?? "").trim().toLowerCase()
      const mentorName = escapeHtml(String(body.mentorName ?? "Your mentor").trim())
      const age = Number(body.age)

      if (!name || !surname || !email) {
        return jsonError(res, 400, "Name, surname, and email are required.")
      }
      if (!isValidEmail(email)) {
        return jsonError(res, 400, "Invalid email address.")
      }
      if (!Number.isFinite(age) || age < 1) {
        return jsonError(res, 400, "Valid age is required.")
      }

      const template = memberWelcomeEmail(name, surname, mentorName, Math.floor(age))
      const toMember = await sendEmail({ to: email, subject: template.subject, html: template.html })
      if (!toMember.ok) {
        return jsonError(res, 502, toMember.error ?? "Failed to send welcome email.")
      }

      return res.status(200).json({ ok: true })
    }

    return jsonError(res, 400, "Unknown email type.")
  } catch (error) {
    console.error("send-email error:", error)
    const message = error instanceof Error ? error.message : "Internal server error"
    return jsonError(res, 500, message)
  }
}
