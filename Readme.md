
# channels

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Minimal CSP channels.

## Installation

    $ npm install @f/channels

## Usage

```js
var createChannels = require('@f/channels')
var channels = createChannels()

channels.take(CH).then(function (val) {
  val // 42
})
channels.put(CH, 42).then(function (val) {
  val // true
})

```

## API

### channels()

**Returns:** instanced channels api

### .take(channel)

- `channel` - channel to take value from

**Returns:** promise that resolves to value that is put

### .put(channel, value)

- `channel` - channel to put value on
- `value` - value to put

**Returns:** promise that resolves to true or false indicating whether value is taken

### .close(channel)

- `channel` - channel to close

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/channels.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/channels
[git-image]: https://img.shields.io/github/tag/micro-js/channels.svg?style=flat-square
[git-url]: https://github.com/micro-js/channels
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/channels.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/channels
