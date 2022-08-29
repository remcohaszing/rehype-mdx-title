import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { Element, Root } from 'hast';
import { toString } from 'hast-util-to-string';
import { MdxjsEsm } from 'mdast-util-mdx';
import { Plugin } from 'unified';
import { EXIT, visit } from 'unist-util-visit';

export interface RemarkMdxTitleOptions {
  /**
   * The variable to export the title as.
   *
   * @default title
   */
  name?: string;
}

/**
 * A rehype plugin to expose the MDX page title as string.
 *
 * @param options Optional options to configure the output.
 * @returns A unified transformer.
 */
export const rehypeMdxTitle: Plugin<[RemarkMdxTitleOptions?], Root> = ({ name = 'title' } = {}) => {
  if (!isIdentifierName(name)) {
    throw new Error(`The name should be a valid identifier name, got: ${JSON.stringify(name)}`);
  }

  return (ast) => {
    visit(ast, { type: 'element', tagName: 'h1' }, (node: Element) => {
      const value = toString(node);

      ast.children.unshift({
        type: 'mdxjsEsm',
        value: '',
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: [
              {
                type: 'ExportNamedDeclaration',
                source: null,
                specifiers: [],
                declaration: {
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: { type: 'Identifier', name },
                      init: {
                        type: 'Literal',
                        value,
                        raw: JSON.stringify(value),
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      } as MdxjsEsm);
      return EXIT;
    });
  };
};
