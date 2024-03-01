import { ComponentChildren } from "preact";
import render from "preact-render-to-string";

//deno run main.tsx

const Component = (
  props: { children?: ComponentChildren },
) => {
  return <>{props.children}</>;
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
