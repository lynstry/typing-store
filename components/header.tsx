"use client"

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { CartSheet } from "@/components/cart-sheet";
import { ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
    const { totalItems, isLoaded } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (formData: FormData) => {
        const query = formData.get("search")?.toString();
        if (query?.trim()) {
            router.push(`/?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/50 border-b border-white/10">
                <div className="container mx-auto h-20 px-6 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xl">T</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tighter uppercase hidden sm:block">Typing Store</h1>
                    </Link>

                    {/* Search Bar */}
                    <form action={handleSearch} className="flex-1 max-w-3xl relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-zinc-900 transition-all"
                        />
                    </form>
                    
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        {isLoaded && totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black border-2 border-black">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </header>
            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}

export default Header;
