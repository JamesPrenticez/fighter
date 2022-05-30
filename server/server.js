const path = require('path')
const express = require('express')

const app = express()

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

// ------ Sockets
const sockets = require("./game/sockets.js")
sockets.listen(io)
sockets.update()

// Test
// import {testActions} from "./game/testActions.js"
// testActions()

module.exports = server