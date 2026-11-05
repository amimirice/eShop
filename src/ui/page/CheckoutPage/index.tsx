
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import {
    prepareCheckoutOrder,
    type CheckoutDetails,
} from '../../../lib/checkoutApi'

import {
    validateCheckoutForm,
    type CheckoutFormErrors,
} from '../../../data/checkoutValidation'

export default function CheckoutPage() {
    const { cartItems, addToCart } = useCart()
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    // Checkout form validation
    const [formErrors, setFormErrors] =
        useState<CheckoutFormErrors>({})

    // Backend checkout state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [orderPrepared, setOrderPrepared] = useState(false)

    // Keep Demo Checkout during local development
    const backendCheckoutEnabled =
        import.meta.env.PROD ||
        import.meta.env.VITE_ENABLE_BACKEND_CHECKOUT === 'true'

    // Earliest delivery date is tomorrow
    const [minDeliveryDate] = useState(() => {
        const date = new Date()
        date.setDate(date.getDate() + 1)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    })

    // Calculate cart subtotal
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    // Redirect visitors who are not signed in
    useEffect(() => {
        if (!loading && !user) {
            navigate({ to: '/login' })
        }
    }, [loading, user, navigate])

    // Wait for Firebase authentication
    if (loading) {
        return (
            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <p className="py-20 text-center text-sm text-[#6D695F]">
                    Checking sign-in status...
                </p>
            </main>
        )
    }

    // Prevent checkout content appearing before redirect
    if (!user) {
        return null
    }

    // Empty Bag Protection
    if (cartItems.length === 0) {
        return (
            <>
                <TopNavBar />

                <main className="flex min-h-screen items-center justify-center bg-[#F6F1E8] px-6 pt-24">
                    <section className="mx-auto max-w-xl py-20 text-center">
                        <p className="mb-6 text-sm uppercase tracking-[0.16em] text-[#B97870]">
                            Bloom Atelier
                        </p>

                        <h1 className="font-serif text-4xl text-[#4D5943] md:text-3xl">
                            Your bag is empty.
                        </h1>

                        <p className="mt-6 text-sm leading-7 text-[#6D695F]">
                            Discover our collection of thoughtfully crafted
                            bridal florals.
                        </p>

                        <a
                            href="/"
                            className="mt-10 inline-block bg-[#4D5943] px-8 py-4 text-xs uppercase tracking-[0.16em] text-[#F6F1E8] transition-colors duration-300 hover:bg-[#394532]"
                        >
                            Continue Shopping
                        </a>
                    </section>
                </main>

                <Footer />
            </>
        )
    }

    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">

                    {/* Page Heading */}
                    <p className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                        Checkout
                    </p>

                    {/* Development-only test product */}
                    {import.meta.env.DEV && (
                        <button
                            type="button"
                            onClick={() =>
                                addToCart({
                                    pid: 1,
                                    name: 'Wisteria Waltz',
                                    price: 1480,
                                    imageUrl: '/images/product01.png',
                                    quantity: 1,
                                })
                            }
                            className="mt-6 border border-dashed border-[#B97870] px-4 py-2 text-xs text-[#B97870] hover:bg-[#B97870]/10"
                        >
                            + Add Test Bouquet (Dev Only)
                        </button>
                    )}

                    {/* Two-column checkout layout */}
                    <div className="mt-12 grid gap-12 lg:grid-cols-2">

                        {/* LEFT: Customer & Delivery Details */}
                        <div>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                Customer & Delivery Details
                            </h2>

                            <form
                                id="checkout-form"
                                noValidate
                                onSubmit={async (e) => {
                                    e.preventDefault()

                                    if (isSubmitting || orderPrepared) {
                                        return
                                    }

                                    // Read checkout form fields
                                    const formData =
                                        new FormData(e.currentTarget)

                                    const values: CheckoutDetails = {
                                        fullName: String(
                                            formData.get('fullName') ?? ''
                                        ),
                                        email: String(
                                            formData.get('email') ?? ''
                                        ),
                                        phone: String(
                                            formData.get('phone') ?? ''
                                        ),
                                        address: String(
                                            formData.get('address') ?? ''
                                        ),
                                        deliveryDate: String(
                                            formData.get('deliveryDate') ?? ''
                                        ),
                                    }

                                    // Validate checkout information
                                    const errors = validateCheckoutForm(
                                        values,
                                        minDeliveryDate
                                    )

                                    setFormErrors(errors)

                                    if (Object.keys(errors).length > 0) {
                                        return
                                    }

                                    // Backend Checkout
                                    if (backendCheckoutEnabled) {
                                        setIsSubmitting(true)
                                        setSubmitError('')

                                        try {
                                            // Sync Bag and create a PREPARE transaction
                                            await prepareCheckoutOrder(
                                                cartItems,
                                                values
                                            )

                                            // Prevent duplicate submissions
                                            setOrderPrepared(true)

                                            // Navigate only after the backend request succeeds
                                            void navigate({
                                                to: '/order-confirmation',
                                                state: (prev) => ({
                                                    ...prev,
                                                    checkoutCompleted: true,
                                                }),
                                            })

                                        } catch (error) {
                                            console.error(
                                                'Checkout API error:',
                                                error
                                            )

                                            setSubmitError(
                                                'Unable to confirm the order request. ' +
                                                'Please check its status before trying again. ' +
                                                'No payment has been processed.'
                                            )

                                        } finally {
                                            setIsSubmitting(false)
                                        }

                                        return
                                    }

                                    // Original Development Demo Checkout
                                    navigate({
                                        to: '/order-confirmation',
                                        state: (prev) => ({
                                            ...prev,
                                            checkoutCompleted: true,
                                        }),
                                    })
                                }}
                            >
                                <div className="mt-8 space-y-6">

                                    {/* Full Name */}
                                    <div>
                                        <label
                                            htmlFor="fullName"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Full Name *
                                        </label>

                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder=" "
                                            autoComplete="name"
                                            required
                                            onChange={(e) => {
                                                if (
                                                    e.target.value.trim() &&
                                                    formErrors.fullName
                                                ) {
                                                    setFormErrors((prev) => ({
                                                        ...prev,
                                                        fullName: undefined,
                                                    }))
                                                }
                                            }}
                                            aria-invalid={Boolean(
                                                formErrors.fullName
                                            )}
                                            aria-describedby={
                                                formErrors.fullName
                                                    ? 'fullName-error'
                                                    : undefined
                                            }
                                            className={`w-full border bg-transparent px-4 py-3 text-sm text-[#24231F] outline-none ${
                                                formErrors.fullName
                                                    ? 'border-[#B97870] focus:border-[#B97870]'
                                                    : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                            }`}
                                        />

                                        {formErrors.fullName && (
                                            <p
                                                id="fullName-error"
                                                role="alert"
                                                className="mt-2 text-xs text-[#B97870]"
                                            >
                                                {formErrors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Address */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Email Address *
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder=" "
                                            autoComplete="email"
                                            required
                                            onChange={(e) => {
                                                const email =
                                                    e.target.value.trim()

                                                const isValidEmail =
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                                        email
                                                    )

                                                if (
                                                    isValidEmail &&
                                                    formErrors.email
                                                ) {
                                                    setFormErrors((prev) => ({
                                                        ...prev,
                                                        email: undefined,
                                                    }))
                                                }
                                            }}
                                            aria-invalid={Boolean(
                                                formErrors.email
                                            )}
                                            aria-describedby={
                                                formErrors.email
                                                    ? 'email-error'
                                                    : undefined
                                            }
                                            className={`w-full border bg-transparent px-4 py-3 text-sm text-[#24231F] outline-none ${
                                                formErrors.email
                                                    ? 'border-[#B97870] focus:border-[#B97870]'
                                                    : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                            }`}
                                        />

                                        {formErrors.email && (
                                            <p
                                                id="email-error"
                                                role="alert"
                                                className="mt-2 text-xs text-[#B97870]"
                                            >
                                                {formErrors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Phone Number *
                                        </label>

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder=" "
                                            autoComplete="tel"
                                            required
                                            onChange={(e) => {
                                                if (
                                                    e.target.value.trim() &&
                                                    formErrors.phone
                                                ) {
                                                    setFormErrors((prev) => ({
                                                        ...prev,
                                                        phone: undefined,
                                                    }))
                                                }
                                            }}
                                            aria-invalid={Boolean(
                                                formErrors.phone
                                            )}
                                            aria-describedby={
                                                formErrors.phone
                                                    ? 'phone-error'
                                                    : undefined
                                            }
                                            className={`w-full border bg-transparent px-4 py-3 text-sm text-[#24231F] outline-none ${
                                                formErrors.phone
                                                    ? 'border-[#B97870] focus:border-[#B97870]'
                                                    : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                            }`}
                                        />

                                        {formErrors.phone && (
                                            <p
                                                id="phone-error"
                                                role="alert"
                                                className="mt-2 text-xs text-[#B97870]"
                                            >
                                                {formErrors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Delivery Address */}
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Delivery Address *
                                        </label>

                                        <textarea
                                            id="address"
                                            name="address"
                                            placeholder=" "
                                            rows={3}
                                            autoComplete="street-address"
                                            required
                                            onChange={(e) => {
                                                if (
                                                    e.target.value.trim() &&
                                                    formErrors.address
                                                ) {
                                                    setFormErrors((prev) => ({
                                                        ...prev,
                                                        address: undefined,
                                                    }))
                                                }
                                            }}
                                            aria-invalid={Boolean(
                                                formErrors.address
                                            )}
                                            aria-describedby={
                                                formErrors.address
                                                    ? 'address-error'
                                                    : undefined
                                            }
                                            className={`w-full resize-none border bg-transparent px-4 py-3 text-sm text-[#24231F] outline-none ${
                                                formErrors.address
                                                    ? 'border-[#B97870] focus:border-[#B97870]'
                                                    : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                            }`}
                                        />

                                        {formErrors.address && (
                                            <p
                                                id="address-error"
                                                role="alert"
                                                className="mt-2 text-xs text-[#B97870]"
                                            >
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>

                                    {/* Preferred Delivery Date */}
                                    <div className="min-w-0">
                                        <label
                                            htmlFor="deliveryDate"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Preferred Delivery Date *
                                        </label>

                                        <div className={`relative min-w-0 overflow-hidden border px-4 py-3 focus-within:border-[#4D5943] sm:overflow-visible sm:border-0 sm:p-0 ${
                                                formErrors.deliveryDate
                                                    ? 'border-[#B97870] focus-within:border-[#B97870]'
                                                    : 'border-[#D8D2C7]'
                                            }`}>
                                            <input
                                                id="deliveryDate"
                                                name="deliveryDate"
                                                type="date"
                                                min={minDeliveryDate}
                                                required
                                                onChange={(e) => {
                                                    const date = e.target.value

                                                    if (
                                                        date &&
                                                        date >= minDeliveryDate &&
                                                        formErrors.deliveryDate
                                                    ) {
                                                        setFormErrors((prev) => ({
                                                            ...prev,
                                                            deliveryDate: undefined,
                                                        }))
                                                    }
                                                }}
                                                aria-invalid={Boolean(
                                                    formErrors.deliveryDate
                                                )}
                                                aria-describedby={
                                                    formErrors.deliveryDate
                                                        ? 'deliveryDate-error'
                                                        : undefined
                                                }
                                                className={`block box-border w-full min-w-0 max-w-full border-0 bg-transparent p-0 text-base text-[#4D5943] outline-none [color-scheme:light] sm:border sm:px-4 sm:py-3 sm:text-sm ${
                                                    formErrors.deliveryDate
                                                        ? 'border-[#B97870] focus:border-[#B97870]'
                                                        : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                                }`}
                                            />
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4D5943] sm:hidden"
                                            >
                                                <rect x="3" y="5" width="18" height="16" rx="1" />
                                                <path d="M7 3v4M17 3v4M3 10h18" />
                                            </svg>
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-[#6D695F] sm:hidden">
                                            Delivery is available from tomorrow onwards.
                                        </p>

                                        {formErrors.deliveryDate && (
                                            <p
                                                id="deliveryDate-error"
                                                role="alert"
                                                className="mt-2 text-xs text-[#B97870]"
                                            >
                                                {formErrors.deliveryDate}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    disabled={
                                        cartItems.length === 0 ||
                                        isSubmitting ||
                                        orderPrepared
                                    }
                                    className="mt-8 w-full border border-[#4D5943] bg-[#4D5943] px-6 py-4 text-sm uppercase tracking-[0.16em] text-[#F6F1E8] transition-colors duration-300 enabled:hover:bg-[#F6F1E8] enabled:hover:text-[#4D5943] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isSubmitting
                                        ? 'Preparing Order...'
                                        : orderPrepared
                                            ? 'Order Request Prepared'
                                            : 'Place Order'}
                                </button>

                                {submitError && (
                                    <p
                                        role="alert"
                                        className="mt-4 text-xs leading-6 text-[#B97870]"
                                    >
                                        {submitError}
                                    </p>
                                )}

                                {orderPrepared && (
                                    <p
                                        role="status"
                                        className="mt-4 text-xs leading-6 text-[#4D5943]"
                                    >
                                        Your order request has been prepared.
                                        No payment has been processed.
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* RIGHT: Order Summary */}
                        <div className="self-start border border-[#D8D2C7] p-6 md:p-8">
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="mt-8 space-y-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.pid}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={`${item.name} bouquet`}
                                            className="h-20 w-20 shrink-0 object-contain"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="font-serif text-lg text-[#4D5943]">
                                                {item.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[#6D695F]">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="text-sm text-[#24231F]">
                                            HK${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Subtotal */}
                            <div className="mt-8 flex items-center justify-between border-t border-[#D8D2C7] pt-6">
                                <span className="text-sm font-medium text-[#24231F]">
                                    Subtotal
                                </span>

                                <span className="text-sm font-medium text-[#24231F]">
                                    HK${subtotal.toLocaleString()}
                                </span>
                            </div>

                            <p className="mt-4 text-xs text-[#6D695F]">
                                Delivery details will be confirmed before placing your order.
                            </p>

                            <p className="mt-3 text-xs font-semibold leading-5 text-[#4D5943]">
                                Same-day delivery is unavailable. The earliest available delivery date is tomorrow.
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
