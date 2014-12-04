Template.nextMove.helpers({
  nextMove: function () {
    return Meteor.user().profile.nextMove;
  }
});

Template.nextMove.events({
  "mouseenter .text": function (event, template) {
  console.log('crazy');
  },
});

Template.start.events({

"click .box": function (event, template) {

  var usersGame = Meteor.user().profile.currentGame; 
  var toGame = Games.find({"gameToken": usersGame}).fetch(); 
  var value = (Meteor.userId() == toGame[0]["owner"] ) ? "nought" : "cross";
  //if (true) {} else{};

  $(event.target).addClass('fadein');
  //Games.update({gameToken: usersGame}, {$set: {"state": value}});

  Boxes.update(this._id, {$set: {boxValue: value}});
  checkBoxes(value);
},

"click #start": function (event, template) {
  console.log("What up");    
  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "It's your turn"}});
  startGame();
  var usersGame = Meteor.user().profile.currentGame;
  Router.go('games', {_id: usersGame});
},

"click #reset": function (event, template) {
  Meteor.call('resetBoxes');
},

"click #join": function (event, template) {
}

});

Template.start.events({

  "click #play": function (event, template) {
    Router.go('/menu');
  }

});