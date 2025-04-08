import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter basename="/ResumeHariom"> */}
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
    {/* </BrowserRouter> */}
  </StrictMode>
)
