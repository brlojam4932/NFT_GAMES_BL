// CSS properties to build each cat depending on the DNA

var colors = Object.values(allColors())

function headColor(code, id) {
  var color = colors[code]
  $("#head" + id).css('background', '#' + color)
}

function eyesColor(code, id) {
  var color = colors[code]
  $('.robot__eye' + id).find('span').css('background', '#' + color)

}

function earsAndPaw(code, id) {
  var color = colors[code]
  $("#leftEar" + id + ", #rightEar" + id).css('background', "#" + color)
}

// Variation functions for range-bars -------------------

// 8 eye types
function eyeVariation(num, id) {

  switch (num) {
    case 1:
      normalEyes(id)
      $("#eyeName").html("Basic")
      break
    case 2:
      normalEyes(id)
      $("#eyeName").html("Chill")
      return eyesType1(id)
      break
    case 3:
      normalEyes(id)
      $("#eyeName").html("Cute")
      return eyesType2(id)
      break
    case 4:
      normalEyes(id)
      $("#eyeName").html("Watching")
      return eyesType3(id)
      break
    case 5:
      normalEyes(id)
      $("#eyeName").html("Night eyes")
      return eyesType4(id)
      break
    case 6:
      normalEyes(id)
      $("#eyeName").html("Wonder Down")
      return eyesType5(id)
      break
    case 7:
      normalEyes(id)
      $('#eyeName').html('Wonder up')
      return eyesType6(id)            
      break
    case 8:
      normalEyes(id)
      $('#eyeName').html('Circle')
      return eyesType7(id)            
      break
  }
}

// ** Eyes ** //

function normalEyes(id) {
  $('.robot__eye' + id).find('span').css('border', 'none')
}

// description of eye style
// top
function eyesType1(id) {
  $('.robot__eye' + id).find('span').css("border-top", '15px solid')
}

//bottom
function eyesType2(id) {
  $(".robot__eye" + id).find('span').css("border-bottom", "15px solid")
}

//top and bottom
function eyesType3(id) {
  $(".robot__eye" + id).find('span').css({ 'border-top': '15px solid', 'border-bottom': '15px solid' })
}

//Right and left
function eyesType4(id) {
  $(".robot_eye" + id).find('span').css({ 'border-right': '15px solid', 'border-left': '15px solid'})
}

//Right left top
function eyesType5(id) {
  $(".robot_eye" + id).find("span").css({ 'border-right': '15px solid', 'border-left': '15px solid', 'border-top': '15px solid' })
}

//Right left botton
function eyesType6(id) {
  $('.robot__eye' + id).find('span').css({ 'border-right': '15px solid', 'border-left': '15px solid', 'border-bottom': '15px solid' })
}
//Full shape
function eyesType7(id) {
  $('.robot__eye' + id).find('span').css('border', '15px solid')
}
