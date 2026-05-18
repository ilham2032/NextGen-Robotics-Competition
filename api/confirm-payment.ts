import type { VercelRequest, VercelResponse } from "@vercel/node"
import Stripe from "stripe"

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
    const { paymentIntentId } = req.body as { paymentIntentId?: string }

    if (!paymentIntentId) {
      return res.status(400).json({ error: "paymentIntentId is required." })
    }

    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment has not been completed yet.", paid: false })
    }

    const teamId = paymentIntent.metadata?.teamId
    if (!teamId) {
      return res.status(400).json({ error: "Missing team reference on payment." })
    }

    return res.status(200).json({
      paid: true,
      teamId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed."
    return res.status(500).json({ error: message, paid: false })
  }
}
