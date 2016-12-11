export const QUERY_LIMIT = 6 * 5;

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

// Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

import './accounts.js';
import './main';
import './dashboard';
import './loading.js';
