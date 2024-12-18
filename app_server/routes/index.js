var express = require('express');
var router = express.Router();

const indexMain = require('../controllers/main');

/* GET home page. */
router.get('/', indexMain.index);

module.exports = router;