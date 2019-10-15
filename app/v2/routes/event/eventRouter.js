var express = require('express');
var router = express.Router();
// Require controller modules.
var controller = require('../../controller/event/Controller');

// GET catalog home page.
router.get('/', controller.sampleget);
router.post('/', controller.samplepost);

//post
router.post('/addEvents', controller.addEvents);
router.post('/getEvents', controller.getEvents);
router.post('/updateEvents', controller.updateEvents);
router.post('/userselectEvents', controller.userselectEvents);
router.post('/getallbookedevents', controller.alluserbookedEvents);
router.post('/UserBookedEvents', controller.userbookedEventsdetails);
router.post('/paymentdetails', controller.paymentdetails);




module.exports = router;