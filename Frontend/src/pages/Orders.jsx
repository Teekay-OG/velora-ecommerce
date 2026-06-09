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
        setOrders(json)
      }
    }

    fetchOrders()

  }, [])

  return (

    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (

        <p>No orders yet.</p>

      ) : (

        orders.map(order => (

          <div
            key={order._id}
            className="order-card"
          >

            <h3>
              Order #{order._id.slice(-6)}
            </h3>

            <p>
              Total: $
              {order.total}
            </p>

            <p>
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <h4>Items:</h4>

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