Moralis.initialize("IgjTev92MjQUSMuHXIhc7A5KiFOGrtJ2RBgNTrz0"); // Application id from moralis.io
Moralis.serverURL = "https://8a5ybyqvaz6q.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0x991f6B0127805d0aa6f66bd7c3aE8ac64bFa8767";

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
    //Get and render properties from smart contract
    //let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress});
    console.log(array);
    if(array.length == 0) return;
    array.forEach(petId => {
        let details = await contract.methods.getTokenDetails(petId).call({from: ethereum.selectedAddress});
        renderPet(petId, details);
    });
    $("#game").show();
}

function renderPet(id, data) {
    let deathTime = new Date(parseInt(data.lastMeal) + parseInt(data.endurance) * 16256800);
    let now = new Date();
    if(now > deathTime) {
        deathTime = "<b>DEAD</b>";
    }

    let htmlString = `
    <div class="col-md-4 card" id="pet_${id}">
        <img class="card-img-top pet_img" src="robot.jpg">
        <div class="card-body">
            <div>Id: <span id="pet_id">${id}</span></div>
            <div>Damage: <span class="pet_damage">${data.damage}</span></div>
            <div>Magic: <span class="pet_magic">${data.magic}</span></div>
            <div>Endurance: <span class="pet_endurance">${data.endurance}</span></div>
            <div>Time to starvation: <span class="pet_starvation_time">${deathTime}</span></div>
            <button data-pet-id="${id}" class="feed_button" class = "btn btn-primary btn-block">Feed</button>
        </div>           
    </div>`;

    let element = $.parseHTML(htmlString);
    $("#pet_row").append(element);

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


$("#feed_button").click(() => {
    let petId = $("#feed_button").attr("data-pet-id");
    feed(petId);
});
  

init();
