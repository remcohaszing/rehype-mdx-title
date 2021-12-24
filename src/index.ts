import { Program } from 'estree';
import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { Element } from 'hast';
import * as toString from 'hast-util-to-string';
import { Attacher } from 'unified';
import { Parent } from 'unist';
import * as visit from 'unist-util-visit';

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
 * @param options - Optional options to configure the output.
 * @returns A unified transformer.
 */
export const rehypeMdxTitle: Attacher<[RemarkMdxTitleOptions?]> = ({ name = 'title' } = {}) => {
  if (!isIdentifierName(name)) {
    throw new Error(`The name should be a valid identifier name, got: ${JSON.stringify(name)}`);
  }

  return (ast) => {
    visit<Element>(ast, { type: 'element', tagName: 'h1' }, (node) => {
      const value = toString(node);

      (ast as Parent).children.unshift({
        type: 'mdxjsEsm',
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
          } as Program,
        },
      });
      return visit.EXIT;
    });
  };
};
