import { Router } from 'express'
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from '../controllers/linkController.js'
import { requireToken } from '../middlewares/requireToken.js'
import {
  linkBodyValidation,
  paramsLinkValidator,
} from '../middlewares/validatorManager.js'
const router = Router()

// GET        /api/v1/links             all links
// GET        /api/v1/links/:nanoId     single link
// POST       /api/v1/links/:nanoId     create link
// PATCH      /api/v1/links/:nanoId     update link
// DELETE     /api/v1/links/:nanoId     delete link

router.get('/', requireToken, getLinks)
router.get('/:nanoLink', getLink)
router.post('/', requireToken, linkBodyValidation, createLink)
router.delete('/:id', requireToken, paramsLinkValidator, removeLink)
router.patch(
  '/:id',
  requireToken,
  paramsLinkValidator,
  linkBodyValidation,
  updateLink
)

export default router
