export default {
	struct: (e) => {
		const {path, value, type} = e;
		const [key] = path;
		const error = new Error();

		if (value === undefined) {
			error.message = `user_${key}_required`;
			error.attribute = key;
		} else if (type === undefined) {
			error.message = `user_attribute_unknown`;
			error.attribute = key;
		} else {
			error.message = `user_${key}_invalid`;
			error.attribute = key;
			error.value = value;
		}
		return error;
	}
}
