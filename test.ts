import { readdir, readFile, writeFile } from 'fs/promises';
import process from 'process';

import { compile, compileSync } from '@mdx-js/mdx';
import rehypeRaw from 'rehype-raw';
import { toVFile } from 'to-vfile';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { rehypeMdxTitle } from './index.js';

const fixtureDir = new URL('__fixtures__/', import.meta.url);
const tests = await readdir(fixtureDir);

for (const name of tests) {
  test(name, async () => {
    const path = new URL(`${name}/`, fixtureDir);
    let input;
    try {
      input = await toVFile.read(new URL('input.mdx', path));
    } catch {
      input = await toVFile.read(new URL('input.md', path));
    }
    const expected = new URL('expected.jsx', path);
    const options = JSON.parse(await readFile(new URL('options.json', path), 'utf8'));
    const { value } = await compile(input, {
      rehypePlugins: [[rehypeMdxTitle, options]],
      jsx: true,
    });
    if (process.argv.includes('--write')) {
      await writeFile(expected, value);
    }
    assert.equal(value, await readFile(expected, 'utf8'));
  });
}

test('invalid name', () => {
  assert.throws(
    () =>
      compileSync('# foo', {
        rehypePlugins: [[rehypeMdxTitle, { name: 'Not valid' }]],
        jsx: true,
      }),
    'The name should be a valid identifier name, got: "Not valid"',
  );
});

test('combine with rehype-raw', () => {
  assert.equal(
    String(
      compileSync('<h1>Hello <span>World!</span></h1>', {
        format: 'md',
        rehypePlugins: [[rehypeRaw], [rehypeMdxTitle]],
        jsx: true,
      }),
    ),
    `/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Hello World!";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    span: "span"
  }, props.components);
  return <_components.h1>{"Hello "}<_components.span>{"World!"}</_components.span></_components.h1>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
`,
  );
});

test.run();