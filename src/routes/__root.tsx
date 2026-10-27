import { createRootRoute } from '@tanstack/react-router'
import RootComponent from '../RootComponent.tsx'
import NotFoundPage from '../ui/page/NotFoundPage'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})
