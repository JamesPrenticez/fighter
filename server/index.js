import path from 'path'
import express from 'express'

import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const server = createServer(app);
const io = new Server(server, {});

let PORT = 3000

app.get("/", function(req, res){
  res.sendFile(path.resolve() + "/server/public/index.html" );
})

app.use(express.json())
app.use("/client", express.static(path.resolve() + '/client'));
app.use(express.static(path.resolve() + '/server/public'))

//Routes
import { router } from './routes/users.js'
app.use('/', router)

//import { io } from './game/sockets.js'
server.listen(PORT)
//server.use(io)
console.log("Server started on port: " + PORT)


// ---- Socket
import * as sockets from "./game/sockets.js"
sockets.listen(io)
sockets.update()