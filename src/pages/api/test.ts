let i = 0

export default function handler(req, res) {
  i++

  res.json({ i })
}
