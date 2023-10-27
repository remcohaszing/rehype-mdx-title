/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "strong, code, emphasis, and links";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h1: "h1",
    strong: "strong",
    ...props.components
  };
  return <_components.h1><_components.strong>{"strong"}</_components.strong>{", "}<_components.code>{"code"}</_components.code>{", "}<_components.em>{"emphasis"}</_components.em>{", and "}<_components.a href="https://example.com">{"links"}</_components.a></_components.h1>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
