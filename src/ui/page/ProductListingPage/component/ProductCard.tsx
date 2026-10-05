import { Link } from '@tanstack/react-router'

type Product = {
    pid: number
    name: string
    flowers: string
    price: number
    imageUrl: string
}

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to="/product/$pid"
            params={{ pid: product.pid.toString() }}
            className="block"
        >
            <article className="group">
                <div className="flex aspect-[9/10] items-center justify-center overflow-hidden">
                    <img
                        src={product.imageUrl}
                        alt={`${product.name} bouquet`}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="mt-4">
                    <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-serif text-xl text-[#4D5943]">
                            {product.name}
                        </h2>

                        <p className="shrink-0 text-sm text-[#24231F]">
                            HK${product.price}
                        </p>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-[#6D695F]">
                        {product.flowers}
                    </p>
                </div>
            </article>
        </Link>
    )
}