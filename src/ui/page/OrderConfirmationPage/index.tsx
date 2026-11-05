
import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function OrderConfirmationPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const checkoutCompleted =
        location.state.checkoutCompleted === true

    useEffect(() => {
        if (
            location.pathname === '/order-confirmation' &&
            !checkoutCompleted
        ) {
            void navigate({
                to: '/checkout',
                replace: true,
            })
        }
    }, [location.pathname, checkoutCompleted, navigate])

    if (!checkoutCompleted) {
        return null
    }

    return (
        <>
            <TopNavBar />

            <main className="flex min-h-[100svh] items-center justify-center bg-[#F6F1E8] px-6 pt-20 md:min-h-screen md:pt-24">
                <section className="mx-auto max-w-xl py-8 text-center md:py-20">
                    <p className="mb-6 text-sm uppercase tracking-[0.16em] text-[#B97870]">
                        Bloom Atelier
                    </p>

                    <h1 className="font-serif text-4xl text-[#4D5943] md:text-5xl">
                        Thank you for your order.
                    </h1>

                    <p className="text-balance mt-6 text-sm leading-7 text-[#6D695F]">
                        {import.meta.env.PROD
                            ? 'Your order request has been recorded with PREPARE status as part of this portfolio demonstration.'
                            : 'Your checkout details have been submitted in this demo experience.'}
                    </p>

                    <p className="mt-3 text-xs leading-6 text-[#6D695F]">
                        Demo only — no payment has been processed
                        and no delivery will be arranged.
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
