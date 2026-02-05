"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-context"

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const router = useRouter()
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart, isLoaded } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md",
          "bg-zinc-900 border-l border-white/10", // removed backdrop-blur-2xl
          "flex flex-col",
          "transition-transform duration-300 ease-in-out", // simplified animation
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <h2 className="text-xl font-bold text-foreground">
            Cart ({isLoaded ? totalItems : 0})
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isLoaded || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <svg
                className="w-16 h-16 mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {isLoaded && items.length > 0 && (
          <div className="p-6 border-t border-border/30 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₴{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>₴{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose()
                router.push("/checkout")
              }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Checkout Now
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex gap-4 p-3 rounded-2xl bg-muted/20 backdrop-blur-lg border border-border/20">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground">₴{item.price.toFixed(2)}</p>
        
        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </button>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1.5 h-fit rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Remove item"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
