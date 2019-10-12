const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_goodreads', {useNewUrlParser: true, useUnifiedTopology: true});

const dbConnection = mongoose.connection;

dbConnection.on('error' , () => console.log('Connection Error'));
dbConnection.once('open' , () => console.log('db connected'));