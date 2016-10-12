import { View } from 'backbone';
import Document from '../components/document';
import app from '../../app';

export default View.extend({
  attributes: {
    class: '_wrapper',
  },
  initialize() {
    app.views.main.changeContent(this.el);
  },
  tmp: [],
  clear() {
    this.tmp.forEach((tmp) => {
      tmp.remove();
    });
    this.tmp = [];
  },
  toppage() {
    this.clear();
    app.views.sidebar.setLinks('');
    app.views.header.setTitle('all');
    app.collections.documents.models.forEach((document) => {
      const doc = new Document({ model: document });
      this.tmp.push(doc);
      this.$el.append(doc.el);
    });
  },
  directory(directoryName) {
    this.clear();
    app.views.sidebar.setLinks(directoryName);
    app.views.header.setTitle(`folder:${directoryName}`);
    app.collections.documents.models.forEach((document) => {
      if (document.attributes.directory === directoryName) {
        const doc = new Document({ model: document });
        app.views.documents.tmp.push(doc);
        app.views.documents.$el.append(doc.el);
      }
    });
  },
  tag(tagName) {
    this.clear();
    app.views.sidebar.setLinks('');
    app.views.header.setTitle(`tag:${tagName}`);
    app.collections.documents.models.forEach((document) => {
      if (document.attributes.tags.indexOf(tagName) !== -1) {
        const doc = new Document({ model: document });
        app.views.documents.tmp.push(doc);
        app.views.documents.$el.append(doc.el);
      }
    });
  },
  search(query) {
    this.clear();
    app.views.sidebar.setLinks('');
    app.views.header.setTitle(`search:${query}`);
    app.collections.documents.models.forEach((document) => {
      let flag = false;
      Object.keys(document.attributes).forEach((key) => {
        if (!flag) {
          flag = document.attributes[key].indexOf(query) !== -1;
        }
      });
      if (flag) {
        const doc = new Document({ model: document });
        app.views.documents.tmp.push(doc);
        app.views.documents.$el.append(doc.el);
      }
    });
  },
  link(modelId) {
    this.clear();
    app.views.sidebar.setLinks('');
    app.views.header.setTitle(`link:${modelId}`);
    const doc = new Document({model: app.collections.documents.get({id: modelId})});
    app.views.documents.tmp.push(doc);
    app.views.documents.$el.append(doc.el);
  },
});
