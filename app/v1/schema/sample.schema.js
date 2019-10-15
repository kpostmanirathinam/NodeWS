const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SignupSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
},{collection: 'signup'});
let signup = mongoose.model("signup", SignupSchema);
module.exports = signup;