"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">ORDER RECEIVED</h1>
        <p className="text-zinc-400 text-lg">
          Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.
        </p>
        <div className="pt-6">
          <Link 
            href="/" 
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
