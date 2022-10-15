import { logRegister } from "./apiCalls.js";

const base_Url = "https://nf-api.onrender.com/api/v1";

const postUrl = `${base_Url}/social/posts?_author=true`;
async function getWithToken(url) {
  try {
    console.log(url);
    if (!localStorage.getItem("accessToken") === null) {
      console.log("no token");
      return;
    }

    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);

    postMaker(json);
  } catch (error) {
    console.log(error);
  }
}

function postMaker(json) {
  let postCreator = document.createElement("div");

  let update = "created";

  for (let i = json.length - 1; i >= 0; i--) {
    console.log(i);
    let buttons = "";

    if (json[i].created !== json[i].updated) {
      update = "updated";
      console.log(update);
    }

    if (json[i].author.name == localStorage.getItem("username")) {
      buttons = `
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-warning">Delete</button>



            `;
    }


    let pfp = "./multimedia/default.png"

    if (json[i].author.avatar) {
        pfp = json[i].author.avatar 
    }


    let date = new Date(json[i][update]);

    postCreator.classList.add("card");
    postCreator.style.width = "30rem";
    postCreator.style.backgroundColor = "#508bfc";
    postCreator.style.border = "none";
    let card = (postCreator.innerHTML += `
                <div class="card-body bg-light mb-5 border">
                    <div class="card-title d-flex justify-content-between"><h3>${json[i].title}</h3><img src ="${pfp} "class="img-fluid" width = "50px"/></div>
                    <div class="card-subtitle mb-2 text-muted">By: ${
                      json[i].author.name
                    }</div>
                    <p class="card-text">${json[i].body}</p>
                    <img src= "${json[i].media}" class="img-fluid"></img>
                    <p class="card-text"><b>${uppercase(update)}</b> ${date
      .toString()
      .replace(/GMT.*$/g, "")}</p>
                    ${buttons}
                </div>
            `);

    document
      .getElementById("cardContainer")
      .insertAdjacentElement("afterbegin", postCreator);
  }
}

function uppercase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

getWithToken(postUrl);
