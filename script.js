const send = document.getElementById("send");
const input = document.getElementById("textInput");
const chat = document.getElementById("chat");
const mic = document.getElementById("mic");

let userName = "";


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
alert("Voice recognition not supported");
return;
}


let recognition = new SpeechRecognition();

recognition.lang="en-US";

recognition.start();

mic.innerHTML="🔴";


recognition.onresult=function(event){

let text = event.results[0][0].transcript;

input.value=text;

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

let reply=getAIReply(text);

addMessage(reply,"ai");

speak(reply);

},700);

}



// Add message

function addMessage(text,type){

let div=document.createElement("div");

div.className="message "+type;

div.innerHTML=text;

chat.appendChild(div);

chat.scrollTop=chat.scrollHeight;

}



// 🔊 AI Speaking Function

function speak(text){

let speech = new SpeechSynthesisUtterance(text);

speech.lang="en-US";

speech.rate=1;

speech.pitch=1;

window.speechSynthesis.speak(speech);

}



// AI Brain

function getAIReply(msg){

let text=msg.toLowerCase();


if(text.includes("my name is")){

userName=msg.split("is")[1].trim();

return "Nice to meet you "+userName;

}


if(text.includes("what is my name")){

return userName ?
"Your name is "+userName :
"I don't know your name yet.";

}


if(text.includes("hello") || text.includes("hi")){

return "Hello "+(userName || "friend")+"! I am listening.";

}


if(text.includes("time")){

return "The time is "+new Date().toLocaleTimeString();

}


if(text.includes("date")){

return "Today is "+new Date().toDateString();

}


if(text.includes("who are you")){

return "I am Nova AI, your personal voice assistant.";

}


if(text.includes("thank")){

return "You are welcome!";

}


return "I am learning and improving. Tell me something new.";

}
