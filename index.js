const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const usersRouter = require('./route/users');
const setRouter = require('./route/set');
app.use(cors())
app.use(bodyParser.json());



app.use('/setuser', setRouter);
app.use('/users', usersRouter);
var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("app listenig port : ".PORT)
