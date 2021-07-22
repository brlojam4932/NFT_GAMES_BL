
Moralis.initialize("IgjTev92MjQUSMuHXIhc7A5KiFOGrtJ2RBgNTrz0"); // Application id from moralis.io
Moralis.serverURL = "https://8a5ybyqvaz6q.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = '0x85393f5a33Cc9b7dD34f69A2cD578073f855485E';

async function init() {
    try {
        let user = Moralis.User.current();
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
    let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let data = await contract.methods.getTokenDetails(petId).call({from: ethereum.selectedAddress});
    console.log(data);
    renderPet(0, data);
    $("#game").show();
}

function renderPet(id, data) {
    $("#pet_id").html(id);
    $("#pet_damage").html(data.damage);
    $("#pet_magic").html(data.magic);
    $("#pet_endurance").html(data.endurance);
    $("#feed_button").attr("data-pet-id", id);

    let deathTime = new Date(parseInt(data.lastMeal) + parseInt(data.endurance) * 1000);
    let now = new Date();
    if(now > deathTime) {
        deathTime = "<b>DEAD</b>";
    }

    $("#pet_starvation_time").html(deathTime);
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
        console.log("done");
        renderGame();
    }))

}


$("#feed_button").click(() => {
    let petId = $("#feed_button").attr("data-pet-id");
    feed(petId);
});

init();
