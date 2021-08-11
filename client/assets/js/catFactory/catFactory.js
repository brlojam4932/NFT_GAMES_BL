//Random color
function getColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor
}

function genColors() {
  var colors = []
  for(var i = 10; i < 99; i++) {
    var color = getColor()
    colors[i] = color
  }
  return colors
}

function headColor(color, code) {
  $(".cat__head").css('background', '#' + color)
  $("headcode").html('code: ' + code)
  $("#dnabody").html(code)
}

function earsAndPaw(color, code) {
  $(".cat__ear--left, .cat__ear--right").css('background', "#" + color)
  $("#earscode").html('code: ' + code)
  $("#dnaears").html(code)
}