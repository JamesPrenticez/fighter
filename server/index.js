const color = require("colors");
const app = require('./server.js')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port: ${(port)} ` .magenta)
})
