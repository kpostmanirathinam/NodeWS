var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var file_Con = require('../../controller/fileupload/fileuploadController');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
router.post('/', upload.single('myFile'), file_Con.fileupload)
module.exports = router;