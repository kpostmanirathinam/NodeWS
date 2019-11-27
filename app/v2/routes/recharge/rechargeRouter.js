var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/recharge/Controller');

// GET catalog home page.
router.get('/', controller.sampleget);
router.post('/mobile', controller.mobile);
//router.post('/mobile', controller.samplepost);




// router.post('/getpaymentdetailsid', controller.paymentdetailspayid);
// router.post('/userPaymentHistory', controller.userpaymentHistory);
// router.post('/addPaymentHistory', controller.addpaymentHistory);

module.exports = router;