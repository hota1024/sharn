import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from './store'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = req.query.id

  const text = data.find((t) => t.id === id)

  if (typeof text === 'undefined') {
    res.status(404).json({
      error: {
        message: 'テキストが見つかりませんでした',
      },
    })
    return
  }

  res.status(200).json(text)
}
