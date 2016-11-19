$(document).ready(function(){
  $('.parallax').parallax();
  $('select').material_select();

  var numPlayer;

  $('#numPlayerRadio input').on('change',function(){
    numPlayer = $('input[name="group1"]:checked', '#numPlayerRadio').val();
    console.log(numPlayer);
  });











});
