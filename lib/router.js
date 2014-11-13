Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'home'});

Router.route('/games/:_id', {
  name: 'games',
  data: function() { return Posts.findOne(this.params._id); }
});