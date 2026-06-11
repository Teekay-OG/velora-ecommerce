import { useEffect, useState } from "react"

const Profile = () => {

  const [user, setUser] = useState(null)

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState("")

  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    )

    if (storedUser) {

      setUser(storedUser)

      setName(storedUser.name)

    }

    const fetchOrders = async () => {

      try {

        const response = await fetch(
          "https://velora-backend-07s4.onrender.com/api/orders"
        )

        const json = await response.json()

        if (response.ok && storedUser) {

          const userOrders =
            json.filter(
              order =>
                order.customer?.email ===
                storedUser.email
            )

          setOrderCount(
            userOrders.length
          )

        }

      } catch (error) {

        console.log(error)

      }
    }

    fetchOrders()

  }, [])

  const handleSave = () => {

    const updatedUser = {
      ...user,
      name
    }

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    )

    setUser(updatedUser)

    setIsEditing(false)
  }

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        {isEditing ? (

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="profile-input"
          />

        ) : (

          <h1>
            {user?.name || "Guest User"}
          </h1>

        )}

        <p className="profile-email">
          {user?.email}
        </p>

        <div className="profile-stats">

          <div className="stat-box">

            <h2>
              {orderCount}
            </h2>

            <p>
              Orders
            </p>

          </div>

          <div className="stat-box">

            <h2>
              0
            </h2>

            <p>
              Wishlist
            </p>

          </div>

          <div className="stat-box">

            <h2>
              0
            </h2>

            <p>
              Reviews
            </p>

          </div>

        </div>

        {isEditing ? (

          <button
            className="edit-profile-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        ) : (

          <button
            className="edit-profile-btn"
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit Profile
          </button>

        )}

      </div>

    </div>
  )
}

export default Profile