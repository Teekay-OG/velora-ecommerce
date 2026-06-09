import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Admin = () => {

  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    brand: "",
    stock: ""
  })

  const fetchProducts = async () => {

    const response = await fetch(
      "https://velora-backend-07s4.onrender.com/api/products"
    )

    const json = await response.json()

    if (response.ok) {
      setProducts(json)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    let imageUrl = formData.image

    if (imageFile) {

      setUploading(true)

      const data = new FormData()

      data.append("file", imageFile)

      data.append(
        "upload_preset",
        "velora_products"
      )

      const cloudinaryResponse =
        await fetch(
          "https://api.cloudinary.com/v1_1/dg4m13dox/image/upload",
          {
            method: "POST",
            body: data
          }
        )

      const cloudinaryData =
        await cloudinaryResponse.json()

      imageUrl =
        cloudinaryData.secure_url

      setUploading(false)
    }

    const url = editingId
      ? `https://velora-backend-07s4.onrender.com/api/products/${editingId}`
      : "https://velora-backend-07s4.onrender.com/api/products"

    const method = editingId
      ? "PATCH"
      : "POST"

    const response = await fetch(url, {

      method,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },

      body: JSON.stringify({
        ...formData,
        image: imageUrl
      })

    })

    if (response.ok) {

      toast.success(
        editingId
          ? "Product Updated"
          : "Product Added"
      )

      setFormData({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        brand: "",
        stock: ""
      })

      setImageFile(null)

      setEditingId(null)

      fetchProducts()
    }
  }

  const handleDelete = async (id) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    const response = await fetch(
      `https://velora-backend-07s4.onrender.com/api/products/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )

    if (response.ok) {

      toast.success("Product Deleted")

      fetchProducts()
    }
  }

  const handleEdit = (product) => {

    setEditingId(product._id)

    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      brand: product.brand,
      stock: product.stock
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (

    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
        />

        {imageFile && (

          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            width="120"
            style={{
              borderRadius: "10px",
              marginTop: "10px"
            }}
          />

        )}

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="admin-actions">

          <button
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (

            <button
              type="button"
              onClick={() => {

                setEditingId(null)

                setFormData({
                  name: "",
                  price: "",
                  image: "",
                  category: "",
                  description: "",
                  brand: "",
                  stock: ""
                })

                setImageFile(null)

              }}
            >
              Cancel
            </button>

          )}

        </div>

      </form>

      <div className="admin-products">

        {products.map(product => (

          <div
            key={product._id}
            className="admin-product"
          >

            <img
              src={product.image}
              alt={product.name}
              width="80"
            />

            <div>

              <h3>{product.name}</h3>

              <p>${product.price}</p>

              <p>
                Stock: {product.stock}
              </p>

            </div>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <button
                onClick={() =>
                  handleEdit(product)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(product._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Admin