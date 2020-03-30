var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user_data', function(req, res, next) {

  res.status(200).send({
    message:'0k'
  })

});

router.post('/user_update', function(req, res, next) {

  res.send('respond with a resource');

});



module.exports = router;
