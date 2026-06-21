import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { getTokenFromReq, verifyToken } from '../../lib/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getTokenFromReq(req)
  const payload = token ? (verifyToken(token as string) as any) : null
  if (!payload) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const list = await prisma.maintenanceRequest.findMany({
      include: { CreatedBy: true, AssignedTo: true, Flat: true },
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(list)
  }

  if (req.method === 'POST') {
    const { title, description, flatId } = req.body
    if (!title)
      return res.status(400).json({ error: 'Title is required' })

    const mr = await prisma.maintenanceRequest.create({
      data: {
        title,
        description,
        flatId: flatId || undefined,
        createdById: payload.userId,
      },
    })
    return res.status(201).json(mr)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
