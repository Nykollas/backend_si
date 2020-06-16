var express = require('express');
var router = express.Router();
var empresasController = require('../controller/empresaController');
router.get('/list', empresasController.empresa_list);  
router.post('/update', empresasController.empresa_update);
router.post('/create', empresasController.empresa_create);
router.delete('/remove', empresasController.empresa_delete); 
module.exports = router;


  