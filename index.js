// Los archivos importados de esta manera se ejecutan primeramente
import 'dotenv/config'
import './database/connect.js'
import express from 'express'
import authRouter from './routes/auth.route.js'

const app = express()

// Middlewares
app.use(express.json())

app.use('/api/v1', authRouter)

//heroku proporciona el PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running 🎈🎈🎈 on http://localhost:5000')
})
