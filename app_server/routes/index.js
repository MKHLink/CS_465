var router = require('express').Router();

const indexMain = require('../controllers/main');

/* GET home page. */
router.get('/',indexMain);

module.exports = router;
