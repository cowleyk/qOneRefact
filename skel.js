$(document).ready(function(){
  'use strict';
  $('.parallax').parallax();
  $('select').material_select();

  //global variables
  var params = {};
  var nameArr = [];
  var IDArr = [];

  var colorObj = {};
  var symbolObj = {};
  var colorArr = ['blue','orange','green','red','yellow','purple','blue','orange','green','red','yellow','purple'];
  var symbolArr = ['triangle','square','circle','diamond','triangle','square','circle','diamond','triangle','square','circle','diamond'];

  var statArr = [];
  var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
  var flotObj = {};

  //getting players and creating form for names
  var numPlayerDiv = $('#numPlayerRadio input');
  numPlayerDiv.on('change',function(){
    getplayerIDObj();
    numPlayer = parseInt($('input[name="group1"]:checked', '#numPlayerRadio').val());
    setUpPlayerNames();
    $('#buttonDiv').html(`
      <p id="loading">Loading...</p>`);
  });

//Initialize button action, sets up stats form
$('#buttonDiv').on('click', '#submitPlayers', function(){
  //consider using fs to write files from api, make id:player index, make drop-downs for teams/players

  //set up array of names
  nameArr = $('.validate').map(function(_, el) {
    return $(el).val();
  }).get();

  //covert array names to ID's
  for(var i=0;i<nameArr.length;i++){
    IDArr[i] = playerObjID[nameArr[i]];
    colorObj[nameArr[i]] = colorArr[i];
    symbolObj[nameArr[i]] = symbolArr[i];
    }

  setUpStats();

  $('#buttonDiv').html(`<br><a class="waves-effect waves-light btn" id="graphButton">Graph</a>`);

});

//graph button action, gets stat data, forms it into data model, and prints flot charts
$('#buttonDiv').on('click', '#graphButton', function(){

  //set up params object
  params.season = parseInt($('#seasonSlider').val());
  var weekStart = parseInt($('#week1Slider').val());
  var weekEnd = parseInt($('#week2Slider').val());
  params.statType = 'PlayerGameStatsByPlayerID';

  //set up array of checked stats
  statArr = $(':checkbox:checked').map(function(_, el) {
    return $(el).val();
  }).get();

  //loop through week range for all players' stats, create promise
  var requests = [];
  for (let k=0; k<IDArr.length; k++){
    params.playerID = IDArr[k];
    for (var i=weekStart; i<weekEnd+1; i++){
      params.week = i;
      requests.push($.ajax({
        url: apiString + params.statType + "/" + params.season + "/" + params.week + "/" + params.playerID,
        type: "GET",
        beforeSend: setHeader,
        success: function(data){console.log('yeehaw2');},
        error: function(){console.log('uh oh2');},

        // Request body
        data: "{}"
      }));
      function setHeader(xhr){
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
      }
    }
  } //close for loop of ajax requests

  //once api calls finish, manipulate data and print graphs
  Promise.all(requests).then(function (results) {
    // results = [{weekStart/player1},{weekStart/player2}...,{weekEnd/player1}{weekEnd/player2}]

    var heightCounter = 200;
    $("#main").height(heightCounter);
    $('#main').html(`<div class="row container" id="legendRow">
        <div class="col s6 offset-s3" id="legendDiv">
        </div>
      </div>
      `);

    //set up skeleton for model and fill in w/ data from api
    for (var i=0; i<statArr.length; i++){
      flotObj[statArr[i]] = {};
      for (var j=0; j<nameArr.length; j++){
        flotObj[statArr[i]][nameArr[j]] = [[0,0]];
      }
      //loop through api data and sort it into proper object
      for (var k=0; k<results.length; k++){
        //split api data by player
        for (var key in flotObj[statArr[i]]){
          if(results[k] == ""){
            console.log('skipped');
            //do I need to put anything inside this fxn? if i don't have the if statement an error is thrown in the else if's conditional statement
          }
          else if((results[k].Name) === key){
            flotObj[statArr[i]][key].push([results[k].Week, results[k][statArr[i]]]);
          }
        }
      } //close loop over results

      // Set the container height
      heightCounter += (500);
      $("#main").height(heightCounter);
      //need to sort data? no need to yet
      setUpGraphs(flotObj[statArr[i]], statArr[i]);

    } //close loop over statArr

    //append reset buttons to top and bottom of page
    $('#legendRow').append(`<div class="col s2 offset-s5" id="resetButtonDiv">
      <a class="waves-effect waves-light btn" href="./index.html">Reset</a>
      </div>`);
    $('#main').append(`<div class="col s2 offset-s5" id="resetButtonDiv">
      <a class="waves-effect waves-light btn" href="./index.html">Reset</a>
      </div>`);
  }); // Close promise.all
}); // Close "Graph" button

});
