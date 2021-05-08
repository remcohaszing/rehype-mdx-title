/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "First title";
function MDXContent(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h1>{"First title"}</_components.h1>{"\n"}<_components.h1>{"Second title"}</_components.h1></>;
  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
