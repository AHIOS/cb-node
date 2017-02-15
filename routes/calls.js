var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://mongodb', ['calls'])

// get all calls
router.get('/calls', function (req, res, next) {
  db.calls.find(function (err, calls) {
    if (err) {
      res.send(err)
    }
    res.json(calls)
  })
})

// get single call
router.get('/call/:id', function (req, res, next) {
  db.calls.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, call) {
    if (err) {
      res.send(err)
    }
    res.json(call)
  })
})

// save single call
router.post('/call', function (req, res, next) {
  var call = req.body
  if (!call.phoneNumber) {
    res.status(400)
    res.json({
      'error': 'BADDATA!'
    })
  } else {
    db.calls.save(call, function (err, call) {
      if (err) {
        res.send(err)
      }
      res.json(call)
    })
  }
})

// delete call
router.delete('/call/:id', function (req, res, next) {
  db.calls.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, call) {
    if (err) {
      res.send(err)
    }
    res.json(call)
  })
})

// update call
router.put('/call/:id', function (req, res, next) {
  var call = req.body
  var updCall = {}
  if (call.phoneNumber !== '') {
    updCall.phoneNumber = call.phoneNumber
  }
  if (!updCall.phoneNumber) {
    res.status(400)
    res.json({
      'error': 'BADDATA!'
    })
  } else {
    db.calls.update({_id: mongojs.ObjectId(req.params.id)}, updCall, {}, function (err, call) {
      if (err) {
        res.send(err)
      }
      res.json(call)
    })
  }
})

module.exports = router
