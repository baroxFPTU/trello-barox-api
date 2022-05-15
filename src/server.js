import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model'
import { ColumnModel } from '*/models/column.model'

connectDB()
  .then(() => console.log('Connect to server successfully!'))
  .then(() => bootServer())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.json({ name: 'test' })
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I'm a server running at http://${env.APP_HOST}:${env.APP_PORT}`)
  })
}