$(document).ready(function(){
  'use strict';
  $('.parallax').parallax();
  $('select').material_select();

  var numPlayer;
  var params = {};
  var statArr = [];

  var numPlayerDiv = $('#numPlayerRadio input');
  numPlayerDiv.on('change',function(){
    numPlayer = parseInt($('input[name="group1"]:checked', '#numPlayerRadio').val());
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
    $('#buttonDiv').html(`
      <div class="row container"><a class="waves-effect waves-light btn" id="submitPlayers">Initialize</a><div>`);
  });

$('#buttonDiv').on('click', '#submitPlayers', function(){
    //getPlayerID();
    //consider using fs to write files from api, make id:player index, make drop-downs for teams/players
  $('select').material_select();

  console.log('click button');
  $('#userField').html(`

    <form action="#">
      <p class="range-field" id="season">
        <label class="active" for="seasonSlider">Season</label>
        <input type="range" id="seasonSlider" min="2010" max="2016" />
      </p>

      <p class="range-field" id="week1">
        <label class="active" for="week1Slider">Week 1</label>
        <input type="range" id="week1Slider" min="0" max="16" />
      </p>

      <p class="range-field" id="week2">
        <label class="active" for="week2Slider">Week 2</label>
        <input type="range" id="week2Slider" min="0" max="16" />
      </p>

      <div class="col s4">
        <input type="checkbox" class="filled-in stat" id="filled-in-box1" value="RushingAttempts" />
        <label for="filled-in-box1">Rush Attempts</label>

        <input type="checkbox" class="filled-in stat" id="filled-in-box2" value="RushingYards" />
        <label for="filled-in-box2">Rush Yards</label>
      </div>

      <div class="col s4">
      <input type="checkbox" class="filled-in stat" id="filled-in-box3" value="Receptions" />
      <label for="filled-in-box3">Receptions</label>

      <input type="checkbox" class="filled-in stat" id="filled-in-box4" value="ReceivingYards" />
      <label for="filled-in-box4">Reception Yards</label>
      </div>

      <div class="col s4">
      <input type="checkbox" class="filled-in stat" id="filled-in-box5" value="PassingAttempts" />
      <label for="filled-in-box5">Passing Attempts</label>

      <input type="checkbox" class="filled-in stat" id="filled-in-box6" value="PassingYards" />
      <label for="filled-in-box6">Passing Yards</label>
      </div>
    </form>
    `);

  // use below for select dropdown
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

  $('#buttonDiv').html(`<br><a class="waves-effect waves-light btn" id="graphButton">Graph</a>`);
          //<a class="waves-effect waves-light btn" id="submitPlayers">Graph</a>
  });

$('#buttonDiv').on('click', '#graphButton', function(){
  var season = parseInt($('#seasonSlider').val());
  var weekStart = parseInt($('#week1Slider').val());
  var weekEnd = parseInt($('#week2Slider').val());
  statArr = $(':checkbox:checked').map(function(_, el) {
    return $(el).val();
  }).get();
  // statArr = $(':checkbox:checked').val();
  console.log('stats selected:', statArr);
  console.log(season, weekStart, weekEnd);
});








});
