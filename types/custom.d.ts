import type { Post } from '@contentlayer/generated'

/** SVGR TypeScript support */
declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }

  export default content
}

export interface ChildrenOnlyProps {
  children: React.ReactNode
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ReducedPosts = Pick<Post, 'title' | 'date' | 'url' | 'excerpt'>[]
