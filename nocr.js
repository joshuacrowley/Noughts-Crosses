Boxes = new Mongo.Collection("boxes");
Games = new Mongo.Collection("games");

Router.configure({
  layoutTemplate: 'home'
});


if (Meteor.isClient) {

Router.route('/games/:_id', function () {
  var params = this.params; // { _id: "5" }
  var id = params._id; // "5"
  
  return Boxes.find({currentGame: id}, {sort: {createdAt: -1}});

});


function startGame () {

  var token = Random.id([8]);

  console.log(token);

  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": token}});

  Games.insert({
    gameToken: token,
    state: "ready",
    createdAt: new Date()
  });

  for (var i = 1; i <= 9; i++) {

    Boxes.insert({
      gameToken: token,
      boxValue: "empty",
      createdAt: new Date()
    });
  };

  Router.go('/games/'+token);

};

Router.route('/', function () {

  this.render('home');

Template.home.helpers({
    boxes: function () {
    // Show newest tasks first
    //return Boxes.find({currentGame: token}, {sort: {createdAt: -1}});
  }
  });

Template.home.events({

  "click .box": function (event, template) {
    console.log("clicked");
    Boxes.update(this._id, {$set: {boxValue: "clicked"}});
    //Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": token}});
  },

  "click #start": function (event, template) {    
    console.log("start");
    //Boxes.update(this._id, {$set: {currentGame: token}});
    startGame();
  },

  "click #reset": function (event, template) {
    Meteor.call('resetBoxes');
  }


  });

  });

  }

if (Meteor.isServer) {

    Meteor.methods({
      resetBoxes: function () {
        console.log("Maybe");    
        Boxes.update({currentGame: "joshua"}, {$set: {boxValue: "empty"}}, {multi:true});
      }
    })

  }  

  
  Meteor.startup(function () {

  });
