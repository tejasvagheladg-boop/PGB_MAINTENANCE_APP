import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production'

export function signToken(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

export function getTokenFromReq(req: NextApiRequest) {
  const cookie = req.headers.cookie
  if (!cookie) return null
  const match = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('token='))
  if (!match) return null
  return match.split('=')[1]
}
