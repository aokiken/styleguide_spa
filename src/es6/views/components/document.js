import _ from 'underscore';
import { View } from 'backbone';
import prism from 'prismjs';
import Clipboard from 'clipboard';

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
  setPrism() {
    const html = prism.highlight(this.model.get('code'), prism.languages.html);
    this.$('._code ._body').append(html);
  },
  setClipboard(){
    const showTooltip = (elem, msg) => {
      elem.setAttribute('class', '_copy-icon btn js_hook_copy_code tooltipped tooltipped-s');
      elem.setAttribute('aria-label', msg);
    };
    const fallbackMessage = (action) => {
      var actionMsg = '';
      var actionKey = (action === 'cut' ? 'X' : 'C');
      if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
      } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
      } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
      }
      return actionMsg;
    };
    const js_hook_copy_code = this.el.getElementsByClassName('js_hook_copy_code');
    this.$('.js_hook_copy_code').on('mouseleave', (e) => {
      e.currentTarget.setAttribute('class', '_copy-icon btn js_hook_copy_code');
      e.currentTarget.removeAttribute('aria-label');
    });
    const clipboard_js_hook_copy_code = new Clipboard(js_hook_copy_code);
    clipboard_js_hook_copy_code.on('success', (e) => {
      e.clearSelection();
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      showTooltip(e.trigger, 'Copied!');
    });
    clipboard_js_hook_copy_code.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
      showTooltip(e.trigger, fallbackMessage(e.action));
    });
  },
  template: _.template('document.pug'),
  render() {
    this.$el.html(this.template({ document: this.model }));
    this.setPrism();
    this.setClipboard();
    return this;
  },
});
