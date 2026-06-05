const ORG_EMAIL = "nextgenazer@gmail.com"

const getApiBase = (): string => {
  const url = (import.meta.env.VITE_API_URL as string) || (import.meta.env.VITE_PAYMENT_API_URL as string) || ""
  return url.replace(/\/$/, "")
}

const getSendEmailUrl = (): string => {
  const base = getApiBase()
  return base ? `${base}/api/send-email` : "/api/send-email"
}

type ApiResult = { ok: boolean; error?: string }

/** Direct delivery to nextgenazer@gmail.com — works without Vercel or API keys. */
export const sendContactViaFormSubmit = async (input: {
  name: string
  email: string
  message: string
}): Promise<ApiResult> => {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ORG_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        message: input.message,
        _subject: `NextGen website contact from ${input.name}`,
        _captcha: "false",
        _template: "table",
      }),
    })

    const data = (await response.json().catch(() => ({}))) as { success?: string }
    if (response.ok && data.success === "true") {
      return { ok: true }
    }
    return { ok: false, error: "Could not deliver message." }
  } catch {
    return { ok: false, error: "Network error." }
  }
}

const parseErrorMessage = (response: Response, data: { error?: string }): string => {
  if (data.error) return data.error
  if (response.status === 404) {
    return "Email server not reachable."
  }
  if (response.status === 503) {
    return data.error || "Email not configured on server."
  }
  return `Could not send email (error ${response.status}).`
}

const postEmail = async (payload: Record<string, unknown>): Promise<ApiResult> => {
  try {
    const response = await fetch(getSendEmailUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const contentType = response.headers.get("content-type") || ""
    const data = contentType.includes("application/json")
      ? ((await response.json()) as { ok?: boolean; error?: string })
      : {}

    if (!response.ok) {
      return { ok: false, error: parseErrorMessage(response, data) }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: "Network error — API not available." }
  }
}

export const sendContactMessage = async (input: {
  name: string
  email: string
  message: string
}): Promise<ApiResult> => {
  const apiResult = await postEmail({ type: "contact", ...input })
  if (apiResult.ok) return apiResult

  const fallback = await sendContactViaFormSubmit(input)
  if (fallback.ok) return { ok: true }

  return {
    ok: false,
    error:
      apiResult.error ||
      fallback.error ||
      `Please email us directly at ${ORG_EMAIL}.`,
  }
}

export const sendMentorWelcomeEmail = (input: { name: string; surname: string; email: string }) =>
  postEmail({ type: "mentor_welcome", ...input })

export const sendMemberWelcomeEmail = (input: {
  name: string
  surname: string
  email: string
  mentorName: string
  age: number
}) => postEmail({ type: "member_welcome", ...input })

export const notifyEmailInBackground = (promise: Promise<ApiResult>): void => {
  void promise.catch(() => undefined)
}
