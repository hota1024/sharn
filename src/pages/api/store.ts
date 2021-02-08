import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { MAX_COUNT } from '../../constants/MAX_COUNT'
import { Text } from '../../types/Text'

export let data: Text[] = []

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (data.length > 50) {
    const now = Date.now()
    data = data.filter((t) => now - t.createdAt < 24 * 60 * 60 * 1000)
  }

  if (data.length > 50) {
    res.status(400).json({
      error: {
        message: 'サーバーに保存されているテキストが最大数になっています',
      },
    })
    return
  }

  if (typeof req.body.text !== 'string') {
    res.status(400).json({
      error: {
        message: 'テキストは文字列でなければいけません',
      },
    })
    return
  }

  if (req.body.text.length === 0) {
    res.status(400).json({
      error: {
        message: 'テキストが入力されていません',
      },
    })
    return
  }

  if (req.body.text.length > MAX_COUNT) {
    res.status(400).json({
      error: {
        message: `テキストは${MAX_COUNT}文字以下にしてください`,
      },
    })
    return
  }

  const {
    data: { words },
  } = await axios.get<{ words: string[] }>('http://18.179.61.23:10000/3')

  const text: Text = {
    id: words.join(''),
    words,
    text: req.body.text,
    createdAt: Date.now(),
  }

  data.push(text)

  res.status(200).json(text)
}
