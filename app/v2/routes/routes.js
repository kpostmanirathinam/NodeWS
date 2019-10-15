var express = require('express');
var router = express.Router();
var path = require('path');
// Require controller modules.
var signup_Routes = require('../routes/signup/signupRouter');
var login_Routes = require('../routes/login/loginRouter');
var profile_Routes = require('../routes/profile/profileRouter');
var events_Routes = require('../routes/event/eventRouter');
var payments_Routes = require('../routes/payments/eventRouter');


router.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../../v2') });
});

router.use('/signup', signup_Routes);
router.use('/login', login_Routes);
router.use('/profile', profile_Routes);
router.use('/events', events_Routes);
router.use('/payments', payments_Routes);

// router.use('/updateprofile', profile_Routes);


module.exports = router;