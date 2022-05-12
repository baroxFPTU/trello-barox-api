import express from 'express'
import { mapOrder } from '*/utils/sort'

const app = express()

const hostName = 'localhost'
const port = 8080

app.get('/', (req, res) => {
  res.end('<h1>Hello world!</h1>')
})

app.listen(port, hostName, () => {
  console.log(`I'm a server running at http://${hostName}:${port}`)
})