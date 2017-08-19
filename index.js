const parse = require('eft-parser')

module.exports = function(template) {
	if (this.cacheable) this.cacheable()
	return `const {create} = require('ef.js'); module.exports = create(${JSON.stringify(parse(template))})`
}
