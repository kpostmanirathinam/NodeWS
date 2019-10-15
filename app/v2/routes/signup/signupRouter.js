var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/signup/Controller');

// GET catalog home page.
router.get('/', controller.sampleget);

//post
router.post('/', controller.samplepost);
module.exports = router;