var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var calls = require('./routes/calls')

var port = 8888

var app = express()

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// set static folder
app.use(express.static(path.join(__dirname, 'client')))

// body parser mw
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/api', calls)

app.listen(port, function () {
  console.log('server started on port ' + port)
})
