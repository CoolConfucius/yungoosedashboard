// Require the Express Module
var express = require('express');
var mongoose = require('mongoose');

// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');


var YungooseSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('Yungoose', YungooseSchema); 
var Yungoose = mongoose.model('Yungoose');



// Use native promises
mongoose.Promise = global.Promise;


// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  Yungoose.find({}, function(err, yungooses){
    res.render('index', {yungooses})
  })
})

app.get('/yungooses/new', function(req, res) {  
  res.render('new')
})

app.get('/yungooses/:id', function(req, res) {
  console.log("ID!", req.params.id);
  Yungoose.findOne({_id: req.params.id}, function(err, yungoose){
    res.render('detail', {yungoose})
  })
})





app.post('/yungooses', function(req, res) {
  console.log("POST DATA", req.body);

  var yungoose = new Yungoose({
    name: req.body.name, age: req.body.age
  });
  yungoose.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { 
      console.log('successfully added a yungoose!');
      res.redirect('/');
    }
  })
})

app.get('/yungooses/edit/:id', function(req, res) {  
  Yungoose.findOne({_id: req.params.id}, function(err, yungoose){
    res.render('edit', {yungoose})
  })
})

app.post('/yungooses/destroy/:id', function(req, res) {
  console.log("POST DATA", req.body);
  // ...delete 1 record by a certain key/vaue.
  Yungoose.remove({_id: req.params.id}, function(err){
   // This code will run when the DB has attempted to remove all matching records to {_id: 'insert record unique id here'}
   if(err) {
      console.log('something went wrong');
    } else { 
      console.log('successfully removed a yungoose!');
      res.redirect('/');
    }
  })
})

app.post('/yungooses/:id', function(req, res) {
  console.log("POST DATA", req.body);
  Yungoose.findOne({_id: req.params.id}, function(err, yungoose){
    console.log("yungoose", yungoose);
    yungoose.name = req.body.name || yungoose.name;
    yungoose.age = req.body.age || yungoose.age;
    yungoose.save(function(err) {
      if(err) {
        console.log('something went wrong');
      } else { 
        console.log('successfully edited a yungoose!');
        res.redirect('/');
      }
    })
  })
})



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})