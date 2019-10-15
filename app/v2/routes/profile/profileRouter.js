var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/profile/Controller');

// GET catalog home page.
router.get('/', controller.sampleget);

//post
router.post('/addprofile', controller.addprofile);
router.post('/updateprofile', controller.updateprofile);
router.post('/getprofile', controller.getprofile);

module.exports = router;