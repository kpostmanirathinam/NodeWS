var express = require('express');
var router = express.Router();
// Require controller modules.
var sample_Con = require('../../controller/sample/sampleController');

// GET catalog home page.
router.get('/', sample_Con.sampleget);
router.post('/', sample_Con.samplepost);
router.get('/file', sample_Con.samplegetfile)

module.exports = router;