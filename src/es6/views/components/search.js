import { View } from 'backbone';
import app from '../../app';

export default View.extend({
  el: '#search',
  events: {
    'keypress .js_hook_search': 'js_hook_search',
  },
  js_hook_search(e) {
    const ENTER_KEY = 13;
    if (e.which === ENTER_KEY && this.$('._input-text').val().trim()) {
      app.router.navigate(`search/${this.$('._input-text').val()}`, { trigger: true });
      this.$('._input-text').val('');
    }
  },
});
