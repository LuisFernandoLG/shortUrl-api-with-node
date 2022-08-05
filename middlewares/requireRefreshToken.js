import jwt from 'jsonwebtoken'
import { jwtErrors } from '../utils/tokenManager.js'

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) throw { message: 'token missing' }
    // Si algo sale mal, se salta al CATCH
    const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH)

    // Pego el Token al request
    req.uid = uid
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: jwtErrors[error.message] })
  }
}
