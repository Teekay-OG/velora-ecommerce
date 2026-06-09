import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/cart'
import ProductDetails from './pages/productDetails'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Orders from './pages/Orders'
import Admin from './pages/Admin'

function App() {

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  return (

    <div className="App">

      <BrowserRouter>

        <Navbar />

        <div className="pages">

          <Routes>

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/home"
              element={<Home />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/success"
              element={<Success />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/admin"
              element={<Admin />}
            />

            <Route
              path="/"
              element={<Navigate to="/home" />}
            />

          </Routes>

        </div>

      </BrowserRouter>

    </div>

  )
}

export default App