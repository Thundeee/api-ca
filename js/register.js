import { logRegister } from'./apiCalls.js';


const base_Url = "https://nf-api.onrender.com/api/v1";

const registerUrl = `${base_Url}/social/auth/register`;

const errormsg = document.getElementById("error")

const registerForm = document.querySelector("form#userRegister");



registerForm.addEventListener("submit", validateRegister);



async function validateRegister(event) {
    event.preventDefault();

    console.log(registerForm.elements)
    let registerInfo = {
     name:   registerForm.elements[0].value,
     email: registerForm.elements[1].value,
     password: registerForm.elements[2].value,
    }

    if ((/[.!?\\-]/).test(registerInfo.name)){
        errormsg.innerHTML = "Name must not contain punctuation symbols apart from underscore."
        return;
    } else if (!(/@(stud.noroff.no|noroff.no)/).test(registerInfo.email)) {
        errormsg.innerHTML = "Invalid email address, please use your Noroff address."
        return;

    } else if (registerInfo.password.length < 8) {
        errormsg.innerHTML = "Password has to be 8 or more characters."
        return;
    }

   await logRegister(registerUrl, registerInfo, "registerComplete.html");


}
