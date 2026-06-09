import { createContext, useEffect, useState } from "react"

export const WishlistContext = createContext()

const WishlistContextProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {

    const savedWishlist =
      localStorage.getItem("wishlist")

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : []

  })

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    )

  }, [wishlist])

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

  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter(
        item => item._id !== id
      )
    )

  }

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  )

}

export default WishlistContextProvider