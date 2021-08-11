var colors = Object.values(allColors())

var defaultDNA = {
  "headColor" : 10,
  "earsColor" : 10
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
    "earsColor" : dnaStr.substring(6, 8)
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

  return parseInt(dna)
}

function renderCat(dna) { // colors, code
  headColor(colors[dna.headcolor], dna.headColor)
  $("#headColor").val(dna.headcolor)

  earsAndPaw(colors[dna.earsColor], dna.earsColor)
  $("#earsColor").val(dna.earsColor)
}

// Changing cat colors
$("#headColor").change(() => {
  var colorVal = $("#headColor").val()
  headColor(colors[colorVal], colorVal)
})


//Showing Colors and Cattribute Boxes


function showColors() {
  $("#catColors").removeClass("hidden")
  $("#cattributes").addClass("hidden")
}

function showCattributes() {
  $("#cattributes").removeClass("hidden")
  $("#catColors").addClass("hidden")
}


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
})

  