
import type { CartItem } from '../data/cart.type'
import type { BackendCartItem } from '../data/backendCart.type'
import { authApi } from './authApi'

// Synchronize the frontend shopping bag with the backend cart
export async function syncCartToBackend(
    cartItems: CartItem[]
): Promise<BackendCartItem[]> {

    // Prevent submitting an empty or invalid cart
    if (cartItems.length === 0) {
        throw new Error('Your shopping bag is empty.')
    }

    const frontendCart = new Map<number, CartItem>()

    for (const item of cartItems) {
        if (
            !Number.isInteger(item.pid) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            frontendCart.has(item.pid)
        ) {
            throw new Error('Invalid shopping bag data.')
        }

        frontendCart.set(item.pid, item)
    }

    // Step 1: Read the current backend cart
    const { data: backendCart } =
        await authApi.get<BackendCartItem[]>('/cart/items')

    const backendCartMap = new Map(
        backendCart.map((item) => [item.pid, item])
    )

    // Step 2: Remove items not present in the frontend cart
    for (const backendItem of backendCart) {
        if (!frontendCart.has(backendItem.pid)) {
            await authApi.delete(
                `/cart/items/${backendItem.pid}`
            )
        }
    }

    // Step 3: Update existing items or add missing items
    for (const frontendItem of cartItems) {
        const backendItem = backendCartMap.get(frontendItem.pid)

        if (!backendItem) {
            // PUT adds a new product, or increases existing quantity
            await authApi.put(
                `/cart/items/${frontendItem.pid}/${frontendItem.quantity}`
            )
        } else if (
            backendItem.cartQuantity !== frontendItem.quantity
        ) {
            // PATCH sets the exact final quantity
            await authApi.patch(
                `/cart/items/${frontendItem.pid}/${frontendItem.quantity}`
            )
        }
    }

    // Step 4: Verify that both carts now match
    const { data: updatedBackendCart } =
        await authApi.get<BackendCartItem[]>('/cart/items')

    const cartsMatch =
        updatedBackendCart.length === frontendCart.size &&
        updatedBackendCart.every((backendItem) => {
            const frontendItem = frontendCart.get(backendItem.pid)

            return (
                frontendItem !== undefined &&
                backendItem.cartQuantity === frontendItem.quantity
            )
        })

    if (!cartsMatch) {
        throw new Error(
            'Shopping bag synchronization failed. Please try again.'
        )
    }

    return updatedBackendCart
}
