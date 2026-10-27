import { Link } from '@tanstack/react-router'
import { useCart } from '../../../context/CartContext'
import TopNavBar from '../../component/TopNavBar'
import Footer from '../../component/Footer'


export default function ShoppingBagPage() {
    const { cartItems, updateQuantity, removeFromCart } = useCart()


    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )


    return (
        <>
            <TopNavBar />


            <main className="min-h-screen bg-[#F6F1E8] pt-24">
                <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-12 md:py-16">
                    <p className="text-base uppercase tracking-[0.16em] text-[#B97870]">
                        Shopping Bag
                    </p>


                    {cartItems.length === 0 ? (
                        // EMPTY BAG
                        <div className="mt-10">
                            <p className="text-sm text-[#6D695F]">
                                Your bag is currently empty.
                            </p>


                            <Link
                                to="/"
                                className="mt-8 inline-block border border-[#4D5943] bg-[#4D5943] px-8 py-4 text-xs font-medium tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#4D5943]"
                            >
                                EXPLORE THE COLLECTION
                            </Link>
                        </div>
                    ) : (
                        // BAG WITH PRODUCTS
                        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">


                            {/* LEFT — Product Rows */}
                            <div className="min-w-0 space-y-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.pid}
                                        className="grid grid-cols-[100px_minmax(0,1fr)] gap-x-7 border-b border-[#D8D2C7] pb-6 md:grid-cols-[120px_minmax(0,1.5fr)_85px_140px_20px] md:items-center md:gap-x-4 xl:grid-cols-[140px_minmax(0,1fr)_100px_140px_24px] xl:gap-x-8"
                                    >

                                        {/* Product Image */}
                                        <Link
                                            to="/product/$pid"
                                            params={{ pid: String(item.pid) }}
                                            aria-label={`View ${item.name} details`}
                                            className="col-start-1 row-start-1 block"
                                        >
                                            <img
                                                src={item.imageUrl}
                                                alt={`${item.name} bouquet`}
                                                className="h-32 w-full object-contain transition-opacity duration-300 hover:opacity-80 md:h-40"
                                            />
                                        </Link>



                                        {/* Product Details */}
                                        <div className="col-start-2 row-start-1 flex min-w-0 flex-col justify-center gap-3 pr-7 md:contents">



                                            {/* Product Name */}
                                            <Link
                                                to="/product/$pid"
                                                params={{ pid: String(item.pid) }}
                                                className="group block w-fit"
                                            >
                                                <h2 className="font-serif text-lg leading-6 text-[#4D5943] transition-colors duration-300 group-hover:text-[#B97870] md:text-xl">
                                                    {item.name}
                                                </h2>
                                            </Link>

                                            {/* Price */}
                                            <p className="text-sm leading-6 text-[#6D695F]">
                                                HK${item.price.toLocaleString()}
                                            </p>


                                            {/* Quantity Selector */}
                                            <div className="flex w-fit items-center border border-[#D8D2C7]">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(item.pid, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                    className="px-3 py-2 text-[#4D5943] transition-colors hover:bg-[#EAE4DA] disabled:cursor-not-allowed disabled:opacity-30"
                                                >
                                                    −
                                                </button>


                                                <span className="min-w-8 text-center text-sm text-[#24231F]">
                                                    {item.quantity}
                                                </span>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(item.pid, item.quantity + 1)
                                                    }
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    className="px-3 py-2 text-[#4D5943] transition-colors hover:bg-[#EAE4DA]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>


                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.pid)}
                                            aria-label={`Remove ${item.name} from bag`}
                                            title="Remove"
                                            className="col-start-2 row-start-1 z-10 h-fit w-fit justify-self-end text-xl text-[#9B978E] transition-colors hover:text-[#B97870] md:col-start-5 md:row-start-1 md:justify-self-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}


                                {/* Continue Shopping — outside map() */}
                                <Link
                                    to="/"
                                    className="inline-block pt-4 text-sm text-[#4D5943] transition-colors hover:text-[#B97870]"
                                >
                                    ← Continue Shopping
                                </Link>
                            </div>


                            {/* RIGHT — Order Summary */}
                            <aside className="h-fit border border-[#D8D2C7] p-6">
                                <h2 className="font-serif text-2xl text-[#4D5943]">
                                    Order Summary
                                </h2>


                                <p className="mt-4 text-xs leading-5 text-[#6D695F]">
                                    Delivery details will be confirmed at checkout.
                                </p>


                                <div className="mt-6 border-t border-[#D8D2C7] pt-6">
                                    <div className="flex items-center justify-between text-sm font-medium text-[#24231F]">
                                        <span>Subtotal</span>
                                        <span>HK${subtotal.toLocaleString()}</span>
                                    </div>
                                </div>


                                <Link
                                    to="/checkout"
                                    className="mt-8 block w-full border border-[#4D5943] bg-[#4D5943] px-4 py-4 text-center text-xs font-medium tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#4D5943]"
                                >
                                    PROCEED TO CHECKOUT
                                </Link>

                            </aside>
                        </div>
                    )}
                </section>
            </main>


            <Footer />
        </>
    )
}


