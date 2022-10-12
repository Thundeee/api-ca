import { logRegister } from'./apiCalls.js';


const base_Url = "https://nf-api.onrender.com/api/v1";

const registerUrl = `${base_Url}/social/auth/register`;


const registerForm = document.querySelector("form#userRegister");

registerForm.addEventListener("submit", validateRegister);



function validateRegister(event) {
    event.preventDefault();

    console.log(registerForm.elements)
    let registerInfo = {
     name:   registerForm.elements[0].value,
     email: registerForm.elements[1].value,
     password: registerForm.elements[2].value,
    }
    
    logRegister(registerUrl, registerInfo)

}
