$(document).ready(function(){
  'use strict';
  $('.parallax').parallax();
  $('select').material_select();

  var params = {};
  var nameArr = [];
  var IDArr = [];
  var statArr = [];

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

  for (var j=0; j<statArr.length; j++){
    setUpGraphs();
  };

});








});
