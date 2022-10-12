import { logRegister } from'./apiCalls.js';

const base_Url = "https://nf-api.onrender.com/api/v1";

const loginUrl = `${base_Url}/social/auth/login`;

const loginForm = document.querySelector("form#userLogin");

loginForm.addEventListener("submit", validateLogin);


function validateLogin(event) {
    event.preventDefault();

  let loginInfo = {
 email: loginForm.elements[0].value,
     password: loginForm.elements[1].value,
   }
logRegister(loginUrl, loginInfo);
   }


