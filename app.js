const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const apiRoutes = require('./routes/apiRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000

app.use(session({
  secret:   'waheguru',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}))
 app.use('/', apiRoutes)
app.get('/', (req, res) => {
  res.send('Welcome to the Multi-Step Form API')
})

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})
module.exports = app
