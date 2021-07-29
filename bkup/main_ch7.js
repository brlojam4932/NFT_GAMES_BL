Moralis.initialize("IgjTev92MjQUSMuHXIhc7A5KiFOGrtJ2RBgNTrz0"); // Application id from moralis.io
Moralis.serverURL = "https://8a5ybyqvaz6q.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0x072EcDD2075EC4d37cF32F90fC61676Fc116B5b0";

async function init() {
    try {
        let user = Moralis.User.current();
        //console.log(user);
        //alert("User logged in")
        if(!user){
            $("#login_button").click( async () => {
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
    $("#pet_row").html("");
    //Get and render properties from smart contract
    //let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress});
    //console.log(array);
    if(array.length == 0) return;
    array.forEach(async petId => {
        let details = await contract.methods.getTokenDetails(petId).call({from: ethereum.selectedAddress});
        renderPet(petId, details);
    });
    $("#game").show();
}


function renderPet(id, data) {
    let now = new Date();
    let maxTime = data.endurance;
    let currentUinx = Math.floor(now.getTime() / 1000);
    let secondsLeft = (parseInt(data.lastMeal) + parseInt(data.endurance)) - currentUinx;
    let percentageLeft = secondsLeft / maxTime;
    console.log("Time Remaining: " + percentageLeft);
    let percentageString = (percentageLeft * 100) + "%"; 

    let deathTime = new Date((parseInt(data.lastMeal) + parseInt(data.endurance)) * 1000); //16260000
    
    if(now > deathTime) {
        deathTime = "<b>DEAD</b>";
    }

    let htmlString = `
    <div class="col-md-3 card mx-1" id="pet_${id}">
        <img class="card-img-top pet_img" src="pet_robots_02.png">
        <div class="card-body">
            <div>Id: <span class="pet_id">${id}</span></div>
            <div>Damage: <span class="pet_damage">${data.damage}</span></div>
            <div>Magic: <span class="pet_magic">${data.magic}</span></div>
            <div>Endurance: <span class="pet_endurance">${data.endurance}</span></div>
            <div>Time to starvation: <span class="pet_starvation_time">${deathTime}</span></div>
            <div class="progress">
                <div class="progress-bar" style="width: ${percentageString}">

                </div>
            </div>
            <button data-pet-id="${id}" class="feed_button btn btn-primary btn-block">Feed</button>
        </div>           
    </div>`;

    let element = $.parseHTML(htmlString);
    $("#pet_row").append(element);

    $(`#pet_${id} .feed_button`).click(() => { // click handler
        feed(id);
    });
}


function getAbi(){
    return new Promise((res) => {
        $.getJSON("Token.json", ((json) => {
            res(json.abi);
        }))
    })
   
}


async function feed(petId){
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    contract.methods.feed(petId).send({from: ethereum.selectedAddress}).on("receipt", (() => {
        console.log("Feeding completed");
        renderGame();
    }))
}
  

init();
