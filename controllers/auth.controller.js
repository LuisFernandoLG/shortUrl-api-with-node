import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js'

const mongoErrors = {
  11000: {
    msg: 'Valor duplicado',
  },
}

const register = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = new User({ email, password })
    await user.save()

    const { token, expiresIn } = generateToken(user._id)
    generateRefreshToken(user.id, res)
    return res.status(201).json({ token, expiresIn })
  } catch (error) {
    const errorMsg = mongoErrors[error.code]
    return res.json({ ok: true, errorMsg })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) return res.status(403).json({ error: 'no existe el usuario' })

    const isPasswordOkay = await user.comparePassword(password)
    if (!isPasswordOkay)
      return res.status(403).json({ error: 'Contraseña incorrecta' })

    const { token, expiresIn } = generateToken(user._id)
    generateRefreshToken(user.id, res)

    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'something went wrong with the server' })
  }
}

const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean()
    res.json({ email: user.email, id: user._id })
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid)
    res.json({ token, expiresIn })
  } catch (error) {
    return res.status(401).json({ error: 'Error de servidor' })
  }
}

const logout = (req, res) => {
  res.clearCookie('refreshToken') 
  res.json({ ok: true })
}

export { login, register, infoUser, refreshToken, logout }
