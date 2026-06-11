import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { CartContext } from '../context/CartContext'

import { toast } from 'react-toastify'

const ProductDetails = () => {

  const { id } = useParams()

  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)

  useEffect(() => {

    const fetchProduct = async () => {

      const response = await fetch(
        `https://velora-backend-07s4.onrender.com/api/products/${id}`
      )

      const json = await response.json()

      if (response.ok) {
        setProduct(json)
      }

    }

    fetchProduct()

  }, [id])

  if (!product) {

    return (
      <h1>
        Loading Product...
      </h1>
    )
  }

  const handleAddToCart = () => {

    addToCart(product)

    toast.success(
      `${product.name} added to cart`
    )
  }

  return (

    <div className="product-details-page">

      <div className="product-details-card">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-content">

          <p className="details-brand">
            {product.brand}
          </p>

          <h1>
            {product.name}
          </h1>

          <p className="details-category">
            {product.category}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <h2 className="details-price">
            ${product.price}
          </h2>

          <div className="details-meta">

         <div className="meta-item">
          ✓ In Stock
         </div>

         <div className="meta-item">
          🚚 Free Delivery
         </div>

         <div className="meta-item">
           ↩ 30 Day Returns
         </div>

         </div>

          <button onClick={handleAddToCart}>
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProductDetails