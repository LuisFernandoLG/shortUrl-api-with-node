const register = (req, res) => {
  const body = req.body
  return res.json({ ok: true, body })
}

const login = (req, res) => {
  res.json({ ok: 'login' })
}

export { login, register }
