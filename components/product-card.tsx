"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCart, type Product } from "@/components/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addItem(product)
    
    // Brief animation feedback
    await new Promise((resolve) => setTimeout(resolve, 400))
    setIsAdding(false)
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl",
        "bg-zinc-900/40 border border-zinc-800",
        "transition-all duration-300 ease-out",
        "hover:bg-zinc-900/60 hover:border-zinc-700 hover:-translate-y-1",
        "will-change-transform" // Optimizes rendering for the translate
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800/20">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 ease-out", // simplified transition
            "group-hover:scale-105", // reduced scale intensity
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Simplified Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge - removed blur */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-black/80 text-white/70 border border-white/10">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="space-y-1">
          <h3 className="font-medium text-lg text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-white">
            ₴{product.price}
          </p>
        </div>

        {/* Add to Cart Button - removed blur */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            "relative w-full py-3 px-4 rounded-xl font-bold uppercase tracking-tight text-sm",
            "bg-white text-black hover:bg-zinc-200",
            "transition-all duration-200",
            "active:scale-[0.98]",
            "disabled:opacity-50"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center gap-2 transition-all duration-300",
              isAdding ? "opacity-0" : "opacity-100"
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add to Cart
          </span>
          
          {/* Success checkmark */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              isAdding ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl",
        "backdrop-blur-xl bg-card/40",
        "border border-border/20"
      )}
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-muted/30 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-3 p-5">
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-muted/30 rounded-lg animate-pulse" />
          <div className="h-7 w-1/2 bg-muted/30 rounded-lg animate-pulse" />
        </div>
        <div className="h-12 w-full bg-muted/30 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}
