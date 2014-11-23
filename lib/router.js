Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
	this.render('start');
});

Router.route('/menu', function () {
	this.render('menu');
});

Router.route('/games/:_id', {
	name: 'games',
	template: 'menu',
	data: function () {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": this.params._id}});
		return {
		boxes:Boxes.find({"gameToken": this.params._id}, { $sort : { boxOrder : -1}})
		}
	},
	render:'menu'
});