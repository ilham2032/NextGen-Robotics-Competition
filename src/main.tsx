import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './i18n'

// GitHub Pages serves the app from a subpath (e.g. /NextGen-Robotics-Competition/).
// Use HashRouter for subpath deploys to avoid basename mismatches and 404s on refresh.
// HashRouter uses hashes (#) for routing, so no basename is needed.
const isSubpathDeploy = import.meta.env.BASE_URL !== '/'
const useHash =
  import.meta.env.VITE_USE_HASH_ROUTER === 'true' ||
  (import.meta.env.VITE_USE_HASH_ROUTER !== 'false' && isSubpathDeploy)

// Only use basename with BrowserRouter; HashRouter doesn't need it
const routerBasename =
  !useHash && import.meta.env.BASE_URL !== '/'
    ? import.meta.env.BASE_URL.replace(/\/$/, '')
    : undefined

const Router = useHash ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={routerBasename}>
      <App />
    </Router>
  </StrictMode>,
)
