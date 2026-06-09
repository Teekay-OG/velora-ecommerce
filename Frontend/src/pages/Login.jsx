import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      return
    }

    // save user to localStorage
    localStorage.setItem('user', JSON.stringify(json))

    setError(null)

    toast.success('Login successful!')

    navigate('/home')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">

      <div className="auth-header">
       <h1>VELORA</h1>
       <p>Premium Shopping Experience</p>
      </div>

      <h3>Login</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>

      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Login