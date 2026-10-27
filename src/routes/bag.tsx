import { createFileRoute } from '@tanstack/react-router'
import ShoppingBagPage from '../ui/page/ShoppingBagPage'


export const Route = createFileRoute('/bag')({
    component: ShoppingBagPage,
})




