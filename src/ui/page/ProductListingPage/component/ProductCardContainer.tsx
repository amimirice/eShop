import ProductCard from './ProductCard'

type ProductCardData = {
    pid: number
    name: string
    price: number
    imageUrl: string
    flowers: string
}

const products: ProductCardData[] = [
    {
        pid: 1,
        name: 'Wisteria Waltz',
        price: 1480,
        imageUrl: '/images/product01.png',
        flowers: 'Lavender roses, cream roses, pale pink peonies, blue delphiniums, sweet peas, eucalyptus, ferns',
    },
    {
        pid: 2,
        name: 'Rose Garden',
        price: 1280,
        imageUrl: '/images/product02.png',
        flowers: 'Pink and white roses, pink peonies, baby\'s breath, eucalyptus',
    },
    {
        pid: 3,
        name: 'Something Blue',
        price: 1580,
        imageUrl: '/images/product03.png',
        flowers: 'Blue anemone, white ranunculus, blue larkspur, forget-me-not, eucalyptus',
    },
    {
        pid: 4,
        name: 'Ivory Vow',
        price: 2080,
        imageUrl: '/images/product04.png',
        flowers: 'White calla lilies, white peonies, jasmine',
    },
    {
        pid: 5,
        name: 'Apricot Promise',
        price: 1080,
        imageUrl: '/images/product05.png',
        flowers: 'Peach garden roses, pale pink peonies, peach ranunculus, eucalyptus',
    },
    {
        pid: 6,
        name: 'Midnight Romance',
        price: 1080,
        imageUrl: '/images/product06.png',
        flowers: 'Burgundy dahlias, white and pink garden roses, blue delphiniums, eucalyptus, ferns',
    },
    {
        pid: 7,
        name: 'Champagne Orchid',
        price: 1180,
        imageUrl: '/images/product07.png',
        flowers: 'White Phalaenopsis orchids, creamy ranunculus, white peonies, champagne and pale pink roses',
    },
    {
        pid: 8,
        name: 'Petal Sonata',
        price: 980,
        imageUrl: '/images/product08.png',
        flowers: 'Pink and white peonies, peach garden roses, pink tulips, waxflowers, eucalyptus',
    },
    {
        pid: 9,
        name: 'Moonlit Meadow',
        price: 1380,
        imageUrl: '/images/product09.png',
        flowers: 'White peonies, white delphiniums, astilbe, ferns',
    },
    {
        pid: 10,
        name: 'Blush Reverie',
        price: 1080,
        imageUrl: '/images/product10.png',
        flowers: 'Champagne roses, creamy ranunculus, peach carnations, canary grass, white hypericum berries, bunny tail grass',
    },
    {
        pid: 11,
        name: 'Velvet Amour',
        price: 1180,
        imageUrl: '/images/product11.png',
        flowers: 'Burgundy ranunculus, burgundy tulips, white garden roses, waxflower, eucalyptus',
    },
    {
        pid: 12,
        name: 'Celeste Orchid',
        price: 1780,
        imageUrl: '/images/product12.png',
        flowers: 'White phalaenopsis orchids',
    },
]

export default function ProductCardContainer() {
    return (
        <div className="w-full">
            <header className="mb-12">
                <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                    Bridal Collection
                </p>

                <h1 className="mt-3 font-serif text-5xl tracking-tight text-[#4D5943]">
                    Bouquets for your forever
                </h1>
            </header>

            <section
                aria-label="Bridal bouquet collection"
                className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-16"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.pid}
                        product={product}
                    />
                ))}
            </section>
        </div>
    )
}


{/*
    import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

type ProductListResponse = {
    pid: number
    name: string
    price: number
    imageUrl: string
    hasStock: boolean
}

type ProductCardData = {
    pid: number
    name: string
    price: number
    imageUrl: string
    flowers: string
}

const productFlowers: Record<number, string> = {
    1: 'Lavender roses, cream roses, pale pink peonies, blue delphiniums, sweet peas, eucalyptus, ferns',
    2: 'Pink and white roses, pink peonies, baby\'s breath, eucalyptus',
    3: 'Blue anemone, white ranunculus, blue larkspur, forget-me-not, eucalyptus',
    4: 'White calla lilies, white peonies, jasmine',
    5: 'Peach garden roses, pale pink peonies, peach ranunculus, eucalyptus',
    6: 'Burgundy dahlias, white and pink garden roses, blue delphiniums, eucalyptus, ferns',
    7: 'White Phalaenopsis orchids, creamy ranunculus, white peonies, champagne and pale pink roses',
    8: 'Pink and white peonies, peach garden roses, pink tulips, waxflowers, eucalyptus',
    9: 'White peonies, white delphiniums, astilbe, ferns',
    10: 'Champagne roses, creamy ranunculus, peach carnations, canary grass, white hypericum berries, bunny tail grass',
    11: 'Burgundy ranunculus, burgundy tulips, white garden roses, waxflower, eucalyptus',
    12: 'White phalaenopsis orchids',
}

export default function ProductCardContainer() {
    const [products, setProducts] = useState<ProductCardData[]>([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get<ProductListResponse[]>(
                    'http://localhost:8080/public/products'
                )

                const productCardData = response.data.map((product) => ({
                    pid: product.pid,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    flowers: productFlowers[product.pid] ?? '',
                }))

                setProducts(productCardData)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            }
        }

        getProducts()
    }, [])

    return (
        <div className="w-full">
            <header className="mb-12">
                <p className="text-sm uppercase tracking-[0.16em] text-[#B97870]">
                    Bridal Collection
                </p>

                <h1 className="mt-3 font-serif text-5xl tracking-tight text-[#4D5943]">
                    Bouquets for your forever
                </h1>
            </header>

            <section
                aria-label="Bridal bouquet collection"
                className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-16"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.pid}
                        product={product}
                    />
                ))}
            </section>
        </div>
    )
}*/}



