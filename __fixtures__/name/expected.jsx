/*@jsxRuntime automatic @jsxImportSource react*/
export const pageTitle = "Custom export name";
function MDXContent(_props) {
  const _components = Object.assign({
    h1: "h1"
  }, _props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h1>{"Custom export name"}</_components.h1></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
