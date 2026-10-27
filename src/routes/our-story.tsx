import { createFileRoute } from '@tanstack/react-router'
import OurStoryPage from '../ui/page/OurStoryPage'

export const Route = createFileRoute('/our-story')({
    component: OurStoryPage,
})
