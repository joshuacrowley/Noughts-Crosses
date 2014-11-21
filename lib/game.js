function checkBoxes (){
    var usersGame = Meteor.user().profile.currentGame;
    var toCheck = Boxes.find({"gameToken": usersGame}, { $sort : { boxOrder : -1}});
    console.log(toCheck);
    return;
}