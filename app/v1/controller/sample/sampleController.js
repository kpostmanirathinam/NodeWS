var fs = require("fs");
const signup = require('../../schema/sample.schema');
var PdfReader = require("pdfreader").PdfReader;
var getDocumentProps = require('office-document-properties');

exports.sampleget = function (req, res) {

    signup.find().then(notes => {
        res.send(notes)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
exports.samplepost = function (req, res) {
    console.log(req.body)
    var person_data = {
        firstName: req.body.firstName
        , lastName: req.body.lastName
        , mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: req.body.password
    };

    console.log(person_data)
    var person = new signup(person_data);

    person.save(function (error, data) {
        if (error) {
            res.json(error);
        }
        else {
            res.json(data);
        }
    });
}
var a = '';
exports.samplegetfile = function (req, res, callback) {
    //const file = '/home/kapildev/List-Copy.txt';
    const file = '/home/kapildev/redBus Ticket.pdf';
    //const file = '/home/kapildev/daily1.docx';
    fs.readFile(file, function (err, contents) {
        new PdfReader().parseBuffer(contents, function (err, item) {
            if (err) callback(err);
            else if (!item) callback();
            else if (item.text !== undefined)
                a = a.concat(item.text);

        });

    });
    // fileBuff = fs.readFileSync(file);

    // // Read document properties from a buffer.
    // getDocumentProps.fromBuffer(fileBuff, function (err, data) {
    //     if (err) callback(err);
    //     console.log(data);
    // });
    res.end(a)

}

