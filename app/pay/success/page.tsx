'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BizzyBee } from '@/components/icons'
import { Check, Home, Loader2 } from 'lucide-react'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: number
    email: string
  } | null>(null)

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from Stripe
      fetch(`/api/checkout/verify?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.amount) {
            setPaymentDetails(data)
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="border-0 shadow-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-slate-600">Confirming your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-emerald-600" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-slate-600 mb-6">
              Thank you for your payment. A receipt has been sent to your email.
            </p>
            
            {paymentDetails && (
              <div className="bg-slate-100 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-slate-600 mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-slate-900">
                  ${(paymentDetails.amount / 100).toFixed(2)}
                </p>
                {paymentDetails.email && (
                  <p className="text-sm text-slate-500 mt-2">
                    Receipt sent to {paymentDetails.email}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            {/* Business Info */}
            <div className="mt-8 pt-6 border-t text-sm text-slate-500">
              <BizzyBee className="w-8 h-8 mx-auto mb-2" animate={false} />
              <p className="font-semibold text-slate-700">TUMBLEBUS</p>
              <p>P.O. Box 47, Flint, TX 75762</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
