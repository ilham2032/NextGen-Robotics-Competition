import { TEAM_REGISTRATION_FEE_AZN } from "../utils/teamDisplay"

const apiBase = () => import.meta.env.VITE_PAYMENT_API_URL?.replace(/\/$/, "") ?? ""

export const isStripeConfigured = (): boolean =>
  Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim())

export type CreatePaymentIntentResponse = {
  clientSecret: string
  paymentIntentId: string
}

export const createTeamPaymentIntent = async (
  teamId: string,
  teamName: string,
): Promise<CreatePaymentIntentResponse> => {
  const response = await fetch(`${apiBase()}/api/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teamId, teamName }),
  })

  const payload = (await response.json()) as { error?: string; clientSecret?: string; paymentIntentId?: string }

  if (!response.ok || !payload.clientSecret || !payload.paymentIntentId) {
    throw new Error(payload.error ?? "Could not start card payment. Check payment server configuration.")
  }

  return { clientSecret: payload.clientSecret, paymentIntentId: payload.paymentIntentId }
}

export type ConfirmPaymentResponse = {
  teamId: string
  paid: boolean
  amount: number
  currency: string
}

export const confirmTeamPayment = async (paymentIntentId: string): Promise<ConfirmPaymentResponse> => {
  const response = await fetch(`${apiBase()}/api/confirm-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentIntentId }),
  })

  const payload = (await response.json()) as ConfirmPaymentResponse & { error?: string }

  if (!response.ok || !payload.paid) {
    throw new Error(payload.error ?? "Payment was not completed.")
  }

  return payload
}

export const formatTeamFee = (): string => `${TEAM_REGISTRATION_FEE_AZN} AZN`
