const base_Url = "https://nf-api.onrender.com/api/v1";

const registerUrl = `${base_Url}/social/auth/register`;

const loginUrl = `${base_Url}/social/auth/login`;


async function registerUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),

        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
    }   catch (error) {
        console.log(error);
    }

}




// ----------------------------------------- login

async function loginUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),

        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        console.log(json);
    }   catch (error) {
        console.log(error);
    }

}













//registerUser(registerUrl, userToRegister)
//loginUser(loginUrl, userToLogin);

const userToRegister = {
    name: "asbjorn_testing",
    email: "asbjorn_testing_mail@noroff.no",
    password: "kultkult",
};



const userToLogin = {
    email: "asbjorn_test_mail@noroff.no",
    password: "kultkult",
};