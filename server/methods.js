Meteor.methods({
  resetBoxes: function () {
  console.log("Maybe");
  var usersGame = Meteor.user().profile.currentGame;    
  Boxes.update({gameToken: usersGame}, {$set: {boxValue: "empty"}}, {multi:true});
  }
})