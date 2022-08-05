import axios from 'axios'
import { body, param } from 'express-validator'
import { validateResults } from '../middlewares/validateResults.js'

export const registerBodyValidation = [
  body('email', 'Formato de email incorrecto').isEmail().normalizeEmail(),
  body('password', 'Formato de contraseña incorrecto')
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword)
        throw new Error('No coinciden las contraseñas')
      return value
    }),
  validateResults,
]

export const loginBodyValidation = [
  body('email', 'Formato de email incorrecto').isEmail().normalizeEmail(),
  body('password', 'Formato de contraseña incorrecto')
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword)
        throw new Error('No coinciden las contraseñas')
      return value
    }),
  validateResults,
]

export const linkBodyValidation = [
  body('longLink', 'Formato de Link incorrecto')
    .trim()
    .notEmpty()
    .exists()
    .custom(async (value) => {
      try {
        if (value.startsWith('http://')) value = value + 'https://'
        await axios.get(value)
        return value
      } catch (error) {
        throw new Error('Url not found 404')
      }
    }),
  validateResults,
]

export const paramsLinkValidator = [
  param('id', 'Formato no válido').trim().isEmpty().escape(),
  validateResults,
]
