import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { MAX_COUNT } from '../../constants/MAX_COUNT'

type Text = {
  id: string
  words: string[]
  text: string
  createdAt: number
}

const data: Text[] = []

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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

  console.log(data)

  res.status(200).json(text)
}
