import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import axios from 'axios'
import type { ProductDetail } from '../../../data/product.type'

export default function ProductDetailPage() {
    const { pid } = useParams({ from: '/product/$pid' })

    const [product, setProduct] = useState<ProductDetail | null>(null)

    useEffect(() => {
        axios
            .get<ProductDetail>(`http://localhost:8080/public/products/${pid}`)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((error) => {
                console.error('Failed to fetch product:', error)
            })
    }, [pid])

    if (!product) {
        return (
            <main className="min-h-screen pt-24">
                <p>Loading...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen pt-24">
            <h1>{product.name}</h1>
            <p>Product ID: {product.pid}</p>
            <p>HK${product.price}</p>
            <p>{product.description}</p>
            <p>Stock: {product.stock ?? 'Not available'}</p>
        </main>
    )
}