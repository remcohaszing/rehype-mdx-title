/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const title = 'Level 2 header'
function _createMdxContent(props) {
  const _components = {
    h2: 'h2',
    h5: 'h5',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.h5>{'Level 5 header'}</_components.h5>
      {'\n'}
      <_components.h2>{'Level 2 header'}</_components.h2>
      {'\n'}
      <_components.h2>{'Another Level 2 header'}</_components.h2>
      {'\n'}
      <_components.p>
        {'High rank headers should take precedence over low rank headers.'}
      </_components.p>
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
