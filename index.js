import chokidar from 'chokidar'

const watchPath = process.cwd()
let lastChanged = null

chokidar.watch(watchPath).on(
  'all',
  (event, path) => {
  lastChanged = new Date()
})

import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', function (request, response) {
  response.send(lastChanged.toISOString())
})

let port = parseInt(process.argv[2], 10)
if (Number.isNaN(port)) {
  port = 8080
}
app.listen(port, function () {
  console.log(`Server listening on port ${port}...`)
})
