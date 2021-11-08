# Degrass
> A Deno+Rust+Wasm Sass compiler 
----
> :warning: DO NOT USE. WHILE CERTAIN FEATURES MIGHT BE WORKING, MANY THINGS ARE
> STILL SUBJECT TO CHANGE AT ANY TIME.
-------


...a longer description is in the work...



Thanks to @connorskees, I was able to recompile the wasm version for Deno, here are the sources for the original NPM module https://www.npmjs.com/package/@connorskees/grass


I will Fork and republish my own version of Grass that works with Deno, but for now the focus is on polishing how the Typescript code look and work.

---

Here is a Basic idea on how it works 
```ts
import { compile } from "./src/mod.ts"

//You can use the to_string() function to return the compiled Sass, or the to_file to create a css file with the specified option 
//To compile a SCSS File (only .scss file are supported for now)
compile(`./tests/flashes.scss`, true).to_file({outputDir: "./out",outputFileFormat: ".min.css"})

//Here is an idea on how to generate CSS into a variable from Sass code
const css = compile(`
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* Use the variables */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}`).to_string()


```