// Los archivos importados de esta manera se ejecutan primeramente
import 'dotenv/config'
import './database/connect.js'
import express from 'express'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

// Middlewares

const whiteList = [process.env.ORIGIN1]

// De esta manera de llegan a los controladores
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) return callback(null, origin)
      return callback(`Error de cors, origin : ${origin} no autorizado`, origin)
    },
  })
)

app.use(cookieParser())
app.use(express.json())

// const apiV1 = "/api/v1"
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

//heroku proporciona el PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running 🎈🎈🎈 on http://localhost:5000')
})
