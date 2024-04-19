import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { type Element, type Root } from 'hast'
import { headingRank } from 'hast-util-heading-rank'
import { toString } from 'hast-util-to-string'
import { type Plugin } from 'unified'
import { EXIT, visitParents } from 'unist-util-visit-parents'

export interface RemarkMdxTitleOptions {
  /**
   * The variable to export the title as.
   *
   * @default 'title'
   */
  name?: string

  /**
   * The maximum heading rank to consider.
   *
   * @default 1
   */
  maxRank?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * A rehype plugin to expose the MDX page title as string.
 *
 * @param options
 *   Optional options to configure the output.
 * @returns
 *   A unified transformer.
 */
const rehypeMdxTitle: Plugin<[RemarkMdxTitleOptions?], Root> = ({
  maxRank = 1,
  name = 'title'
} = {}) => {
  if (!isIdentifierName(name)) {
    throw new Error(`The name should be a valid identifier name, got: ${JSON.stringify(name)}`)
  }

  return (ast) => {
    let heading: Element | undefined
    let bestRank = maxRank + 1

    visitParents(ast, 'element', (node) => {
      const rank = headingRank(node)
      if (rank && rank < bestRank) {
        bestRank = rank
        heading = node
      }

      if (rank === 1) {
        return EXIT
      }
    })

    if (heading) {
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
                      init: { type: 'Literal', value: toString(heading) }
                    }
                  ]
                }
              }
            ]
          }
        }
      })
    }
  }
}

export default rehypeMdxTitle
