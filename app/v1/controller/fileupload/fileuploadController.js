
exports.fileupload = function (req, res) {
    console.log(req)
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    } else {
      res.send(file)
    }
}
