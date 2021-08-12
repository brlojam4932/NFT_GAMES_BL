var colors = Object.values(allColors())

var defaultDNA = {
  "headColor" : 10,
  "eyesColor" : 96,
  "earsColor" : 10,
  
  // Robot Attributes
  "eyesShape" : 1
}

// when page loads
$(document).ready(function() {
  renderBot(defaultDNA)
});

function defaultBot() {
  renderBot(defaultDNA)
}

/*
function randomDNA() { // new function - not sure how it works
  var dnaStr = String(Math.floor(Math.random()*1E16))
  //Colors
  var dna = {
    "headColor" : dnaStr.substring(0, 2),
    "eyesColor" : dnaStr.substring(2, 4),
    "earsColor" : dnaStr.substring(4, 6),
    
    // Robot Arrt
    "eyesShape" : dnaStr.substring(8,9) % 8 + 1
  }
  return dna
}
*/


//Random cat DNA
function randomBot() {
  var dna = randomDNA()
    //Rendering Cat
    renderBot(dna)
}

function getDna() {
  var dna = ""
  dna += $("#dnabody").html()
  dna += $("#dnaeyes").html()
  dna += $("#dnaears").html()
  
  dna += $("#dnashape").html()

  console.log(parseInt(dna))
  return parseInt(dna)
  
}

function renderBot(dna) { // colors, code
  headColor(colors[dna.headcolor], dna.headColor)
  $("#headColor").val(dna.headcolor)
  console.log("headColorDefault " + dna.headColor)

  eyesColor(colors[dna.eyesColor], dna.eyesColor)
  $("#eyesColor").val(dna.eyesColor)
  console.log("eyesColorDefault " + dna.eyesColor)

  earsAndPaw(colors[dna.earsColor], dna.earsColor)
  $("#earsColor").val(dna.earsColor)
  console.log("earsColorDefault " + dna.earsColor)

  eyeVariation(dna.eyesShape)
  $("#shape").val(dna.eyesShape)
  console.log("shapeEyeVarDefault " + dna.eyesShape)
}

//-------Changing bot colors with listerners-----------------

$("#headColor").change(() => {
  var colorVal = $("#headColor").val()
  headColor(colors[colorVal], colorVal)
  console.log("headColor " + colorVal);
})

$("#eyesColor").change(() => {
  var colorVal = $("#eyesColor").val()
  eyesColor(colors[colorVal], colorVal)
  console.log("eyesColor " + colorVal)
})

$("#earsColor").change(() => {
  var colorVal = $("#earsColor").val()
  earsAndPaw(colors[colorVal], colorVal)
  console.log("earsPaw " + colorVal)
})



//------------------- Changing attributes -----------------

// Eyes shape

$("#shape").change(() => {
  var shape = parseInt($("#shape").val())
  eyeVariation(shape)
  console.log('eyeVariation ' + shape)
})


//-----------------------------------------------
//// Randomize and Buttons
// rand colors old method
$("#button1").on("click", async () => {
  renderBot(defaultDNA)
});

function randomDNA() {
  
  var colorVal = Math.floor(Math.random() * 89) + 10;
  bodyColor(colors[colorVal], colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  eyesColor(color[colorVal], colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[colorVal], colorVal)

  // rand shapes

  var shape = Math.floor(Math.random() * 8) + 1;
  eyeVariation(shape)

}


$("#button2").on("click", async () => {
  var colorVal = Math.floor(Math.random() * 89) + 10;
  bodyColor(colors[colorVal], colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  eyesColor(color[colorVal], colorVal)

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

  