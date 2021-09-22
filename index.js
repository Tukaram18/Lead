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

app.listen(5000);