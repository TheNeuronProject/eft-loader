# eft-loader
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/TheNeuronProject/eft-loader/master/LICENSE) [![npm](https://img.shields.io/npm/dt/eft-loader.svg?style=flat-square)](https://www.npmjs.com/package/eft-loader)

[ef.js](https://github.com/TheNeuronProject/ef.js) template loader for Webpack


``` javascript
import Component from 'some_module.eft'
const component = new Component(options)
```

## Install
``` shell
npm install eft-loader --save-dev
# or
yarn add eft-loader --dev
```

## Usage
``` javascript
module.exports = {
	module: {
		rules: [
			{
				test: /\.eft?$/,
				loader: 'eft-loader'
			}
		]
	}
}
```

## License
[MIT](http://cos.mit-license.org/)
