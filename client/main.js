
Moralis.initialize("IgjTev92MjQUSMuHXIhc7A5KiFOGrtJ2RBgNTrz0"); // Application id from moralis.io
Moralis.serverURL = "https://8a5ybyqvaz6q.usemoralis.com:2053/server"; //Server url from moralis.io

async function init() {
    try {
        let user = Moralis.User.current();
        if(!User){
            $("#login_button").click( () => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch (error) {
        console.log(error);
    }
    function renderGame() {
        
    }
}

init();

document.getElementById("login_button").onclick = login;