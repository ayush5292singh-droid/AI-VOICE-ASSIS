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


// Voice button

mic.onclick = function(){

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;


if(!SpeechRecognition){
alert("Voice not supported");
return;
}


let recognition = new SpeechRecognition();

recognition.lang="en-US";

recognition.start();

mic.innerHTML="🔴";


recognition.onresult=function(event){

let text=event.results[0][0].transcript;

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

addMessage(getAIReply(text),"ai");

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



// AI Brain

function getAIReply(msg){

let text=msg.toLowerCase();



// Remember name

if(text.includes("my name is")){

userName=msg.split("is")[1].trim();

return "Nice to meet you "+userName+"! I will remember your name.";

}



if(text.includes("what is my name")){

if(userName!==""){
return "Your name is "+userName+".";
}

return "You have not told me your name yet.";

}



// Greetings

if(text.includes("hello") || text.includes("hi")){

return "Hello "+(userName || "friend")+"! How can I help you?";

}



// Time

if(text.includes("time")){

return "Current time is "+new Date().toLocaleTimeString();

}



// Date

if(text.includes("date") || text.includes("today")){

return "Today is "+new Date().toDateString();

}



// Calculator

if(text.includes("calculate")){

try{

let equation=text.replace("calculate","");

return "Answer: "+eval(equation);

}

catch{

return "I could not calculate that.";

}

}



// AI personality

if(text.includes("who are you")){

return "I am Nova AI, your personal digital assistant.";

}


if(text.includes("thank")){

return "You're welcome! 😊";

}



return "I am improving every day. Tell me more!";

} 
