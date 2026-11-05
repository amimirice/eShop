import { useEffect, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import axios from 'axios'

import type { ProductDetail } from '../../../data/product.type'
import { mockProductDetails } from '../../../data/mockProducts'
import { productFlowers } from '../../../data/productFlowers'
import { api } from '../../../lib/api'

import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'
import QuantitySelector from './component/QuantitySelector'
import { useCart } from '../../../context/CartContext'

// Product loading states
type LoadStatus =
    | 'loading'
    | 'success'
    | 'not-found'
    | 'error'

type ProductState = {
    product: ProductDetail | null
    loadStatus: LoadStatus
}

// Route component
export default function ProductDetailPage() {
    const { pid } = useParams({ from: '/product/$pid' })

    return <ProductDetailContent key={pid} pid={pid} />
}

// Product content is reset whenever the product ID changes
function ProductDetailContent({ pid }: { pid: string }) {
    const { addToCart } = useCart()

    const [quantity, setQuantity] = useState(1)

    // Add to Bag success feedback
    const [isAddedToBag, setIsAddedToBag] = useState(false)

    // Reset success feedback after 1.5 seconds
    useEffect(() => {
        if (!isAddedToBag) return

        const timer = window.setTimeout(() => {
            setIsAddedToBag(false)
        }, 1500)

        return () => window.clearTimeout(timer)
    }, [isAddedToBag])

    // Initialize product state without calling setState in useEffect
    const [productState, setProductState] = useState<ProductState>(() => {
        // Use mock product details during local development
        if (import.meta.env.DEV) {
            const mockProduct = mockProductDetails.find(
                (item) => item.pid === Number(pid)
            )

            return {
                product: mockProduct ?? null,
                loadStatus: mockProduct ? 'success' : 'not-found',
            }
        }

        // Production starts in loading state
        return {
            product: null,
            loadStatus: 'loading',
        }
    })

    const { product, loadStatus } = productState

    // Fetch product details from Spring Boot in production
    useEffect(() => {
        if (import.meta.env.DEV) {
            return
        }

        const controller = new AbortController()

        api
            .get<ProductDetail>(`/public/products/${pid}`, {
                signal: controller.signal,
            })
            .then((response) => {
                if (controller.signal.aborted) {
                    return
                }

                setProductState({
                    product: response.data,
                    loadStatus: 'success',
                })
            })
            .catch((error) => {
                if (controller.signal.aborted) {
                    return
                }

                console.error('Failed to fetch product:', error)

                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setProductState({
                        product: null,
                        loadStatus: 'not-found',
                    })
                } else {
                    setProductState({
                        product: null,
                        loadStatus: 'error',
                    })
                }
            })

        // Cancel the previous request when leaving this product
        return () => {
            controller.abort()
        }
    }, [pid])

    // Add selected product to shopping bag
    const handleAddToBag = () => {
        if (!product || product.stock === null || product.stock <= 0) {
            return
        }

        addToCart({
            pid: product.pid,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: quantity,
        })

        // Show success feedback after adding to Bag
        setIsAddedToBag(true)
    }

    // Loading state
    if (loadStatus === 'loading') {
        return (
            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <p className="py-20 text-center text-sm text-[#6D695F]">
                    Loading bouquet...
                </p>
            </main>
        )
    }

    // Product not found or API error
    if (loadStatus !== 'success' || !product) {
        return (
            <>
                <TopNavBar />

                <main className="min-h-screen bg-[#F6F1E8] px-6 pt-24">
                    <section className="mx-auto max-w-xl py-20 text-center">
                        <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                            Bloom Atelier
                        </p>

                        <h1 className="mt-6 font-serif text-3xl text-[#4D5943] md:text-4xl">
                            {loadStatus === 'not-found'
                                ? 'Product not found.'
                                : 'Unable to load product.'}
                        </h1>

                        <p className="mt-6 text-sm leading-7 text-[#6D695F]">
                            {loadStatus === 'not-found'
                                ? 'This bouquet could not be found in our collection.'
                                : 'Something went wrong. Please try again later.'}
                        </p>

                        <Link
                            to="/"
                            className="mt-10 inline-block border border-[#4D5943] bg-[#4D5943] px-8 py-4 text-xs uppercase tracking-[0.16em] text-[#F6F1E8] transition-colors duration-300 hover:bg-[#F6F1E8] hover:text-[#4D5943]"
                        >
                            Explore the Collection
                        </Link>
                    </section>
                </main>

                <Footer />
            </>
        )
    }

    // Product detail page
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-12 py-12 md:grid-cols-2 md:gap-16">

                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={product.imageUrl}
                            alt={`${product.name} bouquet`}
                            className={
                                product.pid === 7 || product.pid === 14
                                    ? 'w-[85%] object-contain md:w-[80%]'
                                    : 'w-[95%] object-contain md:w-[90%]'
                            }
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">
                        <h1 className="font-serif text-xl text-[#4D5943] md:text-xl">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-base text-[#24231F]">
                            HK${product.price.toLocaleString()}
                        </p>

                        <p className="mt-8 max-w-lg text-sm leading-5 font-normal text-[#6D695F]">
                            {product.description}
                        </p>

                        {/* Flower Ingredients */}
                        <div className="mt-8 max-w-lg">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#4D5943]">
                                Made with
                            </p>

                            <p className="mt-2 text-sm leading-5 text-[#6D695F]">
                                {productFlowers[product.pid] ?? ''}
                            </p>
                        </div>

                        {/* Stock Status */}
                        <p className="mt-6 text-sm text-[#6D695F]">
                            {product.stock !== null && product.stock > 0
                                ? 'In stock'
                                : 'Out of stock'}
                        </p>

                        {/* Quantity and Add to Bag */}
                        <div className="mt-8">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#4D5943]">
                                Quantity
                            </p>

                            <QuantitySelector
                                quantity={quantity}
                                stock={product.stock ?? 0}
                                onQuantityChange={setQuantity}
                            />

                            {/* Add to Bag with success feedback */}
                            <button
                                type="button"
                                onClick={handleAddToBag}
                                disabled={
                                    product.stock === null ||
                                    product.stock <= 0
                                }
                                aria-live="polite"
                                className={`mt-6 w-full max-w-lg border px-6 py-4 text-sm font-medium tracking-[0.12em] text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                                    isAddedToBag
                                        ? 'border-[#788574] bg-[#788574] enabled:hover:bg-[#788574]'
                                        : 'border-[#4D5943] bg-[#4D5943] enabled:hover:bg-[#F6F1E8] enabled:hover:text-[#4D5943]'
                                }`}
                            >
                                {isAddedToBag
                                    ? 'ADDED TO BAG ✓'
                                    : 'ADD TO BAG'}
                            </button>

                            <Link
                                to="/shop"
                                reloadDocument
                                className="mt-6 block w-fit text-sm text-[#4D5943] transition-colors duration-300 hover:text-[#B97870]"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>

                </section>
            </main>

            <Footer />
        </>
    )
}
