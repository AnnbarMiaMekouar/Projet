var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.listen(5500, () =>console.log('Server started : 5500'));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;

const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
const DataAN = "my_new_dataBase";
const dbURL = 'mongodb+srv://annbarmekouar:Yaclouann11!!!@cluster0.hrwxbw9.mongodb.net/${DataAN}?retryWrites=true&w=majority'

// Conecting to the database
console.log(dbURL)
mongoose.connect(dbURL);

//Test
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://annbarmekouar:Yaclouann11!!!@cluster0.x4putcj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});