import { env } from '*/config/environment'
import { connectDB } from '*/config/mongodb'
import { apiV1 } from '*/routes/v1'
import express from 'express'
import cors from 'cors'

connectDB()
  .then(() => console.log('Connect to server successfully!'))
  .then(() => bootServer())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
  }

  app.use(cors(corsOptions))

  // Enable req.body
  app.use(express.json())

  app.use('/v1', apiV1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I'm a server running at http://${env.APP_HOST}:${env.APP_PORT}`)
  })
}