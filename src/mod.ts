/**
 * 
 * @name DenoSass
 * @description A Deno module for compiling Sass to CSS in WASM
 * @author Nassim Zen 
 * 
 */

import {path, grass, ensureDirSync, expandGlobSync} from "./deps.ts"
import {InputFormat, SassOptions, FileOutputOpts} from "./types/_default.ts"
const ScriptURL = import.meta.url.replace(/^file:\/\//, "")
const defaults = {
	outfolder: "./out",
	format: "expanded",
}

class CompileResult  {
	private inputData: string | Set<{path: string, file: string}>
	private opts: SassOptions = {
		format: "expanded",
		quiet: true
	}
	private outputOpts: FileOutputOpts = {
		outputDir: "./out",
		ext: ".css", 
	}
	public output: any
	constructor (s: string | Set<{path: string, file: string}>, data:{opts?: SassOptions}) {
		this.inputData = s
		if (data.opts) this.opts = data.opts
		this.outputOpts.ext = (this.opts.format === "compressed") ? ".min.css" : ".css"
	}
	/**
	 * @name to_string
	 * @description Takes the string input and returns it as a compiled Css value. If a list of folder/file is defined, it will return a set of the compiled CSS values.
	 * @param option : any
	 * @returns A compiled CSS string
	 */
	public str () {
		if (typeof this.inputData !== "string") return this.file({}, true)
		return this.inputData
	}
	/**
	 * @name to_file
	 * @description Takes the string input and writes it to a corresponding file.
	 * @param option : any
	 * @returns 
	 */
	public file (opts?: FileOutputOpts, nogen?: boolean) {
		if (!this.inputData) throw "Input is not defined"
		if (!opts) opts = this.outputOpts
		if (opts.outputDir) {
			ensureDirSync(opts.outputDir)
		} else {
			ensureDirSync(defaults.outfolder)
		}
		this.output = ""
		const outputList = new Set<string>()
		//Loop through the inputData set, write a CSS file for each in the default output directory if not specified in opts
		if (typeof this.inputData === "string") {
			const filename = (opts.name) ? opts.name : Math.random().toString(36).substring(2, 7)
			try {
				Deno.writeTextFileSync(path.join(Deno.cwd(),filename) + opts.ext, this.inputData, { append: false, create: true, mode: 0o666 })
				outputList.add(path.join(Deno.cwd(),filename) + opts.ext)
			} catch (err) {
				throw err
			}
		} else {
			for (const file of this.inputData) {
				const fileinfo = file as {path: string, file: string}
				const filePath = path.parse(fileinfo.path)
				const outdir = opts.outputDir || defaults.outfolder
				const outputFormat = this.opts.format || defaults.format
				const outdirComplete = path.join(outdir, path.relative(Deno.cwd(), filePath.dir) || "")
				const outpath = path.join(outdirComplete, filePath.name) +  opts.ext
				const grassoutput = !filePath.name.startsWith('_') ? grass.file(fileinfo.path, outputFormat, {}) : ""
				if (!nogen) {
					try {
						if (!filePath.name.startsWith('_')) {
							ensureDirSync(outdirComplete)
							Deno.writeTextFileSync(outpath, grassoutput, { append: false, create: true, mode: 0o666 })
							outputList.add(outpath)
						}
					} catch (err) {
						throw err
					}
				} else {
					if (grassoutput.length) outputList.add(grassoutput)
				}
			}
		}
		return outputList.size ? outputList : false
	}
}

/**
 * @name exists
 * @description Checks if a file exists
 * @param filepath : string
 * @param opts : SassOptions
 * @returns boolean
 */
const exists = (filepath: string, opts?: any) => {
	if (!opts) opts = {
		quiet: true
	}
	try {
		Deno.openSync(filepath, { read: true, write: false });
		return true
	} catch (_error) {
		return false
	}
}
/**
 * @name readFolders
 * @description Reads a folder and returns a set of files
 * @param folders : string[]
 * @returns Set<{path: string, file: string}>
 */
const readFolders = (folders: string[]): Set<{path:string }> | boolean => {
	const fileList: Set<{path: string}> = new Set()
	for (const fileinfo of folders) {
		if (fileinfo.endsWith("/")) {
			const files = expandGlobSync(fileinfo + "**/*.scss")
			for (const file of files) {
				fileList.add({
					path: file.path
				})
			}
		} else {
			for (const file of expandGlobSync(fileinfo)) {
				if (file.isFile && path.parse(file.path).ext === ".scss") {
					fileList.add({
						path: file.path
					})
				}
				else continue;
			}
		}
	}
	if (fileList.size) {
		return fileList
	} else return false
}

/**
 * @name degrass
 * @description Takes an Sass input and converts it into a compressed CSS output
 * @param data : string | string[]
 * @param options : SassOptions
 * @returns CompileResult
 */

const degrass = (data: string | string[], options?: SassOptions) : any => {	
	//Definition of default options
	if (!options) options = {
		format: "expanded",
		quiet: true
	}
	// Defition of output variables
	let outputData: any
	let inputData: InputFormat
	//
	switch (typeof data) {
		case "string": {
			if (exists(data, options)) {
				const fileList: Set<{path: string, file: string}> = new Set()
				inputData = InputFormat.Files
				fileList.add({path: data, file: Deno.readTextFileSync(data)})
				outputData = fileList
			} else {
				inputData = InputFormat.String
				outputData = grass.str(data, options.format)
			}
		} break;
		case "object": {
			const fileList = readFolders(data)
			if (typeof fileList !== 'boolean' && fileList) {
				inputData = InputFormat.Files
				outputData = fileList
			}
		} break;
	}
	return new CompileResult(outputData, {opts: options})
}
export { degrass }