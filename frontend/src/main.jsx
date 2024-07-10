import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import Spinpage from './Pages/Spinpage.jsx'
import './index.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
    <Route path=''  element={<Homepage/>} />
    <Route path='spinpage/:id' element={<Spinpage/>} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
