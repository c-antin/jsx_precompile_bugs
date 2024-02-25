import { ComponentChildren } from "preact";
import render from "preact-render-to-string";
import { transpile } from "deno_emit";

//deno run --allow-env --allow-read --allow-write --allow-net=deno.land main.tsx

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
  console.log("triple escape bug:", html);
  console.assert(html === "&quot;test&quot;");
}
{
  const url = new URL("./main.tsx", import.meta.url);
  const result = await transpile(url, {
    importMap: "./import_map.json",
    compilerOptions: {
      jsx: "precompile",
      jsxImportSource: "preact",
    },
  });
  const code = result.get(url.href);
  // console.log(code);
  console.assert(!code?.includes("&amp;quot;test&amp;quot;"));
}
