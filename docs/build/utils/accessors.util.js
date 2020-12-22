const accessorsJson = require('../../www/accessors.json')

const accessors = new Map()

accessorsJson.forEach(accessor => {
    const tag = accessor.name
        .replace('Accessor', '')
        .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    accessors.set(`bal${tag}`, accessor)
})

module.exports = {
    accessors,
}