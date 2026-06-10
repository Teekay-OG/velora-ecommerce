import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://velora-backend-07s4.onrender.com/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {

      // IMPORTANT: DO NOT store here anymore (we login user after signup)
      setError(null)

      toast.success('Signup successful! Please login.')

      navigate('/login')
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">

      <div className="auth-header">
       <h1>VELORA</h1>
       <p>Premium Shopping Experience</p>
      </div>

      <h3>Sign Up</h3>

      <input
        type="text"
        placeholder="Name"
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        type="email"
        placeholder="Email"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <p className="password-hint">
        Password must contain uppercase, lowercase, number, and special character.
      </p>

      <button>Signup</button>

      <p className="auth-switch">
           Already have an account?{' '}
         <Link to="/login">
           Login
         </Link>
      </p>

      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Signup