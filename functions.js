'use strict';

var numPlayer;
var playerObjID = {};
var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
var colorObj = {};
var symbolObj = {};



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
  }); //close ajax

  function setHeader(xhr){
    xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
  }

  $playersAll.done(function(data) {
    console.log("success");
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



function getWeeklyStats(obj){
    var $weeklyStats =$.ajax({
      url: apiString + obj.statType + "/" + obj.season + "/" + obj.week + "/" + obj.playerID,
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
} //close getWeeklyStats



function setUpGraphs(obj, graphLabel){
  $('#main').append(`<div class="row container graphCard">
      <p class="graphLabelP">${graphLabel}</p>
      <div class="graphImg" id="${graphLabel}"></div>
    </div>
    <br>
    `);
    var data1 = [];
      //     var data1 = [ { label: "label 1", data: d1, points: { symbol: "triangle", fillColor: "#058DC7" }, color: "#058DC7" },
      //     { label: "label 2", data: d2, points: { symbol: "square", fillColor: "#50B432" }, color: "#50B432" }];

    for (var idKey in obj){
      //idKey is really nameKey
      var data1Obj = {};
      data1Obj.label = idKey.toString();
      data1Obj.data = obj[idKey];
      data1Obj.lines = {show:true};
      data1Obj.points = {
        symbol: symbolObj[idKey],
        fillColor: colorObj[idKey]
      };
      data1Obj.color = colorObj[idKey];
      data1.push(data1Obj);
    }

    $.plot($(`#${graphLabel}`), data1, {
      xaxis: {
        min: 0,
        mode: "week",
        tickSize: 1,
        tickLength: 0, // Hide gridlines
        axisLabel: "Week",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
        axisLabelPadding: 5
      },
      yaxes: [
        {
          min: 0,
          axisLabel: `${graphLabel}`,
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
          axisLabelPadding: 5
        }
      ],
      grid: {
        hoverable: true,
        borderWidth: 1
      },
      legend: {
        labelBoxBorderColor: "none",
        noColumns: 2,
        position: "sw",
        margin: 5,
        backgroundOpacity: 0.6,
        container: $(`#legendDiv`)
      }
    }); //close $.plot
} //close setUpGraphs
