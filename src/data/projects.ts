import type { Project } from '../types'

export const projects: Project[] = [
  {
    n: '01',
    title: "Farmer's Market",
    kind: 'Full-stack · Solo',
    desc: 'Local farm-to-table marketplace. Built front to back, solo — JWT/OAuth2 social login, SSE live inventory, atomic point-payment transactions.',
  },
  {
    n: '02',
    title: 'CVDLens',
    kind: 'Capstone · Full-stack + AI',
    desc: 'Real-time color-blindness correction web app. Implemented the color-vision transform by hand instead of importing a library.',
    imgs: ['/og_cover.jpg'],
  },
  {
    n: '03',
    title: 'PrismDesign',
    kind: 'Team of 2',
    desc: 'Browser-based node visual-programming studio. ReactFlow node editor, Canvas 2D rendering, MediaPipe hand tracking.',
    imgs: ['/assets1.png'],
  },
  {
    n: '04',
    title: 'GitHub Country Filter',
    kind: 'Side',
    desc: 'Chrome extension that filters GitHub users by country.',
    imgs: ['/modal.png', '/top-repositories.png'],
  },
]

export const focusAreas = [
  'Python',
  'PyTorch',
  'Pandas',
  'NumPy',
  'Spring',
  'Java',
  'Docker',
  'React',
  'JavaScript',
  'PostgreSQL',
  'C',
  'C++',
]
