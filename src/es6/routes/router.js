import { Router } from 'backbone';
import app from '../app';

export default Router.extend({
  routes: {
    '': 'toppage',
    'directory/:directoryName': 'directory',
    'tag/:tagName': 'tag',
    'search/:query': 'search',
    'link/:model_cid': 'link',
    '*actions': 'moveToppage',
  },
  toppage: () => app.views.documents.toppage(),
  moveToppage: () => app.router.navigate('', { trigger: true }),
  directory: (directoryName) => app.views.documents.directory(directoryName),
  tag: (tagName) => app.views.documents.tag(tagName),
  search: (query) => app.views.documents.search(query),
  link: (modelCid) => app.views.documents.link(modelCid),
});
