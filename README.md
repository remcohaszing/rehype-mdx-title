# rehype-mdx-title

[![github actions](https://github.com/remcohaszing/rehype-mdx-title/actions/workflows/ci.yml/badge.svg)](https://github.com/remcohaszing/rehype-mdx-title/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/rehype-mdx-title)](https://www.npmjs.com/package/rehype-mdx-title)
[![codecov](https://codecov.io/gh/remcohaszing/rehype-mdx-title/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/rehype-mdx-title)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A [rehype](https://github.com/rehypejs/rehype) MDX plugin for exposing the page title

## Installation

```sh
npm install rehype-mdx-title
```

## Usage

This plugins exports the page title as a string. If multiple level 1 headers are found, the first
one in the document is used. The header is converted to a string using
[`mdast-util-to-string`](https://github.com/syntax-tree/mdast-util-to-string#readme)

For example, given a file named `example.mdx` with the following contents:

```mdx
# The [answer](https://www.google.com/search?q=What+is+answer+to+life+the+universe+and+everything) to _life_, the `universe`, and **everything**

{title} is 42
```

The following script:

```js
import { readFile } from 'fs/promises';

import { compile } from '@mdx-js/mdx';
import rehypeMdxTitle from 'rehype-mdx-title';

const { contents } = await compile(await readFile('example.mdx'), {
  jsx: true,
  rehypePlugins: [rehypeMdxTitle],
});
console.log(contents);
```

Roughly yields:

```jsx
export const title = 'The answer to life, the universe, and everything';

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
  );
}
```

Use [`rehype-raw`](https://github.com/rehypejs/rehype-raw) if you wish to use custom `<h1>` headers.
This only works if the MDX `format` option is set to `'md'`. Beware this also changes the MDX
component output.

### Options

#### `name`

The name of the variable to export the title as. (default: `'title'`)

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
