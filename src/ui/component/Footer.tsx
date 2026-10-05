export default function Footer() {
    return (
        <footer className="border-t border-[#4D5943]/20 bg-[#F6F1E8]">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
                <div>
                    <p className="font-serif text-2xl tracking-[0.08em] text-[#4D5943]">
                        Bloom Atelier
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#6D695F] lg:whitespace-nowrap">
                        Crafted bridal florals, thoughtfully designed to celebrate your story.
                    </p>
                </div>

                <p className="text-sm text-[#6D695F]">
                    © {new Date().getFullYear()} Bloom Atelier by Amy Rice. All rights reserved.
                </p>
            </div>
        </footer>
    )
}