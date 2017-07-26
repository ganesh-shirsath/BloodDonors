const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/database');

// Connect to DataBase
mongoose.connect(config.database);
//mongoose.connection.openUri(config.database);

// On DB connection
mongoose.connection.on('connected',function() {
    console.log("Connected to database :"+config.database)
});

// On DB connection error
mongoose.connection.on('error',function(err) {
    console.log("Error while connecting to database :"+err)
});

const app = express();

// User routes
const users = require('./routes/users')

//Donor routes
const donors = require('./routes/donors')

//Blood request routes
const bloodRequest = require('./routes/blood-requests');

// Port number
const port = 3000;

// CROS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// Body parser middleware
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// user route middleware
app.use('/api/users',users);

// donor route middleware
app.use('/api/donors',donors);

//blood request middleware
app.use('/api/blood', bloodRequest);

// Index route
app.get('/',function(req, res){
    res.send("Invalid Endpoint")
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'public/index.html'))
});

// Start server
app.listen(3000, function() {
    console.log("Server started on port--:"+ port);
})






