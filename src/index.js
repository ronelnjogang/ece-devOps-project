const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
const port = process.env.PORT || 3000
 
const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))


app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/'));

app.get('/', (req, res) => {
  const name = 'World';
  res.render('index', { name });
});

app.get('/addUser', (req, res) => {
  res.render('addUser');
});

// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRouter)



const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

process.on('SIGINT', () => {
  server.close()
})


module.exports = server
