var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/login/Controller');

// GET catalog home page.
//router.get('/', controller.get);

//post
router.post('/', controller.post);
module.exports = router;