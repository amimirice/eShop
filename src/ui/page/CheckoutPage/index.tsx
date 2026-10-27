import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'

import {
    validateCheckoutForm,
    type CheckoutFormErrors,
} from '../../../data/checkoutValidation'

export default function CheckoutPage() {
    const { cartItems, addToCart } = useCart()
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    // Store validation errors for individual fields
    const [formErrors, setFormErrors] = useState<CheckoutFormErrors>({})

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

    // Wait for Firebase to check authentication
    if (loading) {
        return (
            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <p className="py-20 text-center text-sm text-[#6D695F]">
                    Checking sign-in status...
                </p>
            </main>
        )
    }

    // Prevent checkout content from appearing before redirect
    if (!user) {
        return null
    }

    // Show an empty bag page when there are no cart items
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
                                onSubmit={(e) => {
                                    e.preventDefault()

                                    // Read all checkout fields
                                    const formData = new FormData(e.currentTarget)

                                    const values = {
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

                                    // Stop submission if any field is invalid
                                    if (Object.keys(errors).length > 0) {
                                        return
                                    }

                                    // Demo checkout only.
                                    // No real order is created yet.
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
                                            aria-invalid={Boolean(formErrors.fullName)}
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
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

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
                                            aria-invalid={Boolean(formErrors.email)}
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
                                            aria-invalid={Boolean(formErrors.phone)}
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
                                            aria-invalid={Boolean(formErrors.address)}
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
                                    <div>
                                        <label
                                            htmlFor="deliveryDate"
                                            className="mb-2 block text-sm text-[#4D5943]"
                                        >
                                            Preferred Delivery Date *
                                        </label>

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
                                            aria-invalid={Boolean(formErrors.deliveryDate)}
                                            aria-describedby={
                                                formErrors.deliveryDate
                                                    ? 'deliveryDate-error'
                                                    : undefined
                                            }
                                            className={`w-full border bg-transparent px-4 py-3 text-sm text-[#4D5943] outline-none [color-scheme:light] ${
                                                formErrors.deliveryDate
                                                    ? 'border-[#B97870] focus:border-[#B97870]'
                                                    : 'border-[#D8D2C7] focus:border-[#4D5943]'
                                            }`}
                                        />

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
                                    disabled={cartItems.length === 0}
                                    className="mt-8 w-full border border-[#4D5943] bg-[#4D5943] px-6 py-4 text-sm uppercase tracking-[0.16em] text-[#F6F1E8] transition-colors duration-300 enabled:hover:bg-[#F6F1E8] enabled:hover:text-[#4D5943] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Place Order
                                </button>
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
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

