type QuantitySelectorProps = {
    quantity: number
    stock: number
    onQuantityChange: (quantity: number) => void
}

export default function QuantitySelector({
                                             quantity,
                                             stock,
                                             onQuantityChange,
                                         }: QuantitySelectorProps) {

    const decreaseQuantity = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        if (quantity < stock) {
            onQuantityChange(quantity + 1)
        }
    }

    return (
        <div className="flex items-center">

            <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || stock <= 0}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center border border-[#C9C5BB] text-[#4D5943] transition-colors hover:bg-[#EAE5DB] disabled:cursor-not-allowed disabled:opacity-40"
            >
                −
            </button>

            <span className="flex h-10 w-12 items-center justify-center border-y border-[#C9C5BB] text-sm text-[#24231F]">
                {quantity}
            </span>

            <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= stock}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center border border-[#C9C5BB] text-[#4D5943] transition-colors hover:bg-[#EAE5DB] disabled:cursor-not-allowed disabled:opacity-40"
            >
                +
            </button>

        </div>
    )
}
