import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import ProductSearchPanel from './ProductSearchPanel'

const navigationItems = [
    { label: 'Shop', to: '/' },
    { label: 'Our Story', to: '/our-story' },
]


type TopNavBarProps = {
    transparentOnTop?: boolean
}

export default function TopNavBar({
                                      transparentOnTop = false,
                                  }: TopNavBarProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
    const { cartItems } = useCart()
    const { user, logout } = useAuth()
    const bagCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )


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

    // Close the mobile menu when switching to desktop view
    useEffect(() => {
        const desktopMediaQuery = window.matchMedia('(min-width: 768px)')

        const handleBreakpointChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setIsMenuOpen(false)
            }
        }

        desktopMediaQuery.addEventListener('change', handleBreakpointChange)

        return () => {
            desktopMediaQuery.removeEventListener('change', handleBreakpointChange)
        }
    }, [])

    const showBackground =
        !transparentOnTop ||
        isHovered ||
        isScrolled ||
        isMenuOpen ||
        isSearchOpen ||
        isAccountMenuOpen


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
                <div className="hidden items-center gap-5 justify-self-start md:flex">
                {navigationItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`relative py-2 text-sm tracking-wide transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B97870] after:transition-all after:duration-300 hover:text-[#B97870] hover:after:w-full ${textColor}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                </div>

                {/* Logo */}

                <Link
                    to="/"
                    className={`justify-self-start whitespace-nowrap font-serif text-xl tracking-[0.03em] transition-colors duration-300 sm:text-2xl md:justify-self-center md:text-3xl md:tracking-[0.08em] ${logoColor}`}
                >
                    Bloom Atelier
                </Link>


                {/* Right desktop actions & mobile controls */}

                <div className="flex items-center justify-self-end gap-4 sm:gap-5">

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-5 md:flex">

                        {/* Search Icon */}
                        <button
                            type="button"
                            aria-label="Search products"
                            aria-expanded={isSearchOpen}
                            title="Search"
                            onClick={() => setIsSearchOpen((prev) => !prev)}
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
                        <div className="relative">
                            {user ? (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Account menu"
                                        aria-expanded={isAccountMenuOpen}
                                        onClick={() => {
                                            setIsSearchOpen(false)
                                            setIsAccountMenuOpen((prev) => !prev)
                                        }}
                                        className={`text-sm tracking-wide transition-colors hover:text-[#B97870] ${textColor}`}
                                    >
                                        Account
                                    </button>

                                    {isAccountMenuOpen && (
                                        <div className="absolute right-0 top-full z-50 mt-5 w-64 border border-[#D8D2C7] bg-[#F6F1E8] p-5 shadow-lg">
                                            <p className="text-xs uppercase tracking-[0.12em] text-[#B97870]">
                                                Signed in as
                                            </p>

                                            <p className="mt-2 break-all text-sm text-[#4D5943]">
                                                {user.email ?? 'Google Account'}
                                            </p>

                                            <div className="mt-5 border-t border-[#D8D2C7] pt-4">
                                                <button
                                                    type="button"


                                                    onClick={async () => {
                                                        try {
                                                            await logout()
                                                            setIsAccountMenuOpen(false)
                                                        } catch (error) {
                                                            console.error('Failed to sign out:', error)
                                                        }
                                                    }}

                                                    className="text-sm text-[#4D5943] transition-colors hover:text-[#B97870]"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    aria-label="Sign In"
                                    className={`text-sm tracking-wide transition-colors hover:text-[#B97870] ${textColor}`}
                                >
                                    Account
                                </Link>
                            )}
                        </div>


                    </div>

                    {/* Bag - Desktop & Mobile */}
                    <Link
                        to="/bag"
                        className={`whitespace-nowrap text-sm tracking-wide transition-colors hover:text-[#B97870] ${textColor}`}
                    >
                        Bag ({bagCount})
                    </Link>


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
                className={`overflow-y-auto border-t transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
                    isMenuOpen
                        ? 'max-h-[80svh] border-[#4D5943]/15 opacity-100'
                        : 'pointer-events-none max-h-0 border-transparent opacity-0'
                }`}
            >
                <div className="flex flex-col px-6 pb-6 pt-2">

                    {navigationItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            className="border-b border-[#4D5943]/15 py-4 text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                        >
                            {item.label}
                        </Link>
                    ))}


                    <button
                        type="button"
                        onClick={() => {
                            setIsMenuOpen(false)
                            setIsSearchOpen(true)
                        }}
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


                    {user ? (
                        <div className="pt-4">
                            <p className="text-base text-[#24231F]">
                                Account
                            </p>

                            <p className="mt-2 break-all text-xs text-[#6D695F]">
                                {user.email ?? 'Google Account'}
                            </p>

                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await logout()
                                        setIsMenuOpen(false)
                                    } catch (error) {
                                        console.error('Failed to sign out:', error)
                                    }
                                }}
                                className="mt-4 text-left text-base text-[#4D5943] transition-colors hover:text-[#B97870]"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Sign In"
                            className="pt-4 text-left text-base text-[#24231F] transition-colors hover:text-[#B97870]"
                        >
                            Account
                        </Link>
                    )}



                </div>
            </div>

            {/* Product Search Panel */}
            {isSearchOpen && (
                <ProductSearchPanel
                    onClose={() => setIsSearchOpen(false)}
                />
            )}
        </header>
    )
}
