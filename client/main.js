Boxes = new Mongo.Collection("boxes");
Games = new Mongo.Collection("games");



function checkBoxes (){
    var usersGame = Meteor.user().profile.currentGame;
    var toCheck = Boxes.find({"gameToken": usersGame}, { $sort : { boxOrder : -1}}).fetch();
    var toGame = Games.find({"gameToken": usersGame}).fetch();
    console.log(toCheck[1]);
    console.log(toGame);

    var value = (Meteor.userId() == toGame[0]["owner"] ) ? "nought" : "cross";
    console.log(value);
    
    if (    
      (toCheck[0]["boxValue"] == value && toCheck[1]["boxValue"] == value && toCheck[2]["boxValue"] == value) || 
      (toCheck[3]["boxValue"] == value && toCheck[4]["boxValue"] == value && toCheck[5]["boxValue"] == value) ||
      (toCheck[6]["boxValue"] == value && toCheck[7]["boxValue"] == value && toCheck[8]["boxValue"] == value) ||
      (toCheck[0]["boxValue"] == value && toCheck[3]["boxValue"] == value && toCheck[6]["boxValue"] == value) ||
      (toCheck[1]["boxValue"] == value && toCheck[4]["boxValue"] == value && toCheck[7]["boxValue"] == value) ||
      (toCheck[2]["boxValue"] == value && toCheck[5]["boxValue"] == value && toCheck[8]["boxValue"] == value) ||
      (toCheck[0]["boxValue"] == value && toCheck[4]["boxValue"] == value && toCheck[8]["boxValue"] == value) ||
      (toCheck[2]["boxValue"] == value && toCheck[4]["boxValue"] == value && toCheck[6]["boxValue"] == value)
   ) {
      console.log(value + 'won');
    }else{
      console.log('Next turn');
    };
}

function startGame () {

  var token = Random.id([8]);

  console.log(token);
  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": token}});

    Games.insert({
      gameToken: token,
      state: "ready",
      owner: Meteor.userId(),
      createdAt: new Date()
    });

    for (var i = 1; i <= 9; i++) {
      Boxes.insert({
        boxOrder : i,
        gameToken: token,
        boxValue: "empty",
        createdAt: new Date()
      });
    };
};

Template.menu.events({
    "click .box": function (event, template) {
    var usersGame = Meteor.user().profile.currentGame; 
    var toGame = Games.find({"gameToken": usersGame}).fetch(); 
    var value = (Meteor.userId() == toGame[0]["owner"] ) ? "nought" : "cross";
    Boxes.update(this._id, {$set: {boxValue: value}});
    checkBoxes(value);
  },

  "click #start": function (event, template) {    
    console.log("start");
    startGame();
    var usersGame = Meteor.user().profile.currentGame;
    Router.go('games', {_id: usersGame});
  },

  "click #reset": function (event, template) {
    Meteor.call('resetBoxes');
  },

  "click #join": function (event, template) {
    Router.go('post.show');
  }

  });