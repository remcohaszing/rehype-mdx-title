# rehype-mdx-title

[![github actions](https://github.com/remcohaszing/rehype-mdx-title/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/rehype-mdx-title/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/rehype-mdx-title/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/rehype-mdx-title)
[![npm version](https://img.shields.io/npm/v/rehype-mdx-title)](https://www.npmjs.com/package/rehype-mdx-title)
[![npm downloads](https://img.shields.io/npm/dm/rehype-mdx-title)](https://www.npmjs.com/package/rehype-mdx-title)

A [rehype](https://github.com/rehypejs/rehype) MDX plugin for exposing the page title

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Options](#options)
- [Compatibility](#compatibility)
- [License](#license)

## Installation

```sh
npm install rehype-mdx-title
```

## Usage

This plugins exports the page title as a string. If multiple matching headers are found, othe
highest ranking header is used. If multiple headers are found with the same rank, the first one in
the document is used. The header is converted to a string using
[`mdast-util-to-string`](https://github.com/syntax-tree/mdast-util-to-string#readme)

For example, given a file named `example.mdx` with the following contents:

```mdx
# The [answer](https://www.google.com/search?q=What+is+answer+to+life+the+universe+and+everything) to _life_, the `universe`, and **everything**

{title} is 42
```

The following script:

```js
import { readFile } from 'node:fs/promises'

import { compile } from '@mdx-js/mdx'
import rehypeMdxTitle from 'rehype-mdx-title'

const { value } = await compile(await readFile('example.mdx'), {
  jsx: true,
  rehypePlugins: [rehypeMdxTitle]
})
console.log(value)
```

Roughly yields:

```jsx
export const title = 'The answer to life, the universe, and everything'

export default function MDXContent() {
  return (
    <>
      <h1>
        {'The '}
        <a href="https://www.google.com/search?q=What+is+answer+to+life+the+universe+and+everything">
          answer
        </a>
        {' to '}
        <em>life</em>
        {', the '}
        <code>universe</code>
        {', and '}
        <strong>everything</strong>
      </h1>
      <p>
        {title}
        {' is 42'}
      </p>
    </>
  )
}
```

Use [`rehype-raw`](https://github.com/rehypejs/rehype-raw) if you wish to use custom `<h1>` headers.
This only works if the MDX `format` option is set to `'md'`. Beware this also changes the MDX
component output.

## API

### Options

- `name` (`string`) — The name of the variable to export the title as. (default: `'title'`)
- `maxRank` (`number`) — The maximum heading rank to consider. (default: `1`)

In addition it supports `unist-util-mdx-define`
[options](https://github.com/remcohaszing/unist-util-mdx-define#options).

## Compatibility

This project is compatible with Node.js 16 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
