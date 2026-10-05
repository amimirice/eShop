
import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function ContactUsPage() {
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pb-20 pt-36">

                <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">

                    <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                        Bloom Atelier
                    </p>

                    <h1 className="mt-3 font-serif text-5xl tracking-tight text-[#4D5943]">
                        Contact Us
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-[#6D695F]">
                        Have a question about our bridal bouquets?
                        We'd love to hear from you.
                    </p>

                    {/* Contact information will be added here */}

                </div>

            </main>

            <Footer />
        </>
    )
}