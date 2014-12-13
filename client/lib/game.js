turnCheck = function (){

};

checkBoxes = function (boxIDs, gameToken, value){

    var runCount = 0;
    var ToCheck = Boxes.findOne({"_id": boxIDs}).neighbourCells

    for (var key in ToCheck) {

      var neighbours = ToCheck[key];

      //if a valid cell
      if (neighbours.cellID != 0){

        //find the cell, by game and by the order
        var cellToCheck = Boxes.findOne({
          $and : [
          {"gameToken": gameToken}, 
          {"boxOrder" : neighbours.cellID}
          ]
        })

        //save the direction if we're going to follow it
        var tangent = neighbours.direction;
        console.log(tangent);

        //now, while this value is equal to the player
        while (cellToCheck.boxValue == value){

          toDoubleCheck = cellToCheck.neighbourCells;

          for (var key in toDoubleCheck) {

            var nextCheck = toDoubleCheck[key];

            if (toDoubleCheck.direction == tangent){

            }

          }

          if (runCount > 10){
            break;
          } 
          //up the count
          runCount++;
          //get the sibiling value of the tangent
          console.log(cellToCheck.neighbourCells.tangent);
          var whileCheck = cellToCheck.neighbourCells.tangent;
          var whileCheck = this.cellID;

          //update the value of the object

        }

      }else{

      };

    };

      //set Index number
      //set Direction
      //set Count

      //find cell by the index number and save the boxValue
      //compare the boxValue with player's value
        //if true up count and get index number of that cell's direction


    var usersGame = Meteor.user().profile.currentGame;
    var toCheck = Boxes.find({"gameToken": usersGame}, { $sort : { boxOrder : -1}}).fetch();
    var toGame = Games.find({"gameToken": usersGame}).fetch();
    var value = (Meteor.userId() == toGame[0]["owner"] ) ? "nought" : "cross";

    Games.update({_id: currentGame._id}, {$set: {"turnState": nextTurn}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nextMove": "Waiting for opponent to respond."}});
    Meteor.call('tellPlayer', nextTurn);
    //Meteor.users.update({_id: nextTurn}, {$set: {"profile.nextMove": "It's your turn."}});

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
      turnState: Meteor.userId(),
      owner: Meteor.userId(),
      opponent: "none",
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
        "streak" : "no",
        "createdAt": new Date(),
        "neighbourCells": [
          { "direction": "north",
            "cellID" : north
          },
          { "direction": "northEast",
            "cellID" : northEast
          },
          { "direction": "east",
            "cellID" : east
          },
          { "direction": "southEast",
            "cellID" : southEast
          },
          { "direction": "south",
            "cellID" : south
          },
          { "direction": "southWest",
            "cellID" : southWest
          },
          { "direction": "west",
            "cellID" : west
          },
          { "direction": "northWest",
            "cellID" : northWest
          }
        ]
      });
    };
};