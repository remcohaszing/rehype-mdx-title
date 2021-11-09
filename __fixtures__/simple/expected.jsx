/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Hello {title}";
function MDXContent(props = {}) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h1>{"Hello {title}"}</_components.h1></>;
  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
