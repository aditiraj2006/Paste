
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter([
  {
    path: '/',
    element: 
    <div>
      <Navbar/>
      <div className="container">
        <Home/>
      </div>
    </div>
  },
  {
    path: '/pastes',
    element: 
    <div>
      <Navbar/>
      <div className="container">
        <Paste/>
      </div>
    </div>
  },
  {
    path: '/pastes/:id',
    element: 
    <div>
      <Navbar/>
      <div className="container">
        <ViewPaste/>
      </div>
    </div>
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App