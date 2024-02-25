import { transpile } from "deno_emit";

//deno run --allow-env --allow-read --allow-write --allow-net=deno.land emit.ts

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
  console.assert(!code?.includes("&amp;quot;test&amp;quot;"));
  console.log(code);
}
