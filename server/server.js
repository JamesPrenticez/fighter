
const path = require('path')

const express = require('express')
const app = express()
const cors = require("cors");

const http = require('http');
const server = http.createServer(app);
let io = require("socket.io")(server, {})

/* ----- Webpack hot reloading - remove in production ----- */
let webpack = require('webpack');
let webpackConfig = require('../webpack.config.js')
let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {}))
app.use(require('webpack-hot-middleware')(compiler, { path: '/__webpack_hmr' }))
/* ---------------------------------------------------------------------------------------*/

// ------ Serve public folder
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

// ------ Server api routes
const router = require("./routes/users.js")
app.use('/', router)

// ------ Handel cross origin requests
app.use(cors())

// Client catch all to handle page reload
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})

// ------ Sockets
// const sockets = require("./game/sockets.js")
// sockets.listen(io)
// sockets.update()

// Test
// import {testActions} from "./game/testActions.js"
// testActions()

//Chat
const chat = require("./chat/chatSockets.js")
chat.listen(io)

//Auth
const auth = require("./auth/authSockets.js")
auth.listen(io)

module.exports = server