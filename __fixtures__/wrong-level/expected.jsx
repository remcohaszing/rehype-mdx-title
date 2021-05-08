/*@jsxRuntime automatic @jsxImportSource react*/
function MDXContent(props) {
  const _components = Object.assign({
    h2: "h2"
  }, props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h2>{"Level 2 header"}</_components.h2></>;
  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
