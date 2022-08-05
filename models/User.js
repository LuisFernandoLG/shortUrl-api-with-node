import mongoose from 'mongoose'
const { Schema, model } = mongoose
import bcrypt from "bcryptjs"

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre("save", async function(next){
  const user = this

  // No volver a hashear la contraseña
  if(!user.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    next()
  } catch (error) {
    console.log(error)
    throw new Error("Falló el hash")
  }
  
})

UserSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password)
}

export const User = model('User', UserSchema)
