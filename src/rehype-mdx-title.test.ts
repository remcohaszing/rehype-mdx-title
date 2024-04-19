import assert from 'node:assert/strict'
import { test } from 'node:test'

import { compileSync } from '@mdx-js/mdx'
import rehypeMdxTitle from 'rehype-mdx-title'
import rehypeRaw from 'rehype-raw'
import { assertEqual, testFixturesDirectory } from 'snapshot-fixtures'

testFixturesDirectory({
  directory: new URL('../fixtures', import.meta.url),
  prettier: true,
  tests: {
    'expected.jsx'(file, options) {
      return compileSync(file, {
        rehypePlugins: [[rehypeMdxTitle, options]],
        jsx: true
      })
    }
  }
})

test('invalid name', () => {
  assert.throws(
    () =>
      compileSync('# foo', {
        rehypePlugins: [[rehypeMdxTitle, { name: 'Not valid' }]],
        jsx: true
      }),
    (error) => {
      assert(error instanceof Error)
      assert.equal(error.message, 'The name should be a valid identifier name, got: "Not valid"')
      assert.equal(error.cause, 'Not valid')
      return true
    }
  )
})

test('combine with rehype-raw', () => {
  assertEqual(
    String(
      compileSync('<h1>Hello <span>World!</span></h1>', {
        format: 'md',
        rehypePlugins: [[rehypeRaw], [rehypeMdxTitle]],
        jsx: true
      })
    ),
    `/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const title = "Hello World!";
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    span: "span",
    ...props.components
  };
  return <_components.h1>{"Hello "}<_components.span>{"World!"}</_components.span></_components.h1>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
`
  )
})
