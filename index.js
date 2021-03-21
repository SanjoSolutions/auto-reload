import chokidar from 'chokidar'
import {server as WebSocketServer} from 'websocket'
import http from 'http'

let connections = new Set()

function sendLastChangedDate(lastChanged) {
  const lastChangedText = lastChanged.toISOString()
  for (const connection of connections) {
    connection.sendUTF(lastChangedText)
  }
}

const watchPath = process.cwd()

chokidar.watch(watchPath).on(
  'all',
  function onChange(event, path) {
    const lastChanged = new Date()
    sendLastChangedDate(lastChanged)
  },
)

const server = http.createServer(function (request, response) {
  response.writeHead(404)
  response.end()
})
let port = parseInt(process.argv[2], 10)
if (Number.isNaN(port)) {
  port = 8080
}
server.listen(port, function () {
  console.log(`Server listening on port ${port}...`)
})

const webSocketServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true
})

webSocketServer.on('connect', function (connection) {
  connections.add(connection)
})

webSocketServer.on('close', function (connection) {
  connections.delete(connection)
})
