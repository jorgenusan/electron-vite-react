import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Notes from './pages/Notes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/notes',
    element: <Notes />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
)
