import { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
        'https://velora-backend-07s4.onrender.com/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        return
      }

      // Save user
      localStorage.setItem(
        'user',
        JSON.stringify(json)
      )

      setError(null)

      toast.success(
        'Login successful!'
      )

      // Force app to reload and re-read localStorage
      window.location.href = '/home'

    } catch (err) {

      setError(
        'Something went wrong. Please try again.'
      )

    }
  }

  return (

    <form
      className="auth-form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >

      <div className="auth-header">

        <h1>VELORA</h1>

        <p>
          Premium Shopping Experience
        </p>

      </div>

      <h3>Login</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button>
        Login
      </button>

      {error && (

        <div className="error">
          {error}
        </div>

      )}

    </form>

  )
}

export default Login