var express = require('express');
const authMiddleware = require("../middlewares/auth");  
var router = express.Router();



var authController = require('../controller/authController');

router.post('/auth', authController.login);
router.post('/reset_password', authController.reset_password);
router.post('/user_create', authController.user_create);

router.use(authMiddleware);


module.exports = router;

