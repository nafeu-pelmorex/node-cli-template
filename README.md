# Node CLI Template

A template to bootstrap nodejs based command line interfaces

### Requirements

- OSX/Linux
- Node.js

### Installation

```
git clone https://github.com/nafeu-pelmorex/node-cli-template.git
cd node-cli-template
npm install
```

### Basic Usage

```
node-cli-template
```

### References

This CLI uses [arg](https://github.com/zeit/arg#readme) for argument option parsing and [Inquirer](http://adilapapaya.com/docs/inquirer/) for generating prompts:

#### Arg Usage Example

```bash
$ node ./hello.js --verbose -vvv --port=1234 -n 'My name' foo bar --tag qux --tag=qix -- --foobar
```

```javascript
// hello.js
const arg = require('arg');

const args = arg({
    // Types
    '--help':    Boolean,
    '--version': Boolean,
    '--verbose': arg.COUNT,   // Counts the number of times --verbose is passed
    '--port':    Number,      // --port <number> or --port=<number>
    '--name':    String,      // --name <string> or --name=<string>
    '--tag':     [String],    // --tag <string> or --tag=<string>

    // Aliases
    '-v':        '--verbose',
    '-n':        '--name',    // -n <string>; result is stored in --name
    '--label':   '--name'     // --label <string> or --label=<string>;
                              //     result is stored in --name
});

console.log(args);
/*
{
    _: ["foo", "bar", "--foobar"],
    '--port': 1234,
    '--verbose': 4,
    '--name': "My name",
    '--tag': ["qux", "qix"]
}
*/
```

#### Prompt Types using Inquirer

**List** - `{ type: "list" }`

`type, name, message, choices[, default, filter]` properties.
Default must be the choice index in the array or a choice value.

**Raw List** - `{ type: "rawlist" }`

`type, name, message, choices[, default, filter]` properties.
Default must the choice index in the array.

**Expand** - `{ type: "expand" }`

`type, name, message, choices[, default, filter]` properties.
Default must be the choice index in the array.

_Note that the choice object will take an extra parameter called key for the expand prompt. This parameter must be a single (lowercased) character. The h option is added by the prompt and shouldn't be defined by the user._

**Checkbox** - `{ type: "checkbox" }`

`type, name, message, choices[, filter, validate, default]` properties.
Default is expected to be an Array of the checked choices value. Choices marked as `{ checked: true }` will be checked by default.

**Confirm** - `{ type: "confirm" }`

`type, name, message[, default]` properties.
Default is expected to be a boolean if used.

**Input** - `{ type: "input" }`

`type, name, message[, default, filter, validate]` properties.

**Password** - `{ type: "password" }`

`type, name, message[, default, filter, validate]` properties.


### License

MIT