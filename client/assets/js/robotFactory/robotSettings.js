var colors = Object.values(allColors())

var defaultDNA = {
  "headColor" : 10,
  "earsColor" : 10,
  // Robot Attributes
  "eyesShape" : 1
}

// when page loads
$(document).ready(function() {
  renderCat(defaultDNA)
});

function defaultCat() {
  renderCat(defaultDNA)
}

function randomDNA() { // new function - not sure how it works
  var dnaStr = String(Math.floor(Math.random()*1E16))
  //Colors
  var dna = {
    "headColor" : dnaStr.substring(0, 2),
    "earsColor" : dnaStr.substring(6, 8),
    // Robot Arrt
    "eyesShape" : dnaStr.substring(8,9) % 8 + 1
  }
  return dna
}

//Random cat DNA
function randomCat() {
  var dna = randomDNA()
    //Rendering Cat
    renderCat(dna)
}

function getDna() {
  var dna = ""
  dna += $("#dnabody").html()
  dna += $("#dnaears").html()
  dna += $("#dnashape").html()

  return parseInt(dna)
}

function renderCat(dna) { // colors, code
  headColor(colors[dna.headcolor], dna.headColor)
  $("#headColor").val(dna.headcolor)

  earsAndPaw(colors[dna.earsColor], dna.earsColor)
  $("#earsColor").val(dna.earsColor)

  eyeVariation(dna.eyesShape)
  $("#shape").val(dna.eyesShape)
}

//------------------- Changing cat colors -----------------
$("#headColor").change(() => {
  var colorVal = $("#headColor").val()
  headColor(colors[colorVal], colorVal)
})

$("#earsColor").change(() => {
  var colorVal = $("#earsColor").val()
  earsAndPaw(colors[colorVal], colorVal)
})

//------------------- Changing attributes -----------------

// Eyes shape

$("#shape").change(() => {
  var shape = parseInt($("#shape").val())
  eyeVariation(shape)
})


//-----------------------------------------------
//// Randomize and Buttons
// rand colors old method
$("#button1").on("click", async () => {
  renderCat(defaultDNA)
});


$("#button2").on("click", async () => {
  var colorVal = Math.floor(Math.random() * 89) + 10;
  bodyColor(colors[colorVal], colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[colorVal], colorVal)

  // rand shapes

  var shape = Math.floor(Math.random() * 8) + 1;
  eyeVariation(shape)
})

//Showing Colors and Cattribute Boxes ---------------------


function showColors() {
  $("#robotColors").removeClass("hidden")
  $("#robotAttr").addClass("hidden")
}

function showRobottributes() {
  $("#robotAttr").removeClass("hidden")
  $("#robotColors").addClass("hidden")
}

  