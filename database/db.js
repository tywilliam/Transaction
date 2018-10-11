var mongoose = require('mongoose');
var chalk = require('chalk');
mongoose.connect('mongodb://interview1:interview1@ds048537.mlab.com:48537/interview_challenge',{useNewUrlParser: true })

mongoose.connection.on(
    'connected'
    , () => {
    global.dbstate = 'DB connnected';
    console.log(chalk.blue('Database connected'));
});
mongoose.connection.on(
    'disconnected',
    () => {
        console.log(chalk.orange('DB Disconnected'))
});