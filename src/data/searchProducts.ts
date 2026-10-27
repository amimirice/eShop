
import type { ProductDetail } from './product.type'
import { productFlowers } from './productFlowers'

export function searchProducts(
    products: ProductDetail[],
    query: string
): ProductDetail[] {
    const searchTerm = query.trim().toLowerCase()

    if (!searchTerm) {
        return products
    }

    return products.filter((product) => {
        const searchableText = [
            product.name,
            product.description,
            productFlowers[product.pid] ?? '',
        ]
            .join(' ')
            .toLowerCase()

        return searchableText.includes(searchTerm)
    })
}
