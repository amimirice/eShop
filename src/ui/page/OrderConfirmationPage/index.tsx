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


            <main className="flex min-h-screen items-center justify-center bg-[#F6F1E8] px-6 pt-24">
                <section className="mx-auto max-w-xl py-20 text-center">
                    <p className="mb-6 text-sm uppercase tracking-[0.16em] text-[#B97870]">
                        Bloom Atelier
                    </p>


                    <h1 className="font-serif text-4xl text-[#4D5943] md:text-5xl">
                        Thank you for your order.
                    </h1>


                    <p className="mt-6 text-sm leading-7 text-[#6D695F]">
                        Your checkout details have been received
                        in this demo experience.
                    </p>


                    <p className="mt-3 text-xs text-[#6D695F]">
                        Demo only — no real order has been placed.
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