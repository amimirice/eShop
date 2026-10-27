
import type {
    ProductDetail,
    ProductListItem,
} from './product.type'

export const mockProductDetails: ProductDetail[] = [
    {
        pid: 1,
        name: 'Wisteria Waltz',
        price: 1480,
        imageUrl: '/images/product01.png',
        description: 'Lavender, cream and blush blooms are layered with airy blue flowers for a whimsical, storybook-inspired bridal bouquet.',
        stock: 999,
    },
    {
        pid: 2,
        name: 'Rose Garden',
        price: 1280,
        imageUrl: '/images/product02.png',
        description: 'A classic pink-and-ivory rose bouquet with delicate baby’s breath, made for a romantic traditional wedding.',
        stock: 999,
    },
    {
        pid: 3,
        name: 'Something Blue',
        price: 1580,
        imageUrl: '/images/product03.png',
        description: 'Blue anemones and forget-me-nots bring a meaningful “something blue” detail to a fresh spring bridal bouquet.',
        stock: 999,
    },
    {
        pid: 7,
        name: 'Ivory Vow',
        price: 2080,
        imageUrl: '/images/product04.png',
        description: 'An elegant all-white bouquet of calla lilies and peonies, softened with trailing jasmine for a timeless ceremony look.',
        stock: 999,
    },
    {
        pid: 8,
        name: 'Apricot Promise',
        price: 1080,
        imageUrl: '/images/product05.png',
        description: 'Peach garden roses and soft pink peonies create a warm, sunlit bouquet with a modern organic silhouette.',
        stock: 999,
    },
    {
        pid: 9,
        name: 'Midnight Romance',
        price: 1080,
        imageUrl: '/images/product06.png',
        description: 'A rich and expressive bouquet balancing moody burgundy, soft blush, and striking blue seasonal flowers.',
        stock: 999,
    },
    {
        pid: 10,
        name: 'Champagne Orchid',
        price: 1180,
        imageUrl: '/images/product07.png',
        description: 'A luxurious champagne-toned bouquet combining orchids and soft garden blooms for an effortlessly refined bride.',
        stock: 999,
    },
    {
        pid: 11,
        name: 'Petal Sonata',
        price: 980,
        imageUrl: '/images/product08.png',
        description: 'Layered petals in pink, ivory, and peach create a joyful and feminine bouquet with a soft flowing ribbon.',
        stock: 999,
    },
    {
        pid: 12,
        name: 'Moonlit Meadow',
        price: 1380,
        imageUrl: '/images/product09.png',
        description: 'A warm blush shade with a soft texture, a champagne tone, designed for a garden-style bridal look.',
        stock: 999,
    },
    {
        pid: 13,
        name: 'Blush Reverie',
        price: 1080,
        imageUrl: '/images/product10.png',
        description: 'A warm blush arrangement with soft texture and champagne tones, designed for a relaxed garden-style bridal look.',
        stock: 999,
    },
    {
        pid: 14,
        name: 'Velvet Amour',
        price: 1180,
        imageUrl: '/images/product11.png',
        description: 'Deep burgundy blooms meet an ivory garden rose in a dramatic, romantic bouquet for an autumn or evening wedding. Its delicate and petite shape is perfect for brides who prefer a simple floral arrangement.',
        stock: 999,
    },
    {
        pid: 15,
        name: 'Celeste Orchid',
        price: 1780,
        imageUrl: '/images/product12.png',
        description: 'Sculptural white phalaenopsis orchids, finished with a powder-blue satin ribbon for a clean and modern bridal statement.',
        stock: 999,
    },
]

export const mockProductList: ProductListItem[] =
    mockProductDetails.map((product) => ({
        pid: product.pid,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        hasStock: (product.stock ?? 0) > 0,
    }))
