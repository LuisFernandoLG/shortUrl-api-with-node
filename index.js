// Los archivos importados de esta manera se ejecutan primeramente
import 'dotenv/config'
import './database/connect.js'
import express from 'express'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import cookieParser from 'cookie-parser'

const app = express()
// const apiV1 = "/api/v1"
// Middlewares
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

//heroku proporciona el PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running 🎈🎈🎈 on http://localhost:5000')
})
