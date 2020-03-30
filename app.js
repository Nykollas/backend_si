var express = require('express');


var dataRouter = require('./routes/data');
var empresasRouter = require('./routes/empresas');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth')

var app = express();

app.use('/data', dataRouter);
app.use('/empresas', empresasRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);



module.exports = app;
