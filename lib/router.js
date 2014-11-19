Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {

	this.layout('menu');

});


Router.route('/games/:_id', function () {

	this.layout('menu', {
		data: function () { return Boxes.find({gameToken: this.params._id})}
	});

	this.render('menu');
	console.log(this.params._id)
});