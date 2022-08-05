import jwt from 'jsonwebtoken'
import { jwtErrors } from '../utils/tokenManager.js'

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) throw new Error('token missing')

    token = token.split(' ')[1]

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Agregamos un nuevo atributo al request :0
    req.uid = payload.uid
    next()
  } catch (error) {
    console.log(error)    
    return res.status(401).json({ error: jwtErrors[error.message] })
  }
}
