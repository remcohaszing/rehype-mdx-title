/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const title = 'Level 2 header'
function _createMdxContent(props) {
  const _components = {
    h2: 'h2',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.h2>{'Level 2 header'}</_components.h2>
      {'\n'}
      <_components.p>{'A level 2 header should be allowed.'}</_components.p>
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
