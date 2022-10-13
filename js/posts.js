import { logRegister } from'./apiCalls.js';

const base_Url = "https://nf-api.onrender.com/api/v1";

const postUrl = `${base_Url}/social/posts`;



async function getWithToken(url) {
    try {
        console.log(url)
        if (!localStorage.getItem("accessToken") === null) {
            console.log("no token")
            return;
        }

        const token = localStorage.getItem('accessToken')
        console.log(token)
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        
        const response = await fetch(url, fetchOptions  );
        console.log(response)
        const json = await response.json();
        console.log(json)


    } catch (error) {
console.log(error)  
    }
    
};


getWithToken(postUrl);