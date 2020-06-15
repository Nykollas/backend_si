var express = require('express');
var router = express.Router();
var user_controller = require('../controller/userController');
router.post('/user_update', user_controller.user_update);
router.get('/user_show', user_controller.user_show);
module.exports = router;

