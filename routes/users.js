var express = require('express');
var router = express.Router();



var user_controller = require('../controller/userController');


router.post('/user_update', user_controller.user_update);



module.exports = router;
