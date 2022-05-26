import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'

export * from './entities'

interface ServerToClientEvents {
}

interface ClientToServerEvents {
}

interface InterServerEvents {
}

interface SocketData {
}

let io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export function createSocket(server: HttpServer) {
  // const httpServer = createServer(app);
  io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server)

  io.on('connection', (socket) => {
    socket.on('disconnect', (reason) => console.log(reason))
  })
  
  return io
}
