import { useEffect, useState } from 'react'

const Orders = () => {

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    const fetchOrders =
      async () => {

        const response =
          await fetch(
            "https://velora-backend-07s4.onrender.com/api/orders"
          )

        const json =
          await response.json()

        if (response.ok) {

          const user = JSON.parse(
            localStorage.getItem("user")
          )

          const userOrders =
            json.filter(
              order =>
                order.customer?.email ===
                user?.email
            )

          setOrders(userOrders)
        }
      }

    fetchOrders()

  }, [])

  return (

    <div className="orders-page">

      <div className="orders-stats">

        <div className="stat-card">

          <h3>
            {orders.length}
          </h3>

          <p>
            Total Orders
          </p>

        </div>

      </div>

      <h1>
        My Orders
      </h1>

      {orders.length === 0 ? (

        <p>
          No orders yet.
        </p>

      ) : (

        orders.map(order => (

          <div
            key={order._id}
            className="order-card"
          >

            <h3>
              Order #
              {order._id.slice(-6)}
            </h3>

            <p className="order-total">

              Total: $
              {order.total}

            </p>

            <p>

              {new Date(
                order.createdAt
              ).toLocaleString()}

            </p>

            <div className="order-status">

              ✓ Processing

            </div>

            <h4>
              Items:
            </h4>

            {order.items.map(item => (

              <div
                key={item.name}
                className="order-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                />

                <span>

                  {item.name}

                  {" × "}

                  {item.quantity}

                </span>

              </div>

            ))}

          </div>

        ))

      )}

    </div>

  )
}

export default Orders