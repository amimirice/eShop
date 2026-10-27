import { useEffect } from 'react'
import TopNavBar from '../../component/TopNavBar'
import ProductCardContainer from './component/ProductCardContainer'
import HeroBanner from './component/HeroBanner'
import Footer from '../../component/Footer'

export default function ProductListingPage() {
    useEffect(() => {
        if (window.location.hash !== '#products') return

        const frameId = requestAnimationFrame(() => {
            document.getElementById('products')?.scrollIntoView({
                behavior: 'instant',
                block: 'start',
            })
        })

        return () => cancelAnimationFrame(frameId)
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