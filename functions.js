'use strict';

var numPlayer;
var playerObjID = {};
var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';


function setUpPlayerNames(){
  $('#userField').append(`<div id="appendTo">
  </div>`);
  $('#appendTo').html(function(){
    var htmlString = '';
    for(var i=0; i<numPlayer; i++){
      // var numPlayerString = i.toString();
      htmlString += `<div class="input-field col s6">
      <input placeholder="First Last" id="name${(i+1).toString()}" type="text" class="validate">
      <label class="active" for="name${(i+1).toString()}">Player Name</label>
      </div>`;
      //inserting variables into html with this for loop is making all inserted elements have the final variable's value
    }
    // htmlString += `<a class="waves-effect waves-light btn" id="submitPlayers">Initialize</a>`;
    return htmlString;
  });
}

function getplayerIDObj() {
  var $playersAll = $.ajax({
    url:"https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerSeasonStats/2016",
    //+"/"+params.week+"/"+params.team,
    type: "GET",
    success: function(){console.log('yeehaw');},
    error: function(){console.log('uh oh');},
    beforeSend: setHeader,
    // Request body
    data: "{}"
  });
  //close stats = ajax

  function setHeader(xhr){
    xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
  }

  $playersAll.done(function(data) {
    console.log("success");
    // console.log(data);
    for(var i=0; i<data.length; i++){
      playerObjID[data[i].Name] = data[i].PlayerID;
    }
    $('#buttonDiv').html(`
      <div class="row container"><a class="waves-effect waves-light btn" id="submitPlayers">Submit Players</a><div>`);
    });
    $playersAll.fail(function() {
      console.log("error");
    });
  }//close getplayerIDObj



function setUpStats(){
  $('#userField').html(`

    <form action="#">
      <p class="range-field" id="season">
        <label class="active" for="seasonSlider">Season</label>
        <input type="range" id="seasonSlider" value="2016" min="2010" max="2016" />
      </p>

      <p class="range-field" id="week1">
        <label class="active" for="week1Slider">Week 1</label>
        <input type="range" id="week1Slider" min="1" max="16" />
      </p>

      <p class="range-field" id="week2">
        <label class="active" for="week2Slider">Week 2</label>
        <input type="range" id="week2Slider" min="1" max="16" />
      </p>

      <div class="row container">
        <div class="col s4 m4 l4">
          <input type="checkbox" class="filled-in stat" id="filled-in-box1" value="RushingAttempts" />
          <label for="filled-in-box1">Rush Attempts</label>

          <input type="checkbox" class="filled-in stat" id="filled-in-box2" value="RushingYards" />
          <label for="filled-in-box2">Rush Yards</label>
        </div>
      </div>

      <div class="row container">
        <div class="col s4 m4 l4">
          <input type="checkbox" class="filled-in stat" id="filled-in-box3" value="Receptions" />
          <label for="filled-in-box3">Receptions</label>

          <input type="checkbox" class="filled-in stat" id="filled-in-box4" value="ReceivingYards" />
          <label for="filled-in-box4">Reception Yards</label>
        </div>
      </div>

      <div class="row container">
        <div class="col s4 m4 l4">
          <input type="checkbox" class="filled-in stat" id="filled-in-box5" value="PassingAttempts" />
          <label for="filled-in-box5">Passing Attempts</label>

          <input type="checkbox" class="filled-in stat" id="filled-in-box6" value="PassingYards" />
          <label for="filled-in-box6">Passing Yards</label>
        </div>
      </div>
    </form>
    `);
}

// ______________START:getWeeklyStats____________________
function getWeeklyStats(obj){
    var $weeklyStats =$.ajax({
      url: apiString + obj.statType + "/" + obj.season + "/" + obj.week + "/" + obj.playerID,
      // set range values to equal weeks in api string
      type: "GET",
      beforeSend: setHeader,
      success: function(data){console.log('yeehaw2');},
      error: function(){console.log('uh oh2');},

      // Request body
      data: "{}"
    }); //close stats = ajax


    function setHeader(xhr){
      xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
    }

    // $weeklyStats.done(function(data) {
    //   console.log("success2");
    //   console.log(data);
    //   return data;
    // })
    // $weeklyStats.fail(function() {
    //   console.log("error2");
    // });
  // return queryStats; //close for loop
} //close getWeeklyStats

function setUpGraphs(){
  $('#main').append(`<div class="row container graphCard">
      <p class="graphLabel"></p>
      <img id="graphImg" src="images/nfl.jpg">
    </div>
    <br>
    `);

}

//___________________scrapheap__________________
// use below for select dropdown
// $('select').material_select();

// $('select').material_select();
// $("select").empty().html(' ');
// var value = "New value";
// $("select").append(
//   $("<option></option>").attr("value","RushingAttempts").text("Rushing Attempts")
// );

// Update the content clearing the caret
// $("select").material_select('update');
// $("select").closest('.input-field').children('span.caret').remove();
// put below inside userField.html
// <div class="input-field col s12">
//   <select>
//   </select>
//   <label>Materialize Select</label>
// </div>
