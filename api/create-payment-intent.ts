import type { VercelRequest, VercelResponse } from "@vercel/node"
import Stripe from "stripe"

const TEAM_FEE_AZN = Number(process.env.STRIPE_TEAM_FEE_AZN ?? "20")
const CURRENCY = (process.env.STRIPE_CURRENCY ?? "azn").toLowerCase()

const getStripe = (): Stripe => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured on the server.")
  }
  return new Stripe(secretKey)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { teamId, teamName } = req.body as { teamId?: string; teamName?: string }

    if (!teamId || !teamName) {
      return res.status(400).json({ error: "teamId and teamName are required." })
    }

    const stripe = getStripe()
    const amount = Math.round(TEAM_FEE_AZN * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: CURRENCY,
      metadata: {
        teamId,
        teamName,
        purpose: "nextgen_team_registration",
      },
      automatic_payment_methods: { enabled: true },
    })

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ error: "Failed to create payment session." })
    }

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment setup failed."
    return res.status(500).json({ error: message })
  }
}
