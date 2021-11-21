export function read_fs(path) {
	if (is_file(path)) {
		return Deno.readTextFileSync(path)
	} return ""
}

export function is_file(path) {
	try {
		const file = Deno.lstatSync(path)
		if (file.isFile) {
			return true
		} else {
			return false
		}
	} catch (e) {
		return false
	}
}

export function is_dir(path) {
	// console.log(path)
	try {
		const dir =  Deno.lstatSync(path)
		if (file.is_dir) {
			return true
		} else {
			return false
		}
	} catch (e) {
		return false
	}
}