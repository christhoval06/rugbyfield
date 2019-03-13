import AJV from 'ajv';
import schema from '../schemes/store';

export default (json) => {
	const ajv = new AJV({schemaId: 'auto'});
	return ajv.validate(schema, json);
}
