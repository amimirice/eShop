import type { CartItem } from '../data/cart.type'
import { authApi } from './authApi'
import { syncCartToBackend } from './cartSync'

// Checkout form fields sent to Spring Boot
export type CheckoutDetails = {
    fullName: string
    email: string
    phone: string
    address: string
    deliveryDate: string
}

// Prepare an order in the backend
export async function prepareCheckoutOrder(
    cartItems: CartItem[],
    checkoutDetails: CheckoutDetails
) {
    // Step 1: Synchronize the Shopping Bag
    await syncCartToBackend(cartItems)

    // Step 2: Create a PREPARE transaction
    const response = await authApi.post(
        '/transactions',
        checkoutDetails
    )

    return response.data
}
