/*
    Clerkie transaction api 0.1
*/
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const chalk = require('chalk');
const mongoose = require('mongoose');
const app = express();
var Transaction = require('./models/Transaction');
app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(express.json());
app.use('/', require('./apis/01'));

// +> server ripped
const port = process.env.PORT || 1984;
app.listen(port, () => console.log(`Server LIVE on `+ chalk.blue(`${process.env.HOST}:${port} `)));
