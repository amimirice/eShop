import { createFileRoute } from '@tanstack/react-router'
import ContactUsPage from '../ui/page/ContactUsPage'

export const Route = createFileRoute('/contact')({
    component: ContactUsPage,
})