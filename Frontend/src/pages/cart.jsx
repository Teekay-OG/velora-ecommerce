import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext)

  const navigate = useNavigate()

  // calculate total price
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (

    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (

        <p className="empty-cart">
          Your cart is empty
        </p>

      ) : (

        <>

          <div className="cart-items">

            {cart.map(item => (

              <div
                className="cart-item"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>{item.brand}</p>

                  {/* QUANTITY CONTROLS */}
                  <div className="quantity-controls">

                    <button
                      className="qty-btn"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <h4>
                    $
                    {item.price * item.quantity}
                  </h4>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>
              Total: ${total}
            </h2>

            <div className="checkout-info">

              <p>✓ Secure Checkout</p>

              <p>🚚 Free Delivery</p>

              <p>↩ 30 Day Returns</p>

            </div>

            <button className="checkout-btn" 
            onClick={() => navigate('/checkout')}>
              Checkout
            </button>

          </div>

        </>

      )}

    </div>
  )
}

export default Cart