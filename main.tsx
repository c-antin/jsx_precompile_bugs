import { ComponentChildren } from "preact";
import render from "preact-render-to-string";

//deno run main.tsx

const Component = (
  props: { children?: ComponentChildren },
) => {
  return <>{props.children}</>;
};

const Show = (
  props: {
    when: boolean;
    fallback?: ComponentChildren;
    children?: ComponentChildren;
  },
) => {
  if (props.when) {
    return <>{props.children}</>;
  }
  return <>{props.fallback}</>;
};

{
  const jsx = (
    <Component>
      "test"
      <span>test</span>
    </Component>
  );
  const html = render(jsx);
  console.log("preact empty bug:", html);
  console.assert(html === "&quot;test&quot;<span>test</span>");
}
{
  const jsx = (
    <Component>
      "test"
    </Component>
  );
  const html = render(jsx);
  console.log("preact double escape bug:", html);
  console.assert(html === "&quot;test&quot;");
}
{
  const jsx = (
    <Show when={false} fallback={<>"false"</>}>
      "true"
    </Show>
  );
  const html = render(jsx);
  console.log("fragment prop triple escape bug:", html);
  console.assert(html === "&quot;test&quot;");
}
