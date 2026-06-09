import { useContext } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext)

  const {
    addToWishlist,
    removeFromWishlist,
    wishlist
  } = useContext(WishlistContext)

  const isWishlisted = wishlist.some(
    item => item._id === product._id
  )

  const handleAddToCart = (e) => {

    e.preventDefault()

    if (product.stock === 0) {

      toast.error("This product is out of stock")

      return
    }

    addToCart(product)

    toast.success(
      `${product.name} added to cart`
    )
  }

  const handleWishlist = (e) => {

    e.preventDefault()

    if (isWishlisted) {

      removeFromWishlist(product._id)

    } else {

      addToWishlist(product)

    }
  }

  return (

    <Link
      to={`/product/${product._id}`}
      className="product-link"
    >

      <div className="product-card">

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        <div className="product-image-wrapper">

          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            decoding="async"
          />

        </div>

        <div className="product-content">

          <h3 className="product-name">
            {product.name}
          </h3>

          <p className="product-stock">

            {product.stock === 0
              ? "❌ Out of Stock"
              : product.stock <= 5
              ? `⚠️ Only ${product.stock} left`
              : `✅ In Stock (${product.stock})`
            }

          </p>

          <div className="product-footer">

            <h2 className="product-price">
              ${product.price}
            </h2>

            <button
              className="buy-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0
                ? "Sold Out"
                : "Add"}
            </button>

          </div>

        </div>

      </div>

    </Link>
  )
}

export default ProductCard