import { createServerFn } from '@tanstack/react-start'

export const fetchAllPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAllPosts } = await import('./content')
    return getAllPosts()
  }
)

export const fetchAllStatics = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAllStatics } = await import('./content')
    return getAllStatics()
  }
)

export const fetchAllTokens = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getTokens } = await import('./content')
    return getTokens()
  }
)
