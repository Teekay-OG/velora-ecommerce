import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'

const Checkout = () => {

  const { cart, clearCart } = useContext(CartContext)

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const [fullName] = useState(
    user?.name || ''
  )

  const [email] = useState(
    user?.email || ''
  )

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const shipping =
    subtotal > 200 ? 0 : 15

  const tax = subtotal * 0.1

  const total =
    subtotal + shipping + tax

  const handlePlaceOrder = async () => {

    if (
      !fullName ||
      !email ||
      !address ||
      !city ||
      !country ||
      !zipCode
    ) {

      toast.error(
        'Please fill in all fields'
      )

      return
    }

    const newOrder = {

      items: cart,

      total,

      customer: {
        fullName,
        email,
        address,
        city,
        country,
        zipCode
      }

    }

    try {

      const response = await fetch(
        'https://velora-backend-07s4.onrender.com/api/orders',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            newOrder
          )
        }
      )

      if (response.ok) {

        clearCart()

        toast.success(
          'Order placed successfully!'
        )

        navigate('/success')

      } else {

        toast.error(
          'Failed to place order'
        )

      }

    } catch (error) {

      toast.error(
        'Something went wrong'
      )

    }

  }

  return (

    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        <div className="checkout-form">

          <h2>
            Shipping Information
          </h2>

          <input
            type="text"
            value={fullName}
            readOnly
          />

          <input
            type="email"
            value={email}
            readOnly
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) =>
              setCountry(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) =>
              setZipCode(e.target.value)
            }
          />

          <button
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>

        <div className="order-summary">

          <h2>
            Order Summary
          </h2>

          {cart.map(item => (

            <div
              className="summary-item"
              key={item._id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                $
                {(item.price *
                  item.quantity
                ).toFixed(2)}
              </span>

            </div>

          ))}

          <hr />

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ${subtotal.toFixed(2)}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Shipping
            </span>

            <span>
              ${shipping.toFixed(2)}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Tax
            </span>

            <span>
              ${tax.toFixed(2)}
            </span>

          </div>

          <div className="summary-total">

            <span>
              Total
            </span>

            <span>
              ${total.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Checkout