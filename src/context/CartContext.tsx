import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'


import type { CartItem } from '../data/cart.type'

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
    updateQuantity: (pid: number, quantity: number) => void
    removeFromCart: (pid: number) => void
    clearCart: () => void
}


const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('bloom-atelier-cart')


            return savedCart ? JSON.parse(savedCart) as CartItem[] : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(
            'bloom-atelier-cart',
            JSON.stringify(cartItems)
        )
    }, [cartItems])


    const updateQuantity = (pid: number, quantity: number) => {
        if (quantity < 1) return


        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.pid === pid
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const removeFromCart = (pid: number) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.pid !== pid)
        )
    }

    const clearCart = () => {
        setCartItems([])
    }


    const addToCart = (newItem: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.pid === newItem.pid
            )

            if (existingItem) {
                return prevItems.map((item) =>
                    item.pid === newItem.pid
                        ? {
                            ...item,
                            quantity: item.quantity + newItem.quantity,
                        }
                        : item
                )
            }

            return [...prevItems, newItem]
        })
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >

        {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}

