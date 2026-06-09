import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"

const Wishlist = () => {

  const {
    wishlist,
    removeFromWishlist
  } = useContext(WishlistContext)

  return (

    <div className="wishlist-page">

      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (

        <p className="empty-wishlist">
          Your wishlist is empty
        </p>

      ) : (

        <div className="wishlist-items">

          {wishlist.map(item => (

            <div
              key={item._id}
              className="wishlist-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="wishlist-details">

                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <h4>${item.price}</h4>

              </div>

              <button
                onClick={() =>
                  removeFromWishlist(item._id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  )
}

export default Wishlist