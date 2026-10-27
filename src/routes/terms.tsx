import { createFileRoute } from '@tanstack/react-router'
import TermsPage from '../ui/page/TermsPage'

export const Route = createFileRoute('/terms')({
    component: TermsPage,
})
