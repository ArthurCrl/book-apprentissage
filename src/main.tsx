import React from 'react'
import ReactDOM from 'react-dom/client'
import { getRouter } from './router'

const router = getRouter()

const rootElement = document.getElementById('app')
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!)
  root.render(<router.RootRoute />)
}
