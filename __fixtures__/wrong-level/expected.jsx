/*@jsxRuntime automatic @jsxImportSource react*/
function MDXContent(_props) {
  const _components = Object.assign({
    h2: "h2"
  }, _props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h2>{"Level 2 header"}</_components.h2></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
