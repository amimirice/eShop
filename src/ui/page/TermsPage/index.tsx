
import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function TermsPage() {
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">

                    {/* Page Heading */}
                    <h1 className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                        Terms & Conditions
                    </h1>

                    <p className="mt-8 max-w-6xl text-sm leading-7 text-[#6D695F]">
                        Welcome to Bloom Atelier. Please read the following
                        terms before placing an order.
                    </p>

                    {/* Demo Notice */}
                    <p className="mt-4 max-w-6xl text-xs leading-6 text-[#6D695F]">
                        This is a portfolio demonstration website.
                        No real orders, payments or deliveries are processed.
                        The policies below are illustrative only.
                    </p>

                    {/* Terms Content */}
                    <div className="mt-12 max-w-6xl space-y-10 border-t border-[#D8D2C7] pt-10">

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                1. Products & Floral Variations
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                Each bridal bouquet is thoughtfully designed
                                using fresh seasonal flowers. Flower varieties,
                                colours and arrangements may vary slightly
                                depending on seasonal availability.
                                Any substitutions would aim to preserve
                                the overall style and quality of the bouquet.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                2. Pricing & Orders
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                All prices are displayed in Hong Kong Dollars
                                (HKD). Product availability and pricing
                                are subject to change without prior notice.
                                Orders would be confirmed only after
                                acceptance by the store.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                3. Delivery
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                Customers may select a preferred delivery
                                date during checkout. Delivery dates and
                                arrangements would be subject to availability
                                and confirmation. While every effort would
                                be made to deliver on the requested date,
                                unforeseen circumstances may cause delays.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                4. Changes & Cancellations
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                As an illustrative policy, requests to
                                change or cancel an order should be made
                                at least 72 hours before the scheduled
                                delivery date. Changes may not be possible
                                once floral preparation has begun.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                5. Returns & Refunds
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                Due to the perishable nature of fresh flowers,
                                returns for a change of mind would generally
                                not be accepted. For damaged or incorrect
                                items, customers should contact the store
                                within 24 hours of delivery, including
                                photographs where appropriate.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl text-[#4D5943]">
                                6. Contact
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#6D695F]">
                                For enquiries regarding these terms,
                                please contact Bloom Atelier at
                                amyrice@bloomatelier.com.
                            </p>
                        </section>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