{/*
const products: Product[] = [
    {
        id: 1,
        name: 'Wisteria Waltz',
        description: 'Lavender, cream and blush blooms are layered with airy blue flowers for a whimsical, storybook-inspired bridal bouquet.',
        price: 1480,
        imageUrl: '/images/product01.png',
        flowers: 'Lavender roses, cream roses, pale pink peonies, blue delphiniums, sweet peas, eucalyptus, ferns',
    },
    {
        id: 2,
        name: 'Rose Garden',
        description: 'A classic pink-and-ivory rose bouquet with delicate baby’s breath, made for a romantic traditional wedding.',
        price: 1280,
        imageUrl: '/images/product02.png',
        flowers: 'Pink and white roses, pink peonies, baby\'s breath, eucalyptus',
    },
    {
        id: 3,
        name: 'Something Blue',
        description: 'Blue anemones and forget-me-nots bring a meaningful “something blue” detail to a fresh spring bridal bouquet.',
        price: 1580,
        imageUrl: '/images/product03.png',
        flowers: 'Blue anemone, white ranunculus, blue larkspur, forget-me-not, eucalyptus',
    },
    {
        id: 4,
        name: 'Ivory Vow',
        description: 'An elegant all-white bouquet of calla lilies and peonies, softened with trailing jasmine for a timeless ceremony look.',
        price: 2080,
        imageUrl: '/images/product04.png',
        flowers: 'White calla lilies, white peonies, jasmine',
    },
    {
        id: 5,
        name: 'Apricot Promise',
        description: 'Peach garden roses and soft pink peonies create a warm, sunlit bouquet with a modern organic silhouette.',
        price: 1080,
        imageUrl: '/images/product05.png',
        flowers: 'Peach garden roses, pale pink peonies, peach ranunculus, eucalyptus',
    },
    {
        id: 6,
        name: 'Midnight Romance',
        description: 'A rich and expressive bouquet balancing moody burgundy, soft blush, and striking blue seasonal flowers.',
        price: 1080,
        imageUrl: '/images/product06.png',
        flowers: 'Burgundy dahlias, white and pink garden roses, blue delphiniums, eucalyptus, ferns',
    },
    {
        id: 7,
        name: 'Champagne Orchid',
        description: 'A luxurious champagne-toned bouquet combining orchids and soft garden blooms for an effortlessly refined bride.',
        price: 1180,
        imageUrl: '/images/product07.png',
        flowers: 'White Phalaenopsis orchids, creamy ranunculus, white peonies, champagne and pale pink roses',
    },
    {
        id: 8,
        name: 'Petal Sonata',
        description: 'Layered petals in pink, ivory, and peach create a joyful and feminine bouquet with a soft flowing ribbon.',
        price: 980,
        imageUrl: '/images/product08.png',
        flowers: 'Pink and white peonies, peach garden roses, pink tulips, waxflowers, eucalyptus',
    },
    {
        id: 9,
        name: 'Moonlit Meadow',
        description: 'A warm blush shade with a soft texture, a champagne tone, designed for a garden-style bridal look.',
        price: 1380,
        imageUrl: '/images/product09.png',
        flowers: 'White peonies, white delphiniums, astilbe, ferns',
    },
    {
        id: 10,
        name: 'Blush Reverie',
        description: 'A warm blush arrangement with soft texture and champagne tones, designed for a relaxed garden-style bridal look.',
        price: 1080,
        imageUrl: '/images/product10.png',
        flowers: 'Champagne roses, creamy ranunculus, peach carnations, canary grass, white hypericum berries, bunny tail grass',
    },
    {
        id: 11,
        name: 'Velvet Amour',
        description: 'Deep burgundy blooms meet an ivory garden rose in a dramatic, romantic bouquet for an autumn or evening wedding. Its delicate and petite shape is perfect for brides who prefer a simple floral arrangement.',
        price: 1180,
        imageUrl: '/images/product11.png',
        flowers: 'Burgundy ranunculus, burgundy tulips, white garden roses, waxflower, eucalyptus',
    },
    {
        id: 12,
        name: 'Celeste Orchid',
        description: 'Sculptural white phalaenopsis orchids, finished with a powder-blue satin ribbon for a clean and modern bridal statement.',
        price: 1780,
        imageUrl: '/images/product12.png',
        flowers: 'White phalaenopsis orchids',
    },
]
*/}
