import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../../context/AuthContext'
import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'


export default function LoginPage() {
    const { user, loading, loginWithGoogle, logout } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)


    const handleGoogleLogin = async () => {
        setError('')
        setIsSigningIn(true)


        try {
            await loginWithGoogle()
            await navigate({ to: '/checkout' })
        } catch (error) {
            console.error('Google login failed:', error)
            setError('Unable to sign in. Please try again.')
        } finally {
            setIsSigningIn(false)
        }
    }

    const handleLogout = async () => {
        setError('')


        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
            setError('Unable to sign out. Please try again.')
        }
    }


    return (
        <>
            <TopNavBar />


            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto max-w-md px-6 py-20 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#B97870]">
                        Welcome to Bloom Atelier
                    </p>


                    <h1 className="mt-5 font-serif text-3xl text-[#4D5943]">
                        {user ? 'My Account' : 'Sign In'}
                    </h1>


                    {loading ? (
                        <p className="mt-10 text-sm text-[#6D695F]">
                            Checking sign-in status...
                        </p>
                    ) : user ? (
                        <div className="mt-10 space-y-5">
                            <p className="text-sm text-[#4D5943]">
                                Signed in as {user.email}
                            </p>


                            <Link
                                to="/checkout"
                                className="block border border-[#4D5943] bg-[#4D5943] px-6 py-4 text-xs tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#4D5943]"
                            >
                                CONTINUE TO CHECKOUT
                            </Link>


                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-sm text-[#6D695F] underline underline-offset-4 transition-colors hover:text-[#B97870]"
                            >
                                Sign Out
                            </button>



                        </div>
                    ) : (
                        <div className="mt-10">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isSigningIn}
                                className="w-full border border-[#4D5943] bg-[#4D5943] px-6 py-4 text-xs tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-[#4D5943] disabled:opacity-50"
                            >
                                {isSigningIn ? 'SIGNING IN...' : 'CONTINUE WITH GOOGLE'}
                            </button>


                            {error && (
                                <p role="alert" className="mt-4 text-sm text-[#B97870]">
                                    {error}
                                </p>
                            )}
                        </div>
                    )}


                    <Link
                        to="/bag"
                        className="mt-8 inline-block text-sm text-[#6D695F] hover:text-[#4D5943]"
                    >
                        ← Back to Shopping Bag
                    </Link>
                </section>
            </main>


            <Footer />
        </>
    )
}