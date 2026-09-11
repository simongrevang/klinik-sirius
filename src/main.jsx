import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const initialPage = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'forside'
const container = document.getElementById('root')
const tree = (
  <StrictMode>
    <App initialPage={initialPage} />
  </StrictMode>
)

// Jobsiderne prerenderes til statisk HTML ved build. Er markup allerede til stede,
// hydrerer vi den i stedet for at smide den væk.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
