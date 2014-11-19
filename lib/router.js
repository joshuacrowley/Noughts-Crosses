Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {

	this.layout('menu');

});


Router.route('/games/:_id', {
	
	template: 'menu',
	data: function () {
		return {
		boxes:Boxes.find({"gameToken": this.params._id})
	}
	},

	action: function () {
    this.render();
  	}

});