import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function ContactUsPage() {
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-12 md:py-16">

                {/* Page Heading */}
                    <p className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                        Contact Us
                    </p>
                    {/*
                    <h1 className="mt-3 font-serif text-3xl text-[#4D5943] md:text-4xl">
                        Contact Us
                    </h1>
                    */}

                    <p className="mt-6 max-w-xl text-sm leading-7 text-[#6D695F]">
                        For bridal bouquet enquiries or special floral requests,
                        we'd love to hear from you.
                    </p>

                    {/* Contact Information */}
                    <div className="mt-16 grid gap-12 border-t border-[#D8D2C7] pt-12 md:grid-cols-2 md:gap-20">

                        {/* Store Details */}
                        <div>
                            <p className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                                Store Address
                            </p>
                                {/*
                          <h2 className="font-serif text-xl text-[#4D5943]">
                                Store Address
                            </h2>
                            */}

                            <p className="mt-6 text-sm leading-7 text-[#6D695F]">
                                Shop 212, P1 ifc mall,
                                <br />
                                8 Finance Street,
                                <br />
                                Central, Hong Kong.
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=ifc+mall+Hong+Kong"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block border-b border-[#4D5943] pb-1 text-xs text-[#4D5943] transition-colors hover:border-[#B97870] hover:text-[#B97870]"
                            >
                                View on Google Maps ↗
                            </a>

                            <div className="mt-8 space-y-3 text-sm text-[#6D695F]">
                                <p>T: +852 6234 5678</p>
                                <p>E: amyrice@bloomatelier.com</p>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <p className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                                Operating Hours
                            </p>
                            {/* } <h2 className="font-serif text-xl text-[#4D5943]">
                                Operating Hours
                            </h2>
                            */}

                            <div className="mt-6 space-y-5 text-sm text-[#6D695F]">
                                <div>
                                    <p className="text-[#4D5943]">
                                        Monday to Friday
                                    </p>
                                    <p className="mt-1">
                                        11:00 – 19:30
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[#4D5943]">
                                        Saturday, Sunday & Public Holidays
                                    </p>
                                    <p className="mt-1">
                                        11:00 – 20:00
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="mt-16 text-xs leading-6 text-[#6D695F]">
                        Portfolio demonstration website.
                        Store location and contact details are illustrative.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    )
}


{/*
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

                </div>

            </main>

            <Footer />
        </>
    )
}
*/}