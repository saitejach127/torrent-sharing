var express = require('express');
var app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'))

app.listen(port, () => { console.log("Server started"); });