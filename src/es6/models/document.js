import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    title: '',
    directory: '',
    description: '',
    tags: [],
    classes: [],
    pug: '',
    code: '',
    url: '',
  },
});
