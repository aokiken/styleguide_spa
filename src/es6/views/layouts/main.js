import { View } from 'backbone';

export default View.extend({
  el: '#main',
  changeContent(dom) {
    this.$('.m-main').html(dom);
  },
});
