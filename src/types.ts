export type ProjectDetail = {
  year?: string
  overview: string
  role?: string
  highlights: string[]
  stack: string[]
  github?: string
  live?: string
}

export type Project = {
  n: string
  title: string
  kind: string
  desc: string
  href?: string
  imgs?: string[]
  fit?: 'cover' | 'contain'
  detail?: ProjectDetail
}
