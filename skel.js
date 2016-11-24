$(document).ready(function(){
  'use strict';
  $('.parallax').parallax();
  $('select').material_select();

  var params = {};
  var nameArr = [];
  var IDArr = [];
  var statArr = [];
  var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
  var flotObj = {};


  var numPlayerDiv = $('#numPlayerRadio input');
  numPlayerDiv.on('change',function(){
    getplayerIDObj();
    numPlayer = parseInt($('input[name="group1"]:checked', '#numPlayerRadio').val());
    setUpPlayerNames();
    $('#buttonDiv').html(`
      <p id="loading">Loading...</p>`);


  });

$('#buttonDiv').on('click', '#submitPlayers', function(){
  //consider using fs to write files from api, make id:player index, make drop-downs for teams/players

  //set up array of names
  nameArr = $('.validate').map(function(_, el) {
    return $(el).val();
  }).get();
  console.log('nameArr- ', nameArr);

  //covert array names to ID's
  for(var i=0;i<nameArr.length;i++){
    IDArr[i] = playerObjID[nameArr[i]];
    }
  console.log('ids of names:', IDArr);

  setUpStats();

  $('#buttonDiv').html(`<br><a class="waves-effect waves-light btn" id="graphButton">Graph</a>`);

});

$('#buttonDiv').on('click', '#graphButton', function(){
  params.season = parseInt($('#seasonSlider').val());
  var weekStart = parseInt($('#week1Slider').val());
  var weekEnd = parseInt($('#week2Slider').val());

  //set up array of checked stats
  statArr = $(':checkbox:checked').map(function(_, el) {
    return $(el).val();
  }).get();
  console.log(params.season, weekStart, weekEnd);
  console.log('stats selected:', statArr);

  params.statType = 'PlayerGameStatsByPlayerID';
  params.week = weekStart;
  // params.playerID = IDArr[0];

  var requests = [];
  for (let k=0; k<IDArr.length; k++){
    params.playerID = IDArr[k];
    for (var i=weekStart; i<weekEnd+1; i++){
      params.week = i;
      requests.push($.ajax({
        url: apiString + params.statType + "/" + params.season + "/" + params.week + "/" + params.playerID,
        // set range values to equal weeks in api string
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
  console.log('pre-promise flotObj- ', flotObj);
  Promise.all(requests).then(function (results) {
    console.log('results- ', results);
    // results = [{weekStart/player1},{weekStart/player2}...,{weekEnd/player1}{weekEnd/player2}]


    for (var i=0; i<statArr.length; i++){
      flotObj[statArr[i]] = {};
      for (var j=0; j<IDArr.length; j++){
        flotObj[statArr[i]][IDArr[j]] = [];
      }


      for (var k=0; k<results.length; k++){
        // ?? loop through results, use if(results[i].name ===){push to flotArr inside proper obj/key}
        // need to sort at some point
        for (var key in flotObj[statArr[i]]){
          if(results[k] == ""){
            console.log('skipped');
          }
          else if((results[k].PlayerID).toString() === key){
            flotObj[statArr[i]][key].push([results[k].Week, results[k][statArr[i]]]);
          }

        }

      } //close loop over results
    } //close loop over statArr
    console.log('flotObj- ', flotObj);

    var heightCounter = 0;
    $("#main").height(heightCounter);

    $('#main').html(``);
    for (let j=0; j<statArr.length; j++){
      setUpGraphs();
      heightCounter += (500);
    }
    // Set the container height
    console.log('heightCounter- ', heightCounter);
    $("#main").height(heightCounter);

  }); // Close promise.all

}); // Close "Graph" button








});
