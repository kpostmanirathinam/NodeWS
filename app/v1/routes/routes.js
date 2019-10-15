var express = require('express');
var router = express.Router();
var path = require('path');
// Require controller modules.
var sample_Routes = require('../routes/sample/sampleRouter');
var fileUpload_Routes = require('../routes/fileupload/fileuploadRouter');


router.use('/sample', sample_Routes);
router.use('/fileupload', fileUpload_Routes);
router.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../../v1') });
});

module.exports = router;