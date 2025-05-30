import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { BlockchainProvider } from './contexts/BlockchainContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlockchainProvider>
          <App />
          <ToastContainer position="bottom-right" autoClose={5000} />
        </BlockchainProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)