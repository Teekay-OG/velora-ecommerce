import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

  // CART
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem('wishlist')

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : []
  })

  // SAVE CART
  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )
  }, [cart])

  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(wishlist)
    )
  }, [wishlist])

  // ADD TO CART
  const addToCart = (product) => {

    const existingItem = cart.find(
      item => item._id === product._id
    )

    if (existingItem) {

      setCart(
        cart.map(item =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ])

    }
  }

  // REMOVE FROM CART
  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        item => item._id !== id
      )
    )
  }

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCart(
      cart.map(item =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    setCart(
      cart
        .map(item =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCart([])
  }

  // ADD TO WISHLIST
  const addToWishlist = (product) => {

    const exists = wishlist.find(
      item => item._id === product._id
    )

    if (!exists) {

      setWishlist([
        ...wishlist,
        product
      ])

    }
  }

  // REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter(
        item => item._id !== id
      )
    )
  }

  return (

    <CartContext.Provider
      value={{
        cart,
        wishlist,

        addToCart,
        removeFromCart,

        addToWishlist,
        removeFromWishlist,

        increaseQuantity,
        decreaseQuantity,

        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  )
}

export default CartContextProvider