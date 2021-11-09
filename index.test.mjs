import { promises as fs, readdirSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';

import { compile, compileSync } from '@mdx-js/mdx';
import rehypeRaw from 'rehype-raw';
import test from 'tape';
import toVfile from 'to-vfile';

const { rehypeMdxTitle } = createRequire(import.meta.url)('./src/index.ts');

const tests = readdirSync('__fixtures__');

for (const name of tests) {
  test(name, async (t) => {
    const path = join('__fixtures__', name);
    let input;
    try {
      input = await toVfile.read(join(path, 'input.mdx'));
    } catch {
      input = await toVfile.read(join(path, 'input.md'));
    }
    const expected = join(path, 'expected.jsx');
    const options = JSON.parse(await fs.readFile(join(path, 'options.json')));
    const { value } = await compile(input, {
      rehypePlugins: [[rehypeMdxTitle, options]],
      jsx: true,
    });
    if (process.argv.includes('--write')) {
      await fs.writeFile(expected, value);
    }
    t.equal(value, await fs.readFile(expected, 'utf8'));
    t.end();
  });
}

test('invalid name', (t) => {
  t.throws(
    () =>
      compileSync('# foo', {
        rehypePlugins: [[rehypeMdxTitle, { name: 'Not valid' }]],
        jsx: true,
      }),
    'The name should be a valid identifier name, got: "Not valid"',
  );
  t.end();
});

test('combine with rehype-raw', (t) => {
  t.equal(
    String(
      compileSync('<h1>Hello <span>World!</span></h1>', {
        format: 'md',
        rehypePlugins: [[rehypeRaw], [rehypeMdxTitle]],
        jsx: true,
      }),
    ),
    `/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Hello World!";
function MDXContent(props = {}) {
  const _components = Object.assign({
    h1: "h1",
    span: "span"
  }, props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h1>{"Hello "}<_components.span>{"World!"}</_components.span></_components.h1></>;\n  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
`,
  );
  t.end();
});
