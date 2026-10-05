import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from '../ui/page/ProductDetailPage'

export const Route = createFileRoute('/product/$pid')({
    component: ProductDetailPage,
})

