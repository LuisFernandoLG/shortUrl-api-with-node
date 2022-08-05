import { nanoid } from 'nanoid'
import { Link } from '../models/Link.js'

const getLinks = async (req, res) => {
  try {
    const uid = req.uid
    const links = await Link.find({ uid })
    console.log({ links })

    return res.json({ ok: true, uid, links: links })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'something went wrong' })
  }
}

const getLink = async (req, res) => {
  const { nanoLink } = req.params
  const uid = req.uid

  try {
    const link = await Link.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'No existe el link' })
    
    return res.json({ ok: true, longLink: link.longLink })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'ID no valida' })
    return res.status(201).json({ error: 'something went wrong' })
  }
}

const createLink = async (req, res) => {
  let { longLink } = req.body
  if (longLink.startsWith('http://')) longLink = longLink + 'https://'
  const uid = req.uid
  const nanoLink = nanoid(6)

  console.log({ longLink, uid, nanoLink })

  try {
    const link = new Link({ longLink, nanoLink, uid })
    const newLink = await link.save()

    return res.json({ ok: true, uid, newLink })
  } catch (error) {
    console.log(error)
    return res.status(201).json({ error: 'something went wrong' })
  }
}

const removeLink = async (req, res) => {
  const { id } = req.params
  const uid = req.uid

  try {
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'No existe el link' })
    console.log(uid)
    if (!link.uid.equals(uid))
      return res.status(404).json({ error: 'Error de autorización' })

    await link.remove()

    return res.json({ ok: true, link })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'ID no valida' })
    return res.status(201).json({ error: 'something went wrong' })
  }
}

const updateLink = async (req, res) => {
  const { id } = req.params
  const uid = req.uid
  const { longLink } = req.body
  if (longLink.startsWith('http://')) longLink = longLink + 'https://'

  try {
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'No existe el link' })
    console.log(uid)
    if (!link.uid.equals(uid))
      return res.status(404).json({ error: 'Error de autorización' })

    // Actualizar
    alink.longLink = longLink
    await link.save()

    return res.json({ ok: true, link })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'ID no valida' })
    return res.status(201).json({ error: 'something went wrong' })
  }
}

export { getLinks, createLink, getLink, removeLink, updateLink }
