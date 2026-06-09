import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import CartContextProvider from './context/CartContext.jsx'
import WishlistContextProvider from './context/WishlistContext'

createRoot(document.getElementById('root')).render(


    <WishlistContextProvider>

      <CartContextProvider>

        <App />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
        />

      </CartContextProvider>

    </WishlistContextProvider>

  

)