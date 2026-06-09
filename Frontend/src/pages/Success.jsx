import { Link } from 'react-router-dom'

const Success = () => {

  return (

    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping with VELORA.
          Your order is being processed.
        </p>

        <Link
          to="/home"
          className="continue-btn"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  )
}

export default Success