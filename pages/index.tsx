import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function register(e: any) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    setLoading(false)
    if (res.ok) {
      alert('Registered successfully. Please login.')
      setEmail('')
      setPassword('')
      setName('')
    } else {
      const j = await res.json().catch(() => ({ error: 'Unknown error' }))
      alert('Register failed: ' + (j?.error || res.status))
    }
  }

  async function login(e: any) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/requests')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h1>PGB Maintenance Application</h1>
      <p>Simple society maintenance request system.</p>

      <div style={{ display: 'flex', gap: 40 }}>
        <section style={{ flex: 1 }}>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <br />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
        </section>

        <section style={{ flex: 1 }}>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
