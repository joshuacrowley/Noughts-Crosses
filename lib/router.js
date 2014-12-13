Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
	this.render('game');
});

Router.route('/menu', function () {
	this.render('game');
});

Router.route('/games/:_id', {
	name: 'games',
	template: 'game',
	data: function () {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": this.params._id}});
		Meteor.call('introducePlayer', this.params._id);
		return {
		boxes:Boxes.find({"gameToken": this.params._id}, { $sort : { boxOrder : -1}})
		}
	},
	render:'menu'
});