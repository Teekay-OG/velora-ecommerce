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
              element={
                !user
                  ? <Signup />
                  : <Navigate to="/home" />
              }
            />

            <Route
              path="/login"
              element={
                !user
                  ? <Login />
                  : <Navigate to="/home" />
              }
            />

            <Route
              path="/home"
              element={
                user
                  ? <Home />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/cart"
              element={
                user
                  ? <Cart />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/product/:id"
              element={
                user
                  ? <ProductDetails />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/checkout"
              element={
                user
                  ? <Checkout />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/success"
              element={
                user
                  ? <Success />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/profile"
              element={
                user
                  ? <Profile />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/wishlist"
              element={
                user
                  ? <Wishlist />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/orders"
              element={
                user
                  ? <Orders />
                  : <Navigate to="/signup" />
              }
            />

            <Route
              path="/admin"
              element={
                user?.role === 'admin'
                  ? <Admin />
                  : <Navigate to="/home" />
              }
            />

            <Route
              path="/"
              element={
                user
                  ? <Navigate to="/home" />
                  : <Navigate to="/signup" />
              }
            />

          </Routes>

        </div>

      </BrowserRouter>

    </div>

  )
}

export default App