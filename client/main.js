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

    Router.go('/games/'+token);
};

Template.menu.helpers({
  boxes: function () {
    if (this.params._id !== null) {
      var usersGame = this.params._id;
      return Boxes.find({gameToken: usersGame});
      console.log("hello");
    } else {
      console.log("login please")
    }
  },
  //learn: function () {
   
  //}
})

Template.menu.events({
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