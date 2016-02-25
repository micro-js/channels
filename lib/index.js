/**
 * Modules
 */

var channel = require('@f/channel')

/**
 * Expose channels
 */

module.exports = channels

/**
 * Expose types
 */

channels.CLOSED = channel.CLOSED

/**
 * Channels
 * @return {Object} channels api with take an put
 */

function channels () {
  var chs = {}

  return {take: take, put: put, open: open, close: close}

  function open (ch) {
    getChannel(ch).open()
  }

  function close (ch) {
    return getChannel(ch).close()
  }

  function take (ch) {
    return getChannel(ch).take()
  }

  function put (ch, val) {
    return getChannel(ch).put(val)
  }

  function getChannel (ch) {
    if (!chs[ch]) {
      chs[ch] = channel()
    }
    return chs[ch]
  }
}
