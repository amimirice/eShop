
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

import type {
    ProductDetail,
    ProductListItem,
} from '../../data/product.type'

import { mockProductDetails } from '../../data/mockProducts'
import { productFlowers } from '../../data/productFlowers'
import { searchProducts } from '../../data/searchProducts'
import { api } from '../../lib/api'

// Cache products after a successful production API request
let cachedProductionProducts: ProductDetail[] | null = null

type ProductSearchPanelProps = {
    onClose: () => void
}

type LoadStatus = 'loading' | 'success' | 'error'

export default function ProductSearchPanel({
                                               onClose,
                                           }: ProductSearchPanelProps) {
    const [query, setQuery] = useState('')

    // Development uses mock data; production uses backend data
    const [products, setProducts] = useState<ProductDetail[]>(() => {
        if (import.meta.env.DEV) {
            return mockProductDetails
        }

        return cachedProductionProducts ?? []
    })

    const [loadStatus, setLoadStatus] = useState<LoadStatus>(() => {
        if (import.meta.env.DEV || cachedProductionProducts !== null) {
            return 'success'
        }

        return 'loading'
    })

    useEffect(() => {
        // No API requests are needed during local development
        if (import.meta.env.DEV || cachedProductionProducts !== null) {
            return
        }

        const controller = new AbortController()

        const loadProducts = async () => {
            try {
                // Fetch all available product IDs
                const listResponse = await api.get<ProductListItem[]>(
                    '/public/products',
                    { signal: controller.signal }
                )

                // Fetch product details to support description search
                const detailProducts = await Promise.all(
                    listResponse.data.map(async (item) => {
                        const response = await api.get<ProductDetail>(
                            `/public/products/${item.pid}`,
                            { signal: controller.signal }
                        )

                        return response.data
                    })
                )

                if (controller.signal.aborted) {
                    return
                }

                cachedProductionProducts = detailProducts
                setProducts(detailProducts)
                setLoadStatus('success')
            } catch (error) {
                if (controller.signal.aborted) {
                    return
                }

                console.error('Failed to load search products:', error)
                setLoadStatus('error')
            }
        }

        void loadProducts()

        // Cancel unfinished requests when the search panel closes
        return () => {
            controller.abort()
        }
    }, [])

    const filteredProducts = searchProducts(products, query)
    const hasQuery = query.trim().length > 0

    return (
        <div className="border-t border-[#D8D2C7] bg-[#F6F1E8] shadow-lg">
            <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">

                {/* Search Input */}
                <div className="flex items-center gap-4 border-b border-[#4D5943] pb-3">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search bouquets, flowers or colours..."
                        aria-label="Search bouquets"
                        autoFocus
                        className="min-w-0 flex-1 bg-transparent text-sm text-[#24231F] outline-none placeholder:text-[#8A887F]"
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close search"
                        className="text-sm text-[#4D5943] transition-colors hover:text-[#B97870]"
                    >
                        Close
                    </button>
                </div>

                {/* Loading State */}
                {loadStatus === 'loading' && (
                    <p
                        role="status"
                        className="mt-6 text-sm text-[#6D695F]"
                    >
                        Loading bouquets...
                    </p>
                )}

                {/* API Error State */}
                {loadStatus === 'error' && (
                    <p
                        role="alert"
                        className="mt-6 text-sm text-[#B97870]"
                    >
                        Unable to load bouquets. Please try again later.
                    </p>
                )}

                {/* Search Content */}
                {loadStatus === 'success' && (
                    <>
                        {/* Initial Message */}
                        {!hasQuery && (
                            <p className="mt-6 text-sm text-[#6D695F]">
                                Search by bouquet name, flower type or colour.
                            </p>
                        )}

                        {/* No Results */}
                        {hasQuery && filteredProducts.length === 0 && (
                            <p className="mt-6 text-sm text-[#6D695F]">
                                No bouquets found. Try another flower or colour.
                            </p>
                        )}

                        {/* Search Results */}
                        {hasQuery && filteredProducts.length > 0 && (
                            <div className="mt-6 max-h-[55vh] space-y-4 overflow-y-auto">
                                <p className="text-xs uppercase tracking-[0.12em] text-[#B97870]">
                                    {filteredProducts.length} Results
                                </p>

                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.pid}
                                        to="/product/$pid"
                                        params={{
                                            pid: String(product.pid),
                                        }}
                                        onClick={onClose}
                                        className="flex items-center gap-4 border-b border-[#D8D2C7] pb-4"
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt={`${product.name} bouquet`}
                                            className="h-20 w-20 shrink-0 object-contain"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="font-serif text-base text-[#4D5943]">
                                                {product.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[#6D695F]">
                                                {productFlowers[product.pid] ?? ''}
                                            </p>

                                            <p className="mt-2 text-sm text-[#24231F]">
                                                HK${product.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}
