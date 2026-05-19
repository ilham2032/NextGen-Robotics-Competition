import { useEffect, useMemo, useState } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"
import type { Team, TeamPaymentMethod } from "../admin/types"
import {
  confirmTeamPayment,
  createTeamPaymentIntent,
  formatTeamFee,
  isStripeConfigured,
} from "../lib/stripePayments"
import { TEAM_REGISTRATION_FEE_AZN } from "../utils/teamDisplay"

export type TeamPaymentPanelProps = {
  team: Team
  onCancel: () => void
  onComplete: (teamId: string, method: TeamPaymentMethod) => void
}

type CardPaymentFormProps = {
  team: Team
  paymentIntentId: string
  onCancel: () => void
  onComplete: (teamId: string, method: TeamPaymentMethod) => void
}

const CardPaymentForm = ({ team, paymentIntentId, onCancel, onComplete }: CardPaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  const handlePay = async () => {
    if (!stripe || !elements) {
      setError("Payment form is still loading. Please wait a moment.")
      return
    }

    setProcessing(true)
    setError("")

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${import.meta.env.BASE_URL}user/dashboard?tab=teams`,
        },
        redirect: "if_required",
      })

      if (stripeError) {
        setError(stripeError.message ?? "Card payment failed.")
        return
      }

      const intentId = paymentIntent?.id ?? paymentIntentId
      await confirmTeamPayment(intentId)
      onComplete(team.id, "card")
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : "Payment could not be completed.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-200 bg-white p-4">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <p className="text-xs text-slate-500">
        Enter your card below. Payment is secure via Stripe. Your team goes live on the Participants page after payment.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={processing || !stripe}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {processing ? "Processing..." : `Pay ${formatTeamFee()} now`}
        </button>
      </div>
    </div>
  )
}

const TeamPaymentPanel = ({ team, onCancel, onComplete }: TeamPaymentPanelProps) => {
  const amount = team.paymentAmount ?? TEAM_REGISTRATION_FEE_AZN
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const stripePromise = useMemo(() => {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    return key ? loadStripe(key) : null
  }, [])

  const elementsOptions: StripeElementsOptions | undefined = clientSecret
    ? { clientSecret, appearance: { theme: "stripe" } }
    : undefined

  useEffect(() => {
    if (!isStripeConfigured()) {
      setLoading(false)
      return
    }

    let cancelled = false

    const start = async () => {
      try {
        const result = await createTeamPaymentIntent(team.id, team.name)
        if (!cancelled) {
          setClientSecret(result.clientSecret)
          setPaymentIntentId(result.paymentIntentId)
        }
      } catch (startError) {
        if (!cancelled) {
          setError(startError instanceof Error ? startError.message : "Could not load payment form.")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void start()

    return () => {
      cancelled = true
    }
  }, [team.id, team.name])

  return (
    <div
      id={`team-payment-${team.id}`}
      className="mt-4 rounded-2xl border-2 border-blue-200 bg-linear-to-b from-blue-50 to-white p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-blue-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Pay on mentor page</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">Card payment — {team.name}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Pay <span className="font-semibold text-slate-900">{amount} AZN</span> to publish this team on the main site.
          </p>
        </div>
        <div className="rounded-xl bg-blue-600 px-4 py-2 text-center text-white">
          <p className="text-xs uppercase tracking-wide opacity-90">Total</p>
          <p className="text-xl font-bold">{amount} AZN</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="grid gap-2 rounded-xl bg-white/80 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200 sm:grid-cols-2">
          <div className="flex justify-between sm:block">
            <span className="text-slate-500">Team</span>
            <span className="font-medium text-slate-900 sm:mt-1 sm:block">{team.name}</span>
          </div>
          <div className="flex justify-between sm:block">
            <span className="text-slate-500">Category</span>
            <span className="font-medium text-slate-900 sm:mt-1 sm:block">{team.categoryName ?? "—"}</span>
          </div>
        </div>

        {!isStripeConfigured() ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">Card payments are not active yet</p>
            <p className="mt-2">
              The organizer must add Stripe keys and deploy the payment API. Until then, contact the competition admin.
            </p>
          </div>
        ) : loading ? (
          <p className="py-6 text-center text-sm text-slate-500">Loading secure card form...</p>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : clientSecret && stripePromise && elementsOptions && paymentIntentId ? (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <CardPaymentForm
              team={team}
              paymentIntentId={paymentIntentId}
              onCancel={onCancel}
              onComplete={onComplete}
            />
          </Elements>
        ) : null}
      </div>
    </div>
  )
}

export default TeamPaymentPanel
