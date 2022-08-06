const path = require('path')
const parse = require('eft-parser')

module.exports = async function(template) {
	if (this.cacheable) this.cacheable()

	const camelCase = (await import('camelcase')).default

	const filePath = this.resourcePath
	const fileName = path.parse(filePath).name

	const importLines = []
	const exportLines = []
	let componentName = camelCase(fileName, {pascalCase: true})
	let componentScope = null

	const commentHandler = ({depth, content}) => {
		if (depth > 0) return
		if (content[0] !== '!') return

		content = content.slice(1).trim()

		const splitedContent = content.split(/\s+/)
		const directive = splitedContent.shift()

		switch (directive) {
			case 'import': {
				importLines.push(content)
				break
			}
			case 'export': {
				exportLines.push(content)
				break
			}
			case 'scope': {
				componentScope = content.match(/{.+}/)
				break
			}
			case 'name': {
				componentName = camelCase(splitedContent.join('_'), {pascalCase: true})
				break
			}
			default: {
				throw new TypeError(`[EFML] Unknown directive "${directive}"`)
			}
		}

	}

	const ast = JSON.stringify(JSON.stringify(parse(template, commentHandler)))

	const code = [
		...importLines,
		componentScope &&
			`import { create, scoped } from 'ef-core'` ||
			`import { create } from 'ef-core'`,
		componentScope &&
			`export default class ${componentName} extends scoped(create(JSON.parse(${ast})), ${componentScope}) {}` ||
			`export default class ${componentName} extends create(JSON.parse(${ast})) {}`,
		...exportLines,
		''
	]

	return code.join(';\n')
}
