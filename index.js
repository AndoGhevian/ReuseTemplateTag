const syntaxErrorMsg = `
Invalid Escape Sequence encountered.

Use raw:true or omit this argument to get a raw representation.
For Details About Escape Sequencies in Template Literals See - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates_and_escape_sequences
`

function reuseTemplateTag(tokens, ...values) {
    const hasInvalidEscapeSequence = tokens.some(token => token === undefined)
    const valuesSet = values.map(val => val + '')
    const valuesLength = values.length

    values = []

    const compiler = (values, raw = hasInvalidEscapeSequence) => {
        const currentTokens = raw ? tokens.raw : tokens
        let result = raw ? currentTokens[0] : currentTokens[0]
        if (result === undefined) throw new SyntaxError(syntaxErrorMsg)

        if (!(values instanceof Object)) values = []
        const isArray = values instanceof Array
        const getValue = isArray ? (index) => values[index] : (index) => values[valuesSet[index]]

        for (let i = 0; i < valuesLength; i++) {
            if (currentTokens[i + 1] === undefined) throw new SyntaxError(syntaxErrorMsg)
            result += getValue(i) + currentTokens[i + 1]
        }
        return result
    }
    compiler.hasInvalidEscapeSequence = hasInvalidEscapeSequence

    return compiler
}

let template = reuseTemplateTag`
    - Hey ${1} How a\ure You?
    - Are You ok ${1} ?
    - Yes, thanks ${2}!
`

console.log(
    template({
        1: 'Joe',
        2: 'Andy'
    })
)
console.log(
    template(['Joe', 'Molly', 'Susan'])
)
const violated = reuseTemplateTag`\u{}` // raw: 
const notViolated = reuseTemplateTag`\u{0041}` // A
console.log(
    notViolated(),
    notViolated.hasInvalidEscapeSequence
)
console.log(
    violated(),
    violated.hasInvalidEscapeSequence
)
module.exports = reuseTemplateTag