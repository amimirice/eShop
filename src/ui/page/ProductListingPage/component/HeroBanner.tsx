
import { useEffect, useState } from 'react'

const bannerImages = [
    {
        id: 1,
        imageUrl: '/images/banner01.png',
        alt: 'Flower Shop',
        objectPosition: 'top',
    },
    {
        id: 2,
        imageUrl: '/images/banner02.jpg',
        alt: 'Making bridal bouquet',
        objectPosition: 'top',
    },
    {
        id: 3,
        imageUrl: '/images/banner03.jpg',
        alt: 'Romantic bridal bouquet with soft pastel flowers',
        objectPosition: 'center-left',
    },
]

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                (prev + 1) % bannerImages.length
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section
            aria-label="Bloom Atelier featured collection"
            className="relative h-[85svh] min-h-[520px] overflow-hidden bg-[#4D5943] md:h-[100svh]"
        >
            {/* Banner images */}
            {bannerImages.map((banner, index) => (
                <div
                    key={banner.id}
                    aria-hidden={index !== currentSlide}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide
                            ? 'opacity-100'
                            : 'opacity-0'
                    }`}
                >
                    <img
                        src={banner.imageUrl}
                        alt={banner.alt}
                        className="h-full w-full object-cover md:object-center"
                        style={{ objectPosition: banner.objectPosition }}
                    />
                </div>
            ))}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Dark gradient behind navbar */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />

            {/* Banner content */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-6 pb-10 text-white lg:px-12 lg:pb-16">

                <p className="text-sm uppercase tracking-[0.2em]">
                    Bloom Atelier by Amy Rice
                </p>

                <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:max-w-none lg:text-6xl">
                    A love story told in flowers.
                </h1>

                <p className="mt-1 max-w-lg text-sm leading-7 text-white/90 sm:text-base">
                    Crafted bridal florals, thoughtfully designed to celebrate your story.
                </p>


                <a
                    href="#products"
                    className="mt-8 inline-flex w-fit items-center justify-center border border-white px-8 py-3 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white hover:text-[#4D5943]"
                >
                    EXPLORE THE COLLECTION
                </a>

                {/* Slide indicators */}
                <div className="mt-10 flex items-center gap-3">
                    {bannerImages.map((banner, index) => (
                        <button
                            key={banner.id}
                            type="button"
                            aria-label={`Show banner ${index + 1}`}
                            aria-current={index === currentSlide ? 'true' : undefined}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'w-10 bg-white'
                                    : 'w-5 bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}