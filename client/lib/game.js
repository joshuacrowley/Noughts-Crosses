turnCheck = function (){

};

checkBoxes = function (boxIDs){

    var runCount = 0;

    console.log(boxIDs + " " + "01");

    var directionsToCheck = Boxes.find({"_id": boxIDs}, {directions : 1}).forEach( 
      
      function(myDoc) { console.log(myDoc.directions); 

      });;

    console.log(directionsToCheck);

    var usersGame = Meteor.user().profile.currentGame;
    var toCheck = Boxes.find({"gameToken": usersGame}, { $sort : { boxOrder : -1}}).fetch();

    var toGame = Games.find({"gameToken": usersGame}).fetch();
    
    var value = (Meteor.userId() == toGame[0]["owner"] ) ? "nought" : "cross";
    console.log(value);

    /*
    
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
      alert(value + ' won');
    }else{
      console.log('Next turn');
    };

    */
}

startGame = function (){

  var gridWidth = 3;
  var gridHeight = 3;
  var token = Random.id([8]);
  console.log(token);

  rangeCorrect = function (num){
    if(num < 0 || num > gridHeight*gridHeight){
      return 0;
    }else{
      return num;
  }};

  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.currentGame": token}});

    Games.insert({
      gameToken: token,
      state: "ready",
      owner: Meteor.userId(),
      createdAt: new Date()
    });

    for (var i = 1; i <= gridWidth*gridHeight; i++) {

        var north = -gridWidth + i;
        var northEast = -gridWidth+1 + i;
        var east = 1 + i;
        var southEast = gridWidth + i + 1;
        var south = gridWidth + i;
        var southWest = gridWidth + i -1;
        var west = -1 + i;
        var northWest = -gridWidth-1 + i;

        north = rangeCorrect(north);
        northEast = rangeCorrect(northEast);
        east = rangeCorrect(east);
        southEast = rangeCorrect(southEast);
        south = rangeCorrect(south);
        southWest = rangeCorrect(southWest);
        west = rangeCorrect(west);
        northWest = rangeCorrect(northWest);   

      //stops top row references
      if (i <= gridWidth){
        north = northWest = northEast = 0;
      }else{
        
      };

      //stops bottom row references
      if (i > (gridWidth*gridHeight-gridHeight)){
        south = southWest = southEast = 0;
      }else{
        
      };

      //stops right edge references
      if ((i % gridWidth) == 0){
        east = northEast = southEast = 0;
      }else{
      };

      //stops left edge references
      if ((i - 1) % gridWidth == 0){
        west = northWest = southWest = 0;
      }else{
      };

      Boxes.insert({
        "boxOrder" : i,
        "gameToken": token,
        "boxValue": "empty",
        "createdAt": new Date(),
        "directions": [
            {"N": north},
            {"NE": northEast},
            {"E": east},
            {"SE": southEast},
            {"S": south},
            {"SW": southWest},
            {"W": west},
            {"NW": northWest}
        ]
      });
    };
};