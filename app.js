


var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

var dataRouter = require('./routes/data');
var empresasRouter = require('./routes/empresas');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/data', dataRouter);
app.use('/empresas', empresasRouter);
app.use('/users', userRouter);
app.use('/login', authRouter);

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

module.exports = app;
