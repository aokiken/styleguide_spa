import _ from 'underscore';
import { View } from 'backbone';
import app from '../../app';

export default View.extend({
  el: '#sidebar',
  linksTemplate: _.template('layouts/sidebar.pug'),
  setLinks(currentDirectory) {
    this.$('#sidebar_list').html(this.linksTemplate({
      currentDirectory: currentDirectory,
      directories: app.collections.directories,
    }));
  },
});
