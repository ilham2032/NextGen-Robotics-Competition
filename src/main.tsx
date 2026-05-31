import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './i18n'

// React Router expects basename without a trailing slash; Vite BASE_URL includes one.
const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

// GitHub Pages serves the app from a subpath (e.g. /NextGen-Robotics-Competition/).
// HashRouter avoids 404s on refresh; set VITE_USE_HASH_ROUTER=false to use BrowserRouter + public/404.html instead.
const isSubpathDeploy = import.meta.env.BASE_URL !== '/'
const useHash =
  import.meta.env.VITE_USE_HASH_ROUTER === 'true' ||
  (import.meta.env.VITE_USE_HASH_ROUTER !== 'false' && import.meta.env.PROD && isSubpathDeploy)
const Router = useHash ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={routerBasename}>
      <App />
    </Router>
  </StrictMode>,
)
