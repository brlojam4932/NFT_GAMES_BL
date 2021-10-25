Moralis.initialize("IgjTev92MjQUSMuHXIhc7A5KiFOGrtJ2RBgNTrz0"); // Application id from moralis.io
Moralis.serverURL = "https://8a5ybyqvaz6q.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0x55A453383223BC931514fe690EE16E2f679b3113";


async function init() {
    try {
        let user = Moralis.User.current();
        //console.log(user);
        //alert("User logged in")
        if (!user) {
            $("#login_button").click(async () => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch (error) {
        console.log(error);
    }
}


async function renderGame() {
    $("#login_button").hide();
    $("#bot_row").html("");
    //Get and render properties from smart contract
    //let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({ from: ethereum.selectedAddress });
    //console.log(array);
    if (array.length == 0) return;
    array.forEach(async botId => {
        let details = await contract.methods.getTokenDetails(botId).call({ from: ethereum.selectedAddress });
        renderBot(botId, details);
    });
    $("#game").show();
}


function renderBot(id, data) {
    let now = new Date();
    let maxTime = data.endurance;
    let currentUinx = Math.floor(now.getTime() / 1000);
    let secondsLeft = (parseInt(data.lastMeal) + parseInt(data.endurance)) - currentUinx;
    let percentageLeft = secondsLeft / maxTime;
    //console.log("Time Remaining: " + percentageLeft);
    let percentageString = (percentageLeft * 100) + "%";

    let deathTime = new Date((parseInt(data.lastMeal) + parseInt(data.endurance)) * 1000);

    if (now > deathTime) {
        deathTime = "<b>DEAD</b>";
    }

    let interval = setInterval(() => {
        let now = new Date();
        let maxTime = data.endurance;
        let currentUinx = Math.floor(now.getTime() / 1000);
        let secondsLeft = (parseInt(data.lastMeal) + parseInt(data.endurance)) - currentUinx;
        let percentageLeft = secondsLeft / maxTime;
        console.log("Time Remaining: " + percentageLeft);
        let percentageString = (percentageLeft * 100) + "%"
        $(`#bot_${id} .progress-bar`).css("width", percentageString);
        if (percentageLeft < 0) {
            clearInterval(interval);
        }
    }, 5000)


    let htmlString = `
    <div class="robot col-md-3 card mx-1" id="bot_${id}">

          <div class="robot__ear">
            <div id="leftEar_${id}" class="robot__ear--left">
              <div class="robot__ear--left-inside"></div>
            </div>
            <div id="rightEar_${id}" class="robot__ear--right">
              <div class="robot__ear--right-inside"></div>
            </div>
          </div>

          <div id="head_${id}" class="robot__head">
            <div id="midDot_${id}" class="robot__head-dots">
              <div id="leftDot_${id}" class="robot__head-dots_first"></div>
              <div id="rightDot_${id}" class="robot__head-dots_second"></div>
            </div>
            <div class="robot__eye">
              <div class="robot__eye--left">
                <span class="pupil-left"></span>
              </div>
              <div class="robot__eye--right">
                <span class="pupil-right"></span>
              </div>
            </div> <!-- robot eye div end -->

          </div><!-- robot head div end -->

          <div class="card-body">
            <div>Id: <span class="bot_id">${id}</span></div>
            <div>Damage: <span class="pet_damage">${data.damage}</span></div>
            <div>Magic: <span class="pet_magic"> ${data.magic} </span></div>
            <div>Endurance: <span class="${data.endurance}"></span></div>
            <div>Time to starvation: <span class="pet_starvation_time">${deathTime}</span></div>
            <div class="progress">
              <div class="progress-bar" style="width: ${percentageString}">
              </div>
            </div>
            <button data-pet-id="${id}" class="feed_button btn btn-primary btn-block">Feed</button>

            <div>Head/Body: <span class="pet_damage">${data.headcode}</span></div>
            <div>Eyes: <span class="pet_magic">${data.eyecode}</span></div>
            <div>Ears: <span class="pet_magic">${data.earcode}</span></div>
            <div>Eyes Shape: <span class="pet_magic">${data.eyeName}</span></div>
        </div> 
        
        
    </div>
    `;

    let element = $.parseHTML(htmlString);
    $("#bot_row").append(element);

    $(`#bot_${id} .feed_button`).click(() => { // click handler
        feed(id);
    });



}


function getAbi() {
    return new Promise((res) => {
        $.getJSON("Token.json", ((json) => {
            res(json.abi);
        }))
    })

}


async function feed(petId) {
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    contract.methods.feed(petId).send({ from: ethereum.selectedAddress }).on("receipt", (() => {
        console.log("Feeding completed");
        renderGame();
    }))
}


init();
