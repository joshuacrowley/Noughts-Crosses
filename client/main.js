Template.nextMove.helpers({
  nextMove: function () {
    return Meteor.user().profile.nextMove;
  }
});

Template.game.events({

"click .box": function (event, template) {
  
  var usersGame = Meteor.user().profile.currentGame;
  currentGame = Games.findOne({"gameToken": usersGame});
  nextTurn = (Meteor.userId() == currentGame.owner ) ? currentGame.opponent  : currentGame.owner; 
  value = (Meteor.userId() == currentGame.owner ) ? "nought" : "cross";

  var checkEmpty = function(){

if (this.boxValue == "empty") {
        $(event.target).addClass('fadein');
        Boxes.update(this._id, {$set: {boxValue: value}});
        checkBoxes(this._id, usersGame, value);
        if (currentGame.turnState == "game over"){
                Meteor.users.update({_id: player}, {$set: {"profile.nextMove": "You Won!"}});
      Meteor.users.update({_id: nextTurn}, {$set: {"profile.nextMove": "You Lost!"}});
          return};
        Games.update({_id: currentGame._id}, {$set: {"turnState": nextTurn}});
      }else{
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "That spot is taken."}});
    }
  };

  if (Meteor.userId() != currentGame.owner && currentGame.opponent == "none" ){
    Games.update({_id: currentGame._id}, {$set: {"opponent": Meteor.userId()}});
    checkEmpty.call(this);
    return;
  }else{
  };

  if (Meteor.userId()  == currentGame.turnState){
    checkEmpty.call(this);

  }else{
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "It's not your turn."}});
    return;
  };

},

"click #play": function (event, template) {
    Router.go('/menu');
  },

"click #start": function (event, template) {
  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "Invite another player to join the game by sharing the URL. You can make your first turn in the meantime."}});
  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.turn": Meteor.userId()}});

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
