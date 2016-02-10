/**
 * Imports
 */

var createChannels = require('..')
var test = require('tape')

var CH = 'CHANNEL'
var CLOSED = createChannels.CLOSED

/**
 * Tests
 */

test('put should return true if taken', function (t) {
  t.plan(2)

  var channels = createChannels()
  channels.take(CH).then(function (val) {
    t.equal(val, 42)
  })
  channels.put(CH, 42).then(function (val) {
    t.equal(val, true)
  })
})

test('put should return false if channel is closed', function (t) {
  t.plan(1)

  var channels = createChannels()
  channels.close(CH)
  channels.put(CH, 42).then(function (val) {
    t.equal(val, false)
  })
})

test('parked put should return true if value is then taken', function (t) {
  t.plan(2)

  var channels = createChannels()
  setTimeout(function () {
    channels.take(CH).then(function (val) {
      t.equal(val, 42)
    })
  })

  channels.put(CH, 42).then(function (val) {
    t.equal(val, true)
  })
})

test('parked put should return false if value is then closed', function (t) {
  t.plan(1)

  var channels = createChannels()
  setTimeout(function () {
    channels.close(CH)
  })

  channels.put(CH, 42).then(function (val) {
    t.equal(val, false)
  })
})

test('take should return value that was put', function (t) {
  t.plan(2)

  var channels = createChannels()
  channels.put(CH, 42).then(function (val) {
    t.equal(val, true)
  })
  channels.take(CH).then(function (val) {
    t.equal(val, 42)
  })
})

test('take should return CLOSED if already closed', function (t) {
  t.plan(1)

  var channels = createChannels()
  channels.close(CH)
  channels.take(CH).then(function (val) {
    t.equal(val, CLOSED)
  })
})

test('parked take should return value that is put', function (t) {
  t.plan(2)

  var channels = createChannels()
  setTimeout(function () {
    channels.put(CH, 42).then(function (val) {
      t.equal(val, true)
    })
  })

  channels.take(CH).then(function (val) {
    t.equal(val, 42)
  })
})

test('parked take should return CLOSED if channel is then closed', function (t) {
  t.plan(1)

  var channels = createChannels()
  setTimeout(function () {
    channels.close(CH)
  })

  channels.take(CH).then(function (val) {
    t.equal(val, CLOSED)
  })
})
