var mongoose = require('mongoose');
var Yungoose = mongoose.model('Yungoose');

module.exports = function(app){

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

}