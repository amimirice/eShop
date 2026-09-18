import { useState } from 'react'

const navigationItems = ['Shop', 'Occasions', 'Our Story']

export default function TopNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[#4D5943]/20 bg-[#F6F1E8]/90 backdrop-blur-md">
            <nav
                aria-label="Main navigation"
                className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-12"
            >
                {/* left desktop navigation */}
                <div className="hidden items-center gap-7 justify-self-start md:flex">
                    {navigationItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="relative py-2 text-sm tracking-wide text-[#24231F] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B97870] after:transition-all after:duration-300 hover:text-[#B97870] hover:after:w-full"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* logo */}
                <a
                    href="/"
                    className="justify-self-center font-serif text-2xl tracking-[0.08em] text-[#4D5943] sm:text-3xl"
                >
                    Bloom Atelier
                </a>

                {/* right desktop actions & mobile controls */}
                <div className="flex items-center justify-self-end gap-4">
                    <div className="hidden items-center gap-5 md:flex">
                        <button
                            type="button"
                            className="text-sm tracking-wide transition-colors hover:text-[#B97870]"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            className="text-sm tracking-wide transition-colors hover:text-[#B97870]"
                        >
                            Account
                        </button>
                    </div>

                    <button
                        type="button"
                        className="text-sm tracking-wide transition-colors hover:text-[#B97870]"
                    >
                        Bag (0)
                    </button>

                    <button
                        type="button"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 text-[#4D5943] transition-colors hover:text-[#B97870] md:hidden"
                    >
                        {isMenuOpen ? (
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* 手機展開 menu */}
            <div
                className={`overflow-hidden border-t border-[#4D5943]/15 transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
                    isMenuOpen
                        ? 'max-h-80 opacity-100'
                        : 'pointer-events-none max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col px-6 pb-6 pt-2">
                    {navigationItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            onClick={() => setIsMenuOpen(false)}
                            className="border-b border-[#4D5943]/15 py-4 text-lg text-[#24231F] transition-colors hover:text-[#B97870]"
                        >
                            {item}
                        </a>
                    ))}

                    <button
                        type="button"
                        className="pt-5 text-left text-lg text-[#24231F] transition-colors hover:text-[#B97870]"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        className="pt-4 text-left text-lg text-[#24231F] transition-colors hover:text-[#B97870]"
                    >
                        Account
                    </button>
                </div>
            </div>
        </header>
    )
}