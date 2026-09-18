import TopNavBar from '../../component/TopNavBar'
import ProductCardContainer from "./component/ProductCardContainer";


export default function ProductListingPage() {
    return (
        <>
            <TopNavBar />
            <main className="min-h-screen bg-[#F6F1E8] px-6 pb-16 pt-36 lg:px-12">
                <ProductCardContainer />
            </main>
        </>
    )
}