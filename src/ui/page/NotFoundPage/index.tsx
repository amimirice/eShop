
import { Link } from '@tanstack/react-router'
import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function NotFoundPage() {
    return (
        <>
            <TopNavBar />

            <main className="min-h-screen bg-[#F6F1E8] px-6 pt-24">
                <section className="mx-auto max-w-xl py-20 text-center">

                    <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                        Bloom Atelier
                    </p>

                    <h1 className="mt-6 font-serif text-3xl text-[#4D5943] md:text-4xl">
                        Page not found.
                    </h1>

                    <p className="mt-6 text-sm leading-7 text-[#6D695F]">
                        The page you're looking for could not be found.
                    </p>

                    <Link
                        to="/"
                        className="mt-10 inline-block border border-[#4D5943] bg-[#4D5943] px-8 py-4 text-xs uppercase tracking-[0.16em] text-[#F6F1E8] transition-colors duration-300 hover:bg-[#F6F1E8] hover:text-[#4D5943]"
                    >
                        Explore the Collection
                    </Link>

                </section>
            </main>

            <Footer />
        </>
    )
}
