import mongoose from 'mongoose'
const { model, Schema } = mongoose

const linkSchema = new Schema({
  longLink: {
    type: String,
    required: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Link = model('Link', linkSchema)
export { Link }
