/*@jsxRuntime automatic @jsxImportSource react*/
export const title = 'Hello '
function _createMdxContent(props) {
  const _components = {
    h1: 'h1',
    ...props.components
  }
  return (
    <_components.h1>
      {'Hello '}
      {title}
    </_components.h1>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
