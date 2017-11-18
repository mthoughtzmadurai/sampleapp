'use strict';
var express = require('express');
var path = require('path');

var http = require("http");

var app = express();
// var engines = require('consolidate');
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static( 'app'));
app.engine('html',  require('ejs').renderFile);
app.set('views', path.join(__dirname, './app'));
app.set('view engine', 'html');


app.use(function(req, res, next) {
  // req.db = db; // Make our db accessible to our router
  res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


//********************* Mongoose Services - End ************************//
// catch 404 and forward to error handler
app.use(function(req, res) {
    console.log("404 error"+req.path+res);

  var err = new Error('Not Found');
  err.status = 404;
//   next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
  app.use(function(err, req, res) {

    console.log("405004 error");
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    // next();
  });
//}

var server = http.createServer(app);

server.listen(8081);

