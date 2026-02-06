import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function POST(request: NextRequest) {
  try {
    const { amount, customerInfo } = await request.json()
    
    const stripe = getStripe()
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || '',
      },
    })

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    })
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
