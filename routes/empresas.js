var express = require('express');
var router = express.Router();

var empresasController = require('../controller/empresaController');


router.get('/list', function(req, res, next) {
    res.status(200).send({
        "message":"Ok",
    });
});
  
router.post('/update', empresasController.empresa_update);

router.post('/create', empresasController.empresa_create);

router.delete('/remove', function(req, res, next) {
    res.status(200).send({
        message:'Ok'
    });
});
  
module.exports = router;


  