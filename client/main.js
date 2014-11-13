Boxes = new Mongo.Collection("boxes");
Games = new Mongo.Collection("games");

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
};

Template.layout.helpers({
  boxes: function () {
    var usersGame = Meteor.user().profile.currentGame;
    return Boxes.find({gameToken: usersGame}, {sort: {createdAt: -1}});
  }
});

Template.layout.events({
  "click .box": function (event, template) {
    console.log("clicked");
    Boxes.update(this._id, {$set: {boxValue: "clicked"}});
  },

  "click #start": function (event, template) {    
    console.log("start");
    startGame();
  },

  "click #reset": function (event, template) {
    Meteor.call('resetBoxes');
  }
  });