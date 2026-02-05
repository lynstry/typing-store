"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-context"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { client } from "@/src/lib/apollo-client"
import { gql } from "@apollo/client"
import { ShoppingBag, ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const CHECKOUT_MUTATION = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        id
        databaseId
        orderNumber
      }
      result
    }
  }
`

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isLoaded } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)

    try {
      // Mapping local cart items to WooCommerce line items
      const lineItems = items.map((item) => ({
        productId: parseInt(item.id),
        quantity: item.quantity,
      }))

      const { data } = await client.mutate<{ checkout: { result: string } }>({
        mutation: CHECKOUT_MUTATION,
        variables: {
          input: {
            billing: {
              firstName: formData.get("firstName") as string,
              lastName: formData.get("lastName") as string,
              email: formData.get("email") as string,
              address1: formData.get("address") as string,
              city: formData.get("city") as string,
              postcode: formData.get("postcode") as string,
              country: "US", // Default for demo
            },
            shipping: {
              firstName: formData.get("firstName") as string,
              lastName: formData.get("lastName") as string,
              address1: formData.get("address") as string,
              city: formData.get("city") as string,
              postcode: formData.get("postcode") as string,
              country: "US",
            },
            paymentMethod: "bacs", // Direct Bank Transfer default
            isPaid: false,
            lineItems: lineItems,
          },
        },
      })

      if (data?.checkout?.result === "SUCCESS") {
        clearCart()
        router.push("/thank-you")
      }
    } catch (error) {

      console.error("Checkout error:", error)
      alert("Something went wrong with your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent text-white">
        <Loader2 className="w-8 h-8 animate-spin opacity-50" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent text-white">
        <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-bold">
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <form action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">First Name</label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Last Name</label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Shipping Address</label>
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="123 Keyboard St."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">City</label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Postcode</label>
                  <input
                    required
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Purchase"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 h-fit lg:sticky lg:top-32">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-6 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">₴{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₴{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-zinc-800">
                <span>Total</span>
                <span>₴{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
