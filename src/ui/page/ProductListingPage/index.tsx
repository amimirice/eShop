import { useEffect } from 'react'
import TopNavBar from '../../component/TopNavBar'
import ProductCardContainer from './component/ProductCardContainer'
import HeroBanner from './component/HeroBanner'
import Footer from '../../component/Footer'

export default function ProductListingPage() {
    useEffect(() => {
        if (window.location.hash !== '#products') return

        const scrollToProducts = () => {
            document.getElementById('products')?.scrollIntoView({
                behavior: 'instant',
                block: 'start',
            })
        }

        // Position the collection after React renders
        const frameId = requestAnimationFrame(scrollToProducts)

        // Correct the position after browser navigation settles
        const timerId = window.setTimeout(scrollToProducts, 400)

        // Handle full page loads and browser history restoration
        window.addEventListener('load', scrollToProducts)
        window.addEventListener('pageshow', scrollToProducts)

        return () => {
            cancelAnimationFrame(frameId)
            window.clearTimeout(timerId)
            window.removeEventListener('load', scrollToProducts)
            window.removeEventListener('pageshow', scrollToProducts)
        }
    }, [])

    return (

        <>
            <TopNavBar transparentOnTop />

            <main className="min-h-screen bg-[#F6F1E8]">

                <HeroBanner />

                <section id="products" className="scroll-mt-20 pb-16 pt-24">
                    <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
                        <ProductCardContainer />
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}