import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OhhLanding } from './ohh/OhhLanding'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OhhLanding />
  </StrictMode>,
)
