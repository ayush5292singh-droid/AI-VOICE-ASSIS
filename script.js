const send = document.getElementById("send");
const input = document.getElementById("textInput");
const chat = document.getElementById("chat");


send.onclick = function(){
    sendMessage();
};


input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});


function sendMessage(){

    let text = input.value.trim();

    if(text === ""){
        return;
    }


    addMessage(text,"user");

    input.value="";


    setTimeout(()=>{

        let reply = getAIReply(text);

        addMessage(reply,"ai");

    },700);

}



function addMessage(text,type){

    let div = document.createElement("div");

    div.className="message "+type;

    div.innerHTML=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}



function getAIReply(message){

    message = message.toLowerCase();


    if(message.includes("hello") || message.includes("hi")){
        return "Hello! Nice to talk with you 😊";
    }


    if(message.includes("name")){
        return "I am Nova AI, your personal assistant.";
    }


    if(message.includes("time")){
        return "I can help you check time in the future with a clock feature.";
    }


    if(message.includes("who are you")){
        return "I am an AI assistant created for this app.";
    }


    return "I am learning! Soon I will become smarter with more features.";
}
