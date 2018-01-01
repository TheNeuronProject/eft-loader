const parse = require('eft-parser')

module.exports = function(template) {
	if (this.cacheable) this.cacheable()
	return `module.exports = require('ef-core').create(${JSON.stringify(parse(template))})`
}
