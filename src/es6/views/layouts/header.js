import { View } from 'backbone';
import ComponentSearch from '../components/search';

export default View.extend({
  el: '#header',
  initialize() {
    this.search = new ComponentSearch();
  },
  setTitle(title) {
    this.$('#header_heading').html(title);
  },
});
