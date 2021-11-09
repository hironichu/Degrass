export enum InputFormat {
	Files,
	String,
}

export type SassOptions = {
	format: "compressed" | "expanded",
	quiet?: boolean
}

// Note, the Name prop is only used when using inline Sass
export type FileOutputOpts = {
	outputDir?: string
	ext?: ".min.css" | ".css"
	name?: string
}



