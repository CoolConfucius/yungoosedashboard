var yungooses = require('../controllers/yungooses.js');

module.exports = function(app){

  app.get('/', function(req, res) {
    yungooses.show(req, res);
  })

  app.get('/yungooses/new', function(req, res) {  
    res.render('new')
  })

  app.get('/yungooses/:id', function(req, res) {
    yungooses.showone(req, res);
  })

  app.post('/yungooses', function(req, res) {
    yungooses.create(req, res);
  })

  app.get('/yungooses/edit/:id', function(req, res) {  
    yungooses.editpage(req, res);
  })

  app.post('/yungooses/destroy/:id', function(req, res) {
    yungooses.remove(req, res);
  })

  app.post('/yungooses/:id', function(req, res) {
    yungooses.confirmedit(req, res);
  })

}