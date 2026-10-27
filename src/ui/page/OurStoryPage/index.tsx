import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'

export default function OurStoryPage() {
    return (
    <>
    <TopNavBar transparentOnTop />

    <main className="bg-[#F6F1E8]">

{/* Our Story Banner */}
<section className="relative flex min-h-[70svh] items-end overflow-hidden md:min-h-[70svh]">

{/* Banner Image */}
<img
src="/images/banner05.jpg"
alt="Bloom Atelier bridal flowers"
className="absolute inset-0 h-full w-full object-cover"
/>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25" />

{/* Banner Text */}
<div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:px-12 md:pb-24">


    <p className="text-sm uppercase tracking-[0.2em] text-white md:text-base">
        Bloom Atelier by Amy Rice
    </p>


    <h1 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-white md:text-6xl">
        Our Story
    </h1>


</div>
</section>

{/* Brand Story */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-12 md:py-28">

            <div className="mx-auto max-w-2xl text-left">

<p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
The Bloom Atelier Story
</p>

<h2 className="mt-6 font-serif text-3xl leading-tight text-[#4D5943] md:text-4xl">
Inspired by love, guided by nature.
</h2>

<div className="mt-10 space-y-6 text-sm leading-8 text-[#6D695F]">

<p>
We believe that flowers have a beautiful
way of expressing what words sometimes cannot.
</p>

<p>
At Bloom Atelier, each bridal bouquet
is thoughtfully designed to celebrate
love, individuality, and the moments
that stay with us forever.
</p>

<p>
Inspired by nature's quiet beauty,
we bring together delicate textures,
romantic colours, and carefully
selected blooms to create floral
arrangements that feel personal
and timeless.
</p>

<p>
Because every love story is unique,
and every bouquet should be too.
</p>

</div>

</div>
</section>

</main>

<Footer />
</>
)
}
