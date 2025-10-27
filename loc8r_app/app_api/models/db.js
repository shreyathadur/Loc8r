const mongoose = require('mongoose');

 const dbURI="mongodb://localhost:27017/loc8r_final";  //add your mongodb url here
//var dbURI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/loc8r"; //add your mongodb url here
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);  
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
 
require("./users")
require("./locations")
require("./reviews")
