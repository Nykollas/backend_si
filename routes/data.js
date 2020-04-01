var express = require('express');
var router = express.Router();

router.get('/top_hashtags', function(req, res, next) {
    res.status(200).send({
        message:'ok'
    })
});

router.get('/top_empresas', function(req, res, next) {
    res.status(200).send({
        message:'ok'
    })
});

router.get('/top_categorias', function(req, res, next) {
    res.status(200).send({
        message:'ok'
    })
});

  
module.exports = router;

  