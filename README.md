# easy-classlist
[![Build Status](https://secure.travis-ci.org/calledT/easy-classlist.png?branch=master)](http://travis-ci.org/calledT/easy-classlist)

Cross-browser element class manipulation

## Installation

```
npm install easy-classlist
```

## Example

```js
var classList = require('easy-classlist');
var elem = document.getElementById('elem');

classList.add('bar').remove('bar').toggle('bar');
classList.contains('bar');
```

## License

(MIT License)

Copyright (c) 2016 [calledT](//calledt.com)
