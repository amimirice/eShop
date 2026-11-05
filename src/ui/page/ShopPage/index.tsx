import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'
import ProductCardContainer from '../ProductListingPage/component/ProductCardContainer'

export default function ShopPage() {
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pt-20">
                <section
                    id="products"
                    className="pb-16 pt-16"
                >
                    <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
                        <ProductCardContainer />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
