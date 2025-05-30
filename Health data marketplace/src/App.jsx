import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'

// Layout components
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import DatasetDetails from './pages/DatasetDetails'
import UploadData from './pages/UploadData'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />
  }
  
  return children
}

function App() {
  const [theme, setTheme] = useState('light')
  const { loading } = useAuth()

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Save theme preference to localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  if (loading) {
    return <div>Loading application...</div>
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout toggleTheme={toggleTheme} theme={theme} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="dataset/:id" element={<DatasetDetails />} />
          
          {/* Protected routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="upload" element={
            <ProtectedRoute>
              <UploadData />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App