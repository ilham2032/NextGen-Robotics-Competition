import type { VercelRequest, VercelResponse } from "@vercel/node"

export const ORG_INBOX = "nextgenazer@gmail.com"

type SendEmailInput = {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export const isEmailConfigured = (): boolean =>
  Boolean(process.env.RESEND_API_KEY?.trim() || process.env.GMAIL_APP_PASSWORD?.trim())

export const parseRequestBody = (req: VercelRequest): Record<string, unknown> => {
  if (!req.body) return {}
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString("utf8")) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  return req.body as Record<string, unknown>
}

const sendViaResend = async (input: SendEmailInput): Promise<{ ok: boolean; error?: string }> => {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return { ok: false, error: "Resend not configured" }

  const from = process.env.EMAIL_FROM?.trim() || "NextGen Robotics <onboarding@resend.dev>"
  const to = Array.isArray(input.to) ? input.to : [input.to]

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    return { ok: false, error: body || `Resend error (${response.status})` }
  }
  return { ok: true }
}

const sendViaGmail = async (input: SendEmailInput): Promise<{ ok: boolean; error?: string }> => {
  const pass = process.env.GMAIL_APP_PASSWORD?.trim()
  if (!pass) return { ok: false, error: "Gmail not configured" }

  const user = process.env.GMAIL_USER?.trim() || ORG_INBOX
  const to = Array.isArray(input.to) ? input.to.join(", ") : input.to
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "NextGen Robotics Competition"

  try {
    const nodemailer = await import("nodemailer")
    const transporter = nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Gmail send failed" }
  }
}

/** Free relay — delivers to ORG_INBOX without API keys (contact form fallback). */
export const sendContactViaFormSubmit = async (
  name: string,
  email: string,
  message: string,
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ORG_INBOX)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `NextGen website contact from ${name}`,
        _captcha: "false",
        _template: "table",
      }),
    })

    const data = (await response.json().catch(() => ({}))) as { success?: string }
    if (response.ok && data.success === "true") {
      return { ok: true }
    }
    return { ok: false, error: "FormSubmit relay failed." }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "FormSubmit relay failed." }
  }
}

export const sendEmail = async (input: SendEmailInput): Promise<{ ok: boolean; error?: string }> => {
  if (process.env.RESEND_API_KEY?.trim()) {
    const resendResult = await sendViaResend(input)
    if (resendResult.ok) return resendResult
    if (!process.env.GMAIL_APP_PASSWORD?.trim()) return resendResult
  }

  if (process.env.GMAIL_APP_PASSWORD?.trim()) {
    return sendViaGmail(input)
  }

  return { ok: false, error: "No email provider configured." }
}

export const jsonError = (res: VercelResponse, status: number, message: string) =>
  res.status(status).json({ ok: false, error: message })
