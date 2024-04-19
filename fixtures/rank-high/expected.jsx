/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
    h2: 'h2',
    p: 'p',
    strong: 'strong',
    ...props.components
  }
  return (
    <>
      <_components.h2>{'Level 2 header'}</_components.h2>
      {'\n'}
      <_components.p>
        {'A level 2 header should '}
        <_components.strong>{'not'}</_components.strong>
        {' be allowed.'}
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
