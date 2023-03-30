import AJV from 'ajv';
import schema from '../schemes/store';

const validate = (json) => {
	const ajv = new AJV({schemaId: 'auto'});
	return ajv.validate(schema, json);
}

export default validate;
