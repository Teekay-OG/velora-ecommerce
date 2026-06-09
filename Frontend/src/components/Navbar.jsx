import { useContext } from 'react'
import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { toast } from 'react-toastify'

import { CartContext } from '../context/CartContext'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { cart } = useContext(CartContext)

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  let user = null

  try {
    user = JSON.parse(
      localStorage.getItem('user')
    )
  } catch (error) {
    user = null
  }

  if (
    location.pathname === '/signup' ||
    location.pathname === '/login'
  ) {
    return null
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {

    localStorage.removeItem('user')

    toast.success(
      'Logged out successfully'
    )

    navigate('/login')
  }

  return (

    <header>

      <div className="container">

        <div className="logo-section">

          <h1>VELORA</h1>

          {user?.name && (

            <p className="welcome-text">
              Welcome back, {user.name} 👋
            </p>

          )}

        </div>

        <nav className="nav-links">

          <Link to="/home">
            Dashboard
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          {user.role === 'admin' && (

            <Link to="/admin">
              Admin
            </Link>

          )}

        </nav>

        <div className="nav-actions">

          <Link
            to="/cart"
            className="cart-icon"
          >
            🛒 Cart ({cartCount})
          </Link>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  )
}

export default Navbar