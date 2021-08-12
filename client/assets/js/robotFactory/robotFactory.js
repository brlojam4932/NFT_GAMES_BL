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
  $(".robot__head").css('background', '#' + color)
  $("#headcode").html('code: ' + code)
  $("#dnabody").html(code)
}

function eyesColor(color, code) {
  $(".robot__eye").find("span").css('bacground', "#" + color)
  $("#eyecode").html("code: " + code)
  $("#dnaeyes").html(code)
}

function earsAndPaw(color, code) {
  $(".robot__ear--left, .robot_ear--right").css('background', "#" + color)
  $("#earcode").html('code: ' + code)
  $("#dnaears").html(code)
}

// Variation functions for range-bars -------------------

// 8 eye types
function eyeVariation(num) {

  $("#dnashape").html(num)
  switch (num) {
    case 1:
      normalEyes()
      $("#eyeName").html("Basic")
      break
    case 2:
      normalEyes()
      $("#eyeName").html("Chill")
      return eyesType1()
      break
    case 3:
      normalEyes()
      $("#eyeName").html("Cute")
      return eyesType2()
      break
    case 4:
      normalEyes()
      $("#eyeName").html("Watching")
      return eyesType3()
      break
    case 5:
      normalEyes()
      $("#eyeName").html("Night eyes")
      return eyesType4()
      break
    case 6:
      normalEyes()
      $("#eyeName").html("Wonder Down")
      return eyesType5()
      break
    case 7:
      normalEyes()
      $('#eyeName').html('Wonder up')
      return eyesType6()            
      break
    case 8:
      normalEyes()
      $('#eyeName').html('Circle')
      return eyesType7()            
      break
  }
}

// ** Eyes ** //

function normalEyes() {
  $('.robot__eye').find('span').css('border', 'none')
}

// description of eye style
// top
function eyesType1() {
  $('.robot__eye').find('span').css("border-top", '15px solid')
}

//bottom
function eyesType2() {
  $(".robot__eye").find('span').css("border-bottom", "15px solid")
}

//top and bottom
function eyesType3() {
  $(".robot__eye").find('span').css({ "border-top": "15px solid", "border-left": "15px solid"})
}

//Right and left
function eyesType4() {
  $(".robot_eye").find('span').css({ 'border-right': '15px solid', 'border-left': '15px solid'})
}

// Right and top
function eyesType5() {
  $(".robot_eye").find("span").css({ 'border-right': '15px solid', 'border-left': '15px solid', 'border-top': '15px solid' })
}

//Right left botton
function eyesType6() {
  $('.robot__eye').find('span').css({ 'border-right': '15px solid', 'border-left': '15px solid', 'border-bottom': '15px solid' })
}
//Full shape
function eyesType7() {
  $('.robot__eye').find('span').css('border', '15px solid')
}
