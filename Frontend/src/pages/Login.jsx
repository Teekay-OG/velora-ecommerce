import { useState } from 'react'
import { Link } from 'react-router-dom'
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

      localStorage.setItem(
        'user',
        JSON.stringify(json)
      )

      setError(null)

      toast.success(
        'Login successful!'
      )

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

      <h3>
        Welcome Back
      </h3>

      <input
        type="email"
        placeholder="Email Address"
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

      <div className="forgot-password">
        Forgot Password?
      </div>

      <button>
        Sign In
      </button>

      <p className="auth-switch">

        Don't have an account?{" "}

        <Link to="/signup">
          Sign Up
        </Link>

      </p>

      {error && (

        <div className="error">

          {error}

        </div>

      )}

    </form>

  )
}

export default Login