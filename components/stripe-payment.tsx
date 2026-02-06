'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Loader2, Lock } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  onSuccess: () => void
  onError: (error: string) => void
}

function PaymentForm({ onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`,
      },
      redirect: 'if_required',
    })

    if (error) {
      onError(error.message || 'Payment failed')
      setIsProcessing(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement 
        options={{
          layout: 'tabs',
        }}
      />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full h-14 text-lg shadow-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay Now
          </>
        )}
      </Button>
      <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" />
        Secure payment powered by Stripe
      </p>
    </form>
  )
}

interface StripePaymentProps {
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  onSuccess: () => void
  onError: (error: string) => void
}

export default function StripePayment({ amount, customerInfo, onSuccess, onError }: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Create PaymentIntent on mount
    fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, customerInfo }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          onError('Failed to initialize payment')
        }
        setLoading(false)
      })
      .catch(() => {
        onError('Failed to initialize payment')
        setLoading(false)
      })
  }, [amount, customerInfo])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load payment form. Please try again.
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#f59e0b',
            colorBackground: '#ffffff',
            colorText: '#1e293b',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '12px',
          },
        },
      }}
    >
      <PaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}
