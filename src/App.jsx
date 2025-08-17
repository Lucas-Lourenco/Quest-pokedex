import { ThemeProvider } from './contextApi/ThemeContext'

import { GlobalStyle } from './styles/GlobalStyle'
import Layout from './components/layout'
import { AppRoutes } from './routes/AppRoutes'
import { HomeProvider } from './contextApi/HomeContext'
import React from 'react'
function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>
        <HomeProvider>
          <AppRoutes />
        </HomeProvider>
      </Layout>
    </ThemeProvider>
  )
}

export default App
