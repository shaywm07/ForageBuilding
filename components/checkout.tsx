'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import type { Stripe } from '@stripe/stripe-js'

type Props = {}

let stripePromise: Promise<Stripe | null> | null = null
function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) return Promise.resolve(null)
    const { loadStripe } = require('@stripe/stripe-js')
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

const Checkout = (props: Props) => {
  const { items } = useCart()
  const [loading, setLoading] = useState(false)

  const onCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
        }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      const stripe = await getStripe()
      if (!stripe) throw new Error('Stripe is not configured')

      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 grid gap-4">
      <Button
        size="lg"
        className="w-full"
        disabled={loading || items.length === 0}
        onClick={onCheckout}
      >
        {loading ? 'Processing...' : 'Checkout'}
      </Button>
    </div>
  )
}

export default Checkout