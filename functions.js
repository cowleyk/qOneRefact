'use strict';

var numPlayer;

var userInputPlayers = function(){
  var htmlString = '';
  for(var i=0; i<numPlayer; i++){
    // var numPlayerString = i.toString();
    htmlString += `<div class="input-field col s6">
      <input placeholder="First Last" id="name${(i+1).toString()}" type="text" class="validate">
      <label class="active" for="first_name">Player Name</label>
    </div>`;
    //inserting variables into html with this for loop is making all inserted elements have the final variable's value
  }
  htmlString += `<a class="waves-effect waves-light btn" id="submitPlayers">Initialize</a>`;
  console.log(htmlString);
  return htmlString;
};
