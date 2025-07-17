import AJV from 'ajv';
import schema from '@/schemes/store.json';

const validate = (json: string) => {
  const ajv = new AJV({ schemaId: '$id' });
  return ajv.validate(schema, json);
};

export default validate;
