/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "strong, code, emphasis, and links";
function MDXContent(_props) {
  const _components = Object.assign({
    h1: "h1",
    strong: "strong",
    code: "code",
    em: "em",
    a: "a"
  }, _props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.h1><_components.strong>{"strong"}</_components.strong>{", "}<_components.code>{"code"}</_components.code>{", "}<_components.em>{"emphasis"}</_components.em>{", and "}<_components.a href="https://example.com">{"links"}</_components.a></_components.h1></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
