import { Router } from 'express'
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/auth.controller.js'
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js'
import { requireToken } from '../middlewares/requireToken.js'
import { validateResults } from '../middlewares/validateResults.js'
import {
  loginBodyValidation,
  registerBodyValidation,
} from '../middlewares/validatorManager.js'

const router = Router()

router.post('/register', registerBodyValidation, register)
router.post('/login', loginBodyValidation, validateResults, login)

router.get('/protected', requireToken, infoUser)
router.get('/refreshToken', requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router
