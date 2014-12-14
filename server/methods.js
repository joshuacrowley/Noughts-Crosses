Meteor.methods({
  resetBoxes: function () {
  console.log("Maybe");
  var usersGame = Meteor.user().profile.currentGame;    
  Boxes.update({gameToken: usersGame}, {$set: {boxValue: "empty"}}, {multi:true});
  },

  wrapUpGame : function(nextTurn, currentGame, player){
  	console.log(nextTurn);
  	console.log(currentGame._id);
  	console.log(player);


    console.log("Game wrapped");
  },

  tellPlayer: function(otherPlayer){
  	Meteor.users.update({_id: otherPlayer}, {$set: {"profile.nextMove": "It's your turn."}});
  },

  introducePlayer: function(gameID){

	setGame = Games.findOne({"gameToken": gameID});

		if (Meteor.userId() != setGame.owner && setGame.opponent != "none" ){
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "Your watching someone else's game"}});
		};

		if (Meteor.userId() != setGame.owner && setGame.opponent == "none" ){
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "It's your turn."}});
		}
  }

})