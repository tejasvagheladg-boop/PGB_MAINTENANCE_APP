import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Req = {
  id: number
  title: string
  description?: string
  status: string
  createdAt: string
  CreatedBy?: { name?: string; email: string }
}

export default function Requests() {
  const [list, setList] = useState<Req[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchList()
  }, [])

  async function fetchList() {
    const res = await fetch('/api/requests')
    if (res.ok) setList(await res.json())
    else {
      alert('Please login')
      router.push('/')
    }
  }

  async function create(e: any) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc }),
    })
    setLoading(false)
    if (res.ok) {
      setTitle('')
      setDesc('')
      fetchList()
    } else {
      alert('Failed to create request')
    }
  }

  async function logout() {
    await fetch('/api/auth/logout')
    router.push('/')
  }

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <h1>Maintenance Requests Dashboard</h1>
      <button onClick={logout} style={{ float: 'right' }}>
        Logout
      </button>
      <div style={{ clear: 'both' }} />

      <section style={{ marginTop: 30, padding: 20, border: '1px solid #ccc' }}>
        <h2>Create New Request</h2>
        <form onSubmit={create}>
          <input
            placeholder="Request Title (e.g., Plumbing issue in flat 101)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
          <br />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={loading}
            rows={4}
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </form>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Recent Requests ({list.length})</h2>
        {list.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {list.map((r) => (
              <li
                key={r.id}
                style={{
                  padding: 15,
                  marginBottom: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                }}
              >
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <small>
                  Status: <b>{r.status}</b> | By:{' '}
                  {r.CreatedBy?.name ?? r.CreatedBy?.email} | Date:{' '}
                  {new Date(r.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
