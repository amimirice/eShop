import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

const navigationItems = ['Shop', 'New In', 'Our Story']


type TopNavBarProps = {
    transparentOnTop?: boolean
}

export default function TopNavBar({
                                      transparentOnTop = false,
                                  }: TopNavBarProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const showBackground =
        !transparentOnTop || isHovered || isScrolled || isMenuOpen

    const textColor = showBackground
        ? 'text-[#24231F]'
        : 'text-white'

    const logoColor = showBackground
        ? 'text-[#4D5943]'
        : 'text-white'

    return (
        <header
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
                showBackground
                    ? 'border-[#4D5943]/20 bg-[#F6F1E8]/95 backdrop-blur-md'
                    : 'border-transparent bg-transparent'
            }`}
        >
            <nav
                aria-label="Main navigation"
                className="mx-auto grid h-20 w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-0 lg:px-12"
            >
                {/* Left desktop navigation */}
                <div className="hidden items-center gap-7 justify-self-start md:flex">
                    {navigationItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className={`relative py-2 text-sm tracking-wide transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B97870] after:transition-all after:duration-300 hover:text-[#B97870] hover:after:w-full ${textColor}`}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Logo */}

                <a
                    href="/"
                    className={`justify-self-start whitespace-nowrap font-serif text-xl tracking-[0.03em] transition-colors duration-300 sm:text-2xl md:justify-self-center md:text-3xl md:tracking-[0.08em] ${logoColor}`}
                >
                    Bloom Atelier
                </a>

                {/* Right desktop actions & mobile controls */}

                <div className="flex items-center justify-self-end gap-2 sm:gap-4">

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-5 md:flex">

                        {/* Search Icon */}
                        <button
                            type="button"
                            aria-label="Search products"
                            title="Search"
                            className={`transition-colors hover:text-[#B97870] ${textColor}`}
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>

                        {/* Contact Us - Location Icon */}
                        <Link
                            to="/contact"
                            aria-label="Contact Us"
                            title="Contact Us"
                            className={`transition-colors hover:text-[#B97870] ${textColor}`}
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                        </Link>

                        {/* Account */}
                        <button
                            type="button"
                            className={`text-sm tracking-wide transition-colors hover:text-[#B97870] ${textColor}`}
                        >
                            Account
                        </button>

                    </div>

                    {/* Bag - Desktop & Mobile */}
                    <button
                        type="button"
                        className={`whitespace-nowrap text-sm tracking-wide transition-colors hover:text-[#B97870] ${textColor}`}
                    >
                        Bag (0)
                    </button>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-1 transition-colors hover:text-[#B97870] md:hidden ${logoColor}`}
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
                                <path
                                    strokeLinecap="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
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
                                <path
                                    strokeLinecap="round"
                                    d="M4 7h16M4 12h16M4 17h16"
                                />
                            </svg>
                        )}
                    </button>

                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
                    isMenuOpen
                        ? 'max-h-80 border-[#4D5943]/15 opacity-100'
                        : 'pointer-events-none max-h-0 border-transparent opacity-0'
                }`}
            >
                <div className="flex flex-col px-6 pb-6 pt-2">

                    {navigationItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            onClick={() => setIsMenuOpen(false)}
                            className="border-b border-[#4D5943]/15 py-4 text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                        >
                            {item}
                        </a>
                    ))}

                    <button
                        type="button"
                        className="pt-5 text-left text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                    >
                        Search
                    </button>

                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="pt-4 text-left text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                    >
                        Contact Us
                    </Link>

                    <button
                        type="button"
                        className="pt-4 text-left text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                    >
                        Account
                    </button>

                </div>
            </div>
        </header>
    )
}