import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          'https://velora-backend-07s4.onrender.com/api/products'
        )

        const json = await response.json()

        if (response.ok) {
          setProducts(json)
        }

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

    fetchProducts()

  }, [])

  const filteredProducts = products
    .filter(product => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        category === 'All'
          ? true
          : product.category === category

      return (
        matchesSearch &&
        matchesCategory
      )

    })
    .sort((a, b) => {

      if (sortBy === 'price-low') {
        return a.price - b.price
      }

      if (sortBy === 'price-high') {
        return b.price - a.price
      }

      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name)
      }

      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name)
      }

      return 0

    })

  if (loading) {

    return (

      <div className="loading-screen">

        <h2>Loading products...</h2>

      </div>

    )
  }

  return (

    <div className="home">

      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="All">
            All
          </option>

          {[...new Set(
            products.map(
              product => product.category
            )
          )].map(category => (

            <option
              key={category}
              value={category}
            >
              {category}
            </option>

          ))}

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="">
            Sort By
          </option>

          <option value="price-low">
            Price: Low → High
          </option>

          <option value="price-high">
            Price: High → Low
          </option>

          <option value="name-asc">
            Name: A → Z
          </option>

          <option value="name-desc">
            Name: Z → A
          </option>

        </select>

      </div>

      {category !== 'All' && (

        <p className="active-filter">

          Showing products in:
          <span> {category}</span>

        </p>

      )}

      <p className="results-text">

        Showing {filteredProducts.length} result(s)

        {search &&
          ` for "${search}"`
        }

      </p>

      {filteredProducts.length === 0 ? (

        <div className="no-results">

          <h2>No products found</h2>

          <p>
            Try searching with another keyword.
          </p>

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map(product => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>
  )
}

export default Home