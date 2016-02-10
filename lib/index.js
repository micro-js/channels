/**
 * Modules
 */

var foreach = require('@f/foreach')
var defer = require('@f/defer-promise')

/**
 * Actions
 */

var CLOSED = '@f/channels/CLOSED'
var OPEN = '@f/channels/OPEN'

/**
 * Expose channels
 */

module.exports = channels

/**
 * Expose types
 */

channels.CLOSED = CLOSED
channels.OPEN = OPEN

/**
 * Channels
 * @return {Object} channels api with take an put
 */

function channels () {
  var takes = {}
  var puts = {}
  var status = {}

  return {take: take, put: put, open: open, close: close}

  function open (channel) {
    status[channel] = OPEN
    if (!takes[channel]) takes[channel] = []
    if (!puts[channel]) puts[channel] = []
  }

  function close (channel) {
    status[channel] = CLOSED

    foreach(function (take) {
      take.resolve(CLOSED)
    }, takes[channel])
    delete takes[channel]

    foreach(function (put) {
      put[1].resolve(false)
    }, puts[channel])
    delete puts[channel]
  }

  function take (channel) {
    if (isClosed(channel)) {
      return Promise.resolve(CLOSED)
    }
    ensureOpen(channel)
    if (puts[channel].length) {
      var p = puts[channel].shift()
      p[1].resolve(true)
      return p[0]
    } else {
      var d = defer()
      takes[channel].push(d)
      return d.promise
    }
  }

  function put (channel, val) {
    if (isClosed(channel)) {
      return Promise.resolve(false)
    }
    ensureOpen(channel)
    if (takes[channel].length) {
      takes[channel].shift().resolve(val)
      return Promise.resolve(true)
    } else {
      var d = defer()
      puts[channel].push([Promise.resolve(val), d])
      return d.promise
    }
  }

  function ensureOpen (channel) {
    if (!status[channel]) {
      open(channel)
    }
  }

  function isClosed (channel) {
    return status[channel] === CLOSED
  }
}
