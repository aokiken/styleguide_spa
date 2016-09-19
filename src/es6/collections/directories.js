import { Collection } from 'backbone';
import ModelDirectory from '../models/directory';

export default Collection.extend({
  url: './directories.json',
  model: ModelDirectory,
});
