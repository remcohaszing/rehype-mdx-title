import { type Element, type Root } from 'hast'
import { headingRank } from 'hast-util-heading-rank'
import { toString } from 'hast-util-to-string'
import { type Plugin } from 'unified'
import { define } from 'unist-util-mdx-define'
import { EXIT, visitParents } from 'unist-util-visit-parents'

export interface RemarkMdxTitleOptions extends define.Options {
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
const rehypeMdxTitle: Plugin<[RemarkMdxTitleOptions?], Root> =
  ({ maxRank = 1, name = 'title', ...options } = {}) =>
  (ast, file) => {
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
      define(ast, file, { [name]: { type: 'Literal', value: toString(heading) } }, options)
    }
  }

export default rehypeMdxTitle
