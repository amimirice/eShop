type Product = {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
}

const products: Product[] = [
    {
        id: 1,
        name: 'Garden Rose',
        description: 'Seasonal bouquet',
        price: 480,
        imageUrl: '/images/product01.png',
    },
    {
        id: 2,
        name: 'Morning Tulips',
        description: 'Fresh seasonal stems',
        price: 360,
        imageUrl: '/images/product02.png',
    },
    {
        id: 3,
        name: 'Wildflower Meadow',
        description: 'A soft garden arrangement',
        price: 520,
        imageUrl: '/images/product03.png',
    },
]

export default function ProductCardContainer() {
    return (
        <div className="mx-auto max-w-7xl">
            <header className="mb-12">
                <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                    The Collection
                </p>

                <h1 className="mt-3 font-serif text-5xl tracking-tight text-[#4D5943]">
                    Flowers for every moment
                </h1>
            </header>

            <section
                aria-label="Product collection"
                className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {products.map((product) => (
                    <article key={product.id} className="group">
                        <div className="aspect-4.5/5 overflow-hidden bg-transparent">
                            <img
                                src={product.imageUrl}
                                alt={`${product.name} bouquet`}
                                className="w-full pt-8 pb-12 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="mt-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-xl text-[#4D5943]">
                                    {product.name}
                                </h2>

                                <p className="mt-1 text-sm text-[#6D695F]">
                                    {product.description}
                                </p>
                            </div>

                            <p className="text-sm text-[#24231F]">
                                HK${product.price}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    )
}