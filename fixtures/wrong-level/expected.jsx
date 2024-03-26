/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
    h2: 'h2',
    ...props.components
  }
  return <_components.h2>{'Level 2 header'}</_components.h2>
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
