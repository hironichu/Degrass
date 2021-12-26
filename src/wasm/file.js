export function read_fs(path) {
	if (is_file(path)) {
		return Deno.readTextFileSync(path)
	} return ""
}

export function is_file(path) {
	try {
		const file = Deno.lstatSync(path)
		return file.is_file
	} catch (e) {
		return false
	}
}

export function is_dir(path) {
	try {
		const file = Deno.lstatSync(path)
		return file.is_dir
	} catch (e) {
		return false
	}
}