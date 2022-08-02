import express from 'express'
import { body } from 'express-validator'
import { login, register } from '../controllers/auth.controller.js'
import { validateFields } from '../middlewares/validateFields.js'
const router = express.Router()

router.post(
  '/register',
  [
    body('email', 'Formato de email incorrecto').isEmail().normalizeEmail(),
    body('password', 'Formato de contraseña incorrecto')
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.repassword)
          throw new Error('No coinciden las contraseñas')
        return value
      }),
  ],
  validateFields,
  register
)

router.get(
  '/login',
  [
    body('email', 'Formato de email incorrecto').isEmail().normalizeEmail(),
    body('password', 'Formato de contraseña incorrecto')
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.repassword)
          throw new Error('No coinciden las contraseñas')
        return value
      }),
  ],
  validateFields,
  login
)

export default router
