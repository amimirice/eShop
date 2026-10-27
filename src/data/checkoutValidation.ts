
export type CheckoutFormValues = {
    fullName: string
    email: string
    phone: string
    address: string
    deliveryDate: string
}

export type CheckoutFormErrors = Partial<
    Record<keyof CheckoutFormValues, string>
>

export function validateCheckoutForm(
    values: CheckoutFormValues,
    minDeliveryDate: string
): CheckoutFormErrors {
    const errors: CheckoutFormErrors = {}

    // Full Name
    if (!values.fullName.trim()) {
        errors.fullName = 'Please enter your full name.'
    }

    // Email Address
    const email = values.email.trim()

    if (!email) {
        errors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address.'
    }

    // Phone Number
    if (!values.phone.trim()) {
        errors.phone = 'Please enter your phone number.'
    }

    // Delivery Address
    if (!values.address.trim()) {
        errors.address = 'Please enter your delivery address.'
    }

    // Preferred Delivery Date
    if (!values.deliveryDate) {
        errors.deliveryDate = 'Please select a delivery date.'
    } else if (
        !/^\d{4}-\d{2}-\d{2}$/.test(values.deliveryDate) ||
        values.deliveryDate < minDeliveryDate
    ) {
        errors.deliveryDate = 'Please select a valid date from tomorrow onwards.'
    }

    return errors
}
