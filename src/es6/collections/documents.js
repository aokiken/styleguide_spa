import { Collection } from 'backbone';
import ModelDocument from '../models/document';

export default Collection.extend({
  url: './documents.json',
  model: ModelDocument,
});
