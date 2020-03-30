var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {


    res.status(200).send({
        "message":"Ok",
    });
});
  
router.post('/update', function(req, res, next) {


    res.status(200).send({
        message:'Ok'
    })
});

router.put('/create', function(req, res, next) {

    res.status(200).send({
        message:'Ok'
    });

});

router.get('/remove', function(req, res, next) {


    res.status(200).send({
        message:'Ok'
    });

});
  
module.exports = router;


  