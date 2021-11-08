/**
 * 
 * @name DenoSass
 * @description A Deno module for compiling Sass to CSS in WASM
 * @author Nassim Zen 
 * 
 */

import {path, grass, ensureDirSync} from "./deps.ts"

enum InputFormat {
	File = "file",
	String = "string",
}
enum outputext {
	min = "min.css",
	css = ".css"
}
export type SassOptions = {
	format: string
	quiet?: boolean
}
export type FileOutputOpts = {
	outputDir?: string
	outputFileFormat?: ".min.css" | ".css" 
}

type Sass = ""

class CompileResult  {
	private output: string
	private filename?: path.ParsedPath
	private opts: SassOptions = {
		format: "compressed",
		quiet: true
	}
	constructor (s: string, data:{filename?: path.ParsedPath, opts?: SassOptions}) {
		this.output = s
		const opts = data.opts
		if (data.filename) this.filename = data.filename
		if (opts) {
			this.opts = opts
		}
	}
	public to_string (option?: any) {
		const grassoutput = grass(this.output, this.opts.format)
		return grassoutput
	}
	public to_file (option?: FileOutputOpts) {
		if (!this.filename) throw "filename is not defined"
		if (option) {
			if (option.outputDir) {
				ensureDirSync(option.outputDir)
			} else {
				ensureDirSync("./")
			}
			if (!option.outputFileFormat) {
				option.outputFileFormat = outputext.css
			}
		} else {
			option = {
				outputDir: "./",
				outputFileFormat: ".css"
			}
		}
		const grassoutput = grass(this.output, this.opts.format)
		const scssfileName = this.filename
		const cssfileName = option.outputDir + '/' + scssfileName.name + option.outputFileFormat
		const file = Deno.writeTextFileSync(cssfileName, grassoutput, { append: false, create: true, mode: 0o666 })
		return file
	}
}


const compile = (data: string, input?:boolean,options?: SassOptions | null,) : any => {
	if (!options) options = {
		format: "compressed",
		quiet: true
	};
	let outputData: any
	let inputData: any
	inputData = (!input) ? InputFormat.String : InputFormat.File
	let scssfileName: any

	if (inputData === InputFormat.File) {
		scssfileName = path.parse(data)
		if (scssfileName.ext !== ".scss") {
			throw ("File is not a scss file")
		}
		let file
		try {
			file = Deno.openSync(data, { read: true, write: false });
		} catch (error) {
			throw (`Could not open the requested file ${data}`)
		}  finally {
			if (file) file.close()
		}
		outputData = Deno.readTextFileSync(data);
	} else {
		outputData = data
	}
	
	!options.quiet ? console.info(`Input size : ${outputData.length}kb`) : ''
	return new CompileResult(outputData, (inputData !== InputFormat.File) ? {opts: options} : {filename: scssfileName, opts: options})
}
export {compile}