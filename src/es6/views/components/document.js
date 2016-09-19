import _ from 'underscore';
import { View } from 'backbone';
import prism from 'prismjs';

export default View.extend({
  attributes: {
    class: '_item',
  },
  events: {
    'click .js_hook_toggle_document_code_body': 'js_hook_toggle_document_code_body',
  },
  initialize() {
    this.render();
    return this;
  },
  js_hook_toggle_document_code_body() {
    this.$('._body').toggleClass('_hidden');
  },
  template: _.template('document.pug'),
  render() {
    this.$el.html(this.template({ document: this.model }));
    const html = prism.highlight(this.model.get('code'), prism.languages.html);
    this.$('._code ._body').html(html);
    return this;
  },
});
