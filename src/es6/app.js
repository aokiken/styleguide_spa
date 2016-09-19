import Backbone from 'backbone';
import $ from 'jquery';
import CollectionDocuments from './collections/documents';
import CollectionDirectories from './collections/directories';
import ViewHeader from './views/layouts/header';
import ViewSidebar from './views/layouts/sidebar';
import ViewMain from './views/layouts/main';
import ViewDocuments from './views/controller/documents';
import Router from './routes/router';

let App = function Application() {
  let instance;
  App = () => instance;
  App.prototype = this;
  instance = new App();
  instance.constructor = App;

  instance.views = {};
  instance.models = {};
  instance.collections = {};
  instance.router = null;
  instance.initialize = () => {
    instance.collections.documents = new CollectionDocuments();
    instance.collections.directories = new CollectionDirectories();
    instance.views.header = new ViewHeader();
    instance.views.sidebar = new ViewSidebar();
    instance.views.main = new ViewMain();
    instance.views.documents = new ViewDocuments();
    $.when(
      instance.collections.documents.fetch(),
      instance.collections.directories.fetch()
    ).done(() => {
      instance.router = new Router();
      Backbone.history.start();
    });

    return instance;
  };
  return instance;
};

$(() => new App().initialize());

export default new App();
