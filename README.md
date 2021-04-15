# ReuseTemplateTag

## Description
Define Reusable String Templates within your code:
```javascript
const reuseTemplateTag = require('reuse-template-tag')

const template = reuseTemplateTag`
    - Hey ${1} How are You?
    - Are You ok ${1} ?
    - Yes, thanks ${'me'}!
`
console.log(
    template({
        1: 'Joe',
        me: 'Andy'
    })
)
// Or provide sequence of values with Array
console.log(
    template(['Joe', 'Molly', 'Susan'])
)
/* 

    - Hey Joe How are You?
    - Are You ok Joe ?
    - Yes, thanks Andy!


    - Hey Joe How are You?
    - Are You ok Molly ?
    - Yes, thanks Susan!

*/
```

## Installation
Run command: `npm install --save reuse-template-tag`

## Usage
By using **reuseTemplateTag** you will get a function which accepts 2 arguments:
- **values**: Array | Object. If anything else provided, it will be considered as
empty array.
- **raw**: Boolean. Specifies if to follow [Rules Of Escape Sequencies][mdn_template_literal_escape_rules] for temlate literals.
By default if this rules are violated, then raw string will be returned,
else it will stick to behaviour of considering **escape sequencies** as untagged
template literals do.
> NOTE: If you violate this rules and force argument **raw: false**,
then SyntaxError will be thrown.

If values is an array, it's values will be used in provided order:
```javascript
const reuseTemplateTag = require('reuse-template-tag')

const template = reuseTemplateTag`first: ${1}, second: ${1}, third: ${1}`
console.log(
    template(['Me', 'You', 'We']) // first: Me, second: You, third: We
)
```

If values is an Object other than Array, it's keys will be used to determine
which value to replace with what:
```javascript
const reuseTemplateTag = require('reuse-template-tag')

const template = reuseTemplateTag`first: ${'me'}, second: ${'you'}, third: ${'we'}`
console.log(
    template({
        me: 'Andy',
        we: ['Andy', 'Joe'],
        you: 'Joe',
    }) // first: Andy, second: Joe, third: Andy,Joe
)
```

You can check if your template violates the rules of escape sequences with property -
`hasInvalidEscapeSequence`:
```javascript
const notViolated = reuseTemplateTag`\u{0041}` // A
const violated = reuseTemplateTag`\u{}` // By default will be return raw string: \u{}
console.log(
    notViolated(),
    notViolated.hasInvalidEscapeSequence
) // A false
console.log(
    violated(),
    violated.hasInvalidEscapeSequence
) // \u{} true

violated([], false) // -> will throw an error due to force of argument - raw:false
```

[mdn_template_literal_escape_rules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates_and_escape_sequences
[mdn_template_literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals