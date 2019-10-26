var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/payments/Controller');

// GET catalog home page.
router.get('/', controller.sampleget);

router.post('/getpaymentdetails', controller.paymentdetails);
router.post('/userPaymentHistory', controller.userpaymentHistory);
router.post('/addPaymentHistory', controller.addpaymentHistory);

module.exports = router;