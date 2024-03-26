/*@jsxRuntime automatic @jsxImportSource react*/
export const title = 'First title'
function _createMdxContent(props) {
  const _components = {
    h1: 'h1',
    ...props.components
  }
  return (
    <>
      <_components.h1>{'First title'}</_components.h1>
      {'\n'}
      <_components.h1>{'Second title'}</_components.h1>
    </>
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
