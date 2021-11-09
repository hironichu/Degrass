# Degrass

> A Deno+Rust+Wasm Sass compiler 
----
> :warning: DO NOT USE IN PRODUCTION. WHILE CERTAIN FEATURES MIGHT BE WORKING.
> STILL SUBJECT TO CHANGE AT ANY TIME.
-------

There are some features that doesn't work yet,
such as @import / @use and anything that requires calling an outside file.

Since I used the from_string() function of the rust library, it seems like it can't figure out where to import other files (it's probably not aware of the current dir)... But I am no rust dev, I don't know !



Thanks to @connorskees who made a module that works with WASM, I was able to recompile the rust version with Deno/ts bindings, here are the sources for the original NPM module https://www.npmjs.com/package/@connorskees/grass


I will Fork and republish my own version of Grass that works with Deno, but for now the focus is on polishing how the Typescript code look and work.

---

Here is a Basic idea on how it works 

You can use the str() function to return the compiled Sass, or the file to create a css file with the specified option 
To compile a list of file from a folder and its subfolders, here is an example

```ts
import { degrass } from "../src/mod.ts"


degrass(["tests/scss_test/**/**"], { format: "compressed",}).file({
	outputDir: "tests/newfolder",
	ext:".min.css"
})
```
Note that if the outputDir folder will be created if it doesn't exist.
> Every CSS file created are read/write only file (666)

Here is an example of compiling an inline Sass input and returns it as a string with .str() function
If you don't use any of .str() nor file(), the function should return a boolean value
Note : You can generate CSS file out of inline sass code, here are two exemple
```ts

const css = degrass(`
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* Use the variables */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}`).str()
//

degrass(`
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* Use the variables */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}
`, { format: "expanded",}).file({
	outputDir: "tests/newfolder",
	ext:".css",
	filename: "testfile"
})

```


If you want to contribute feel free !