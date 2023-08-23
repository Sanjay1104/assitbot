const chatInput=document.querySelector(".cinput textarea");

const sendchatbutton=document.querySelector(".cinput span");

const box=document.querySelector(".box");

let userMessage;
const API_KEY="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";

const createChatLi=(message,className)=>{
    const chatLi= document.createElement("li");
    chatLi.classList.add("bot",className);
    let chatContent= className === "outgoing"? `<p>${message}</p>`:`  <span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}
const generateResponse=(incomingChatLi)=>{
  const api_url="https://api.openai.com/v1/chat/completions";
  
  const messageElement=incomingChatLi.querySelector("p");
  
  const requestOptions={
    method:"POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-3.5-turbo",
      messages:[{role:"user",content:userMessage}]
   })
  }
  fetch(api_url,requestOptions).then(res=>res.json()).then(data=>{
    messageElement.textContent=data.choices[0].message.content;
  }).catch((error)=>{
    messageElement.textContent="Oops!Something went wrong"
  })
}
const handlechat= () => {
  userMessage = chatInput.value.trim();

  if(!userMessage) return ;
  
  box.appendChild(createChatLi(userMessage,"outgoing"));
  setTimeout(() => {
    const incomingChatLi=createChatLi("Thinking...","incoming");
    box.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  },600);
}

sendchatbutton.addEventListener("click",handlechat)