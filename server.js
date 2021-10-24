const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
app.use(
  '/',
  (req, res) => {
    console.log('middleware to serve gzip files')
  },
  express.static(path.join(__dirname, 'dist'))
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
