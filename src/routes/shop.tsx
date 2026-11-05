import { createFileRoute } from '@tanstack/react-router'
import ShopPage from '../ui/page/ShopPage'

export const Route = createFileRoute('/shop')({
    component: ShopPage,
})
