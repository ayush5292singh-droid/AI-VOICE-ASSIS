const send = document.getElementById("send");
const input = document.getElementById("textInput");
const chat = document.getElementById("chat");
const mic = document.getElementById("mic");


send.onclick = () => {
    sendMessage();
};


input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});


// 🎤 Voice Recognition

mic.onclick = function(){

    const SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;


    if(!SpeechRecognition){
        alert("Voice recognition is not supported on this browser");
        return;
    }


    let recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();


    mic.innerHTML="🔴";


    recognition.onresult = function(event){

        let voiceText = event.results[0][0].transcript;

        input.value = voiceText;

        sendMessage();

    };


    recognition.onend=function(){

        mic.innerHTML="🎤";

    };

};



// Send Message

function sendMessage(){

    let text=input.value.trim();

    if(text===""){
        return;
    }


    addMessage(text,"user");

    input.value="";


    setTimeout(()=>{

        addMessage(getAIReply(text),"ai");

    },700);

}



// Add Chat Bubble

function addMessage(text,type){

    let div=document.createElement("div");

    div.className="message "+type;

    div.innerHTML=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}



// Basic AI

function getAIReply(message){

    message=message.toLowerCase();


    if(message.includes("hello") || message.includes("hi")){
        return "Hello! I am listening.";
    }


    if(message.includes("your name")){
        return "I am Nova AI.";
    }


    if(message.includes("how are you")){
        return "I am working perfectly!";
    }


    return "I understood: "+message;
}
