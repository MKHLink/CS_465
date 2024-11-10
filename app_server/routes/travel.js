var router = require('express').Router();
var controller = require('../controllers/travlr');

router.get('/',controller.travel);

module.exports = {
    router
}