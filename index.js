const parse = require('eft-parser')

module.exports = function(template) {
	if (this.cacheable) this.cacheable()
	return `const {create} = require('ef-core'); module.exports = create(${JSON.stringify(parse(template))})`
}
