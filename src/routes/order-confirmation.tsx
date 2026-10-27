import { createFileRoute } from '@tanstack/react-router'
import OrderConfirmationPage from '../ui/page/OrderConfirmationPage'


export const Route = createFileRoute('/order-confirmation')({
  component: OrderConfirmationPage,
})
