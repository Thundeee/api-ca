


async function logRegister(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),

        };
        console.log(userData)
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);

        if(json["accessToken"] !== undefined){
                    const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        console.log("userlogin");
        }

    }   catch (error) {
        console.log(error);
    }

}

export {logRegister};

/* Test bruker
    name: "asbjorn_testing",
    email: "asbjorn_testing_mail@noroff.no",
    password: "kultkult",
*/