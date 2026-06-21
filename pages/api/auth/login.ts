import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).end('Method Not Allowed')

  const { email, password } = req.body
  if (!email || !password)
    return res
      .status(400)
      .json({ error: 'Email and password required' })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
  // Set httpOnly cookie
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  )
  res.status(200).json({ message: 'Logged in' })
}
