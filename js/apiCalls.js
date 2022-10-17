async function logRegister(url, userData, newUrl) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    console.log(userData);
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    console.log(response.ok);
    if (response.ok !== true) {
      document.getElementById("error").innerHTML = json.errors[0].message;
      throw new Error();
    }

    if (json["accessToken"] !== undefined) {
      const username = json.name;
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      console.log("userlogin");
    }

    location.href = newUrl;
  } catch (error) {
    console.log(error);
  }
}

export { logRegister };

/* Test bruker
    name: "asbjorn_testing",
    email: "asbjorn_testing_mail@noroff.no",
    password: "kultkult",
*/
