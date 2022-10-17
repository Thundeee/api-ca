const base_Url = "https://nf-api.onrender.com/api/v1";

const postApiUrl = `${base_Url}/social/posts/`;

let container = document.querySelector(".card");

let query = location.search.replace(/[?]/, "");

const singlePostUrl = `${base_Url}/social/posts/${query}?_author=true`;

let messager = document.querySelector(".msg");

let json;

async function postPage() {
  await fetchApi(singlePostUrl);
  singlePostMaker(json);
}

// PUT ALL THIS AS IMPORT EXPORT LATER

async function fetchApi(url) {
  try {
    if (localStorage.getItem("accessToken") === null) {
      console.log("no token");
      location.href = "index.html";
      return;
    }

    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    console.log(response);
    json = await response.json();
    console.log(json);

    if (json.statusCode == 404) {
      document.getElementById("error").innerHTML = "Post " + json.status;
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
}

async function postApiCall(url, methodType, userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };
    console.log(userData);
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

function singlePostMaker(card) {
  container.innerHTML = "";

  let buttons = "";
  let update = "created";

  if (card.created !== card.updated) {
    update = "updated";
  }

  if (card.author.name == localStorage.getItem("username")) {
    buttons = `
                <button type="button" class="btn btn-warning changer" onclick="editer(${card.id}, this.parentNode)">Edit</button>
                <button type="button" class="btn btn-warning" onclick="deleter(${card.id})">Delete</button>

            

            `;
  }

  let pfp = "./multimedia/default.png";

  if (card.author.avatar) {
    pfp = card.author.avatar;
  }

  if (!card.media) {
    card.media = ``;
  }

  let date = new Date(card[update]);

  container.innerHTML += `
                <div class="card-body bg-light mb-5 mt-5 border">
                    <div class="card-title d-flex justify-content-between"><h3 class= "textTitle">${
                      card.title
                    }</h3><img src ="${pfp}" class="img-fluid" width = "50px"/></div>
                    <div class="card-subtitle mb-2 text-muted">By: ${
                      card.author.name
                    }</div>
                    <p class="card-text baseText">${card.body}</p>
                    <img src= "${card.media}" class="img-fluid cardMedia"></img>
                    <p class="card-text"><b>${uppercase(update)}</b> ${date
    .toString()
    .replace(/GMT.*$/g, "")}</p>
                    ${buttons}
                    <br>
                    <a href="./home.html" type="button" class="btn btn-warning mt-2 changer">Return</a>
                    
                </div>
 `;
}

function uppercase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function logOut() {
  localStorage.removeItem("username");
  localStorage.removeItem("accessToken");
}

async function deleter(postId) {
  let url = postApiUrl + postId;

  await postApiCall(url, "DELETE");
  postPage();
  messager.innerHTML = "Post Deleted.";

  setTimeout(() => {
    messager.innerHTML = "";
  }, 5000);
}

let editUrl;

function editer(postId, element) {
  editUrl = postApiUrl + postId;

  let title = element.querySelector(".textTitle");
  let text = element.querySelector(".baseText");
  let media = element.querySelector(".cardMedia");

  newTitle = document.createElement("input");
  newTitle.value = title.innerHTML;
  title.replaceWith(newTitle);

  newText = document.createElement("input");
  newText.value = text.innerHTML;
  text.replaceWith(newText);

  newMedia = document.createElement("input");
  newMedia.type = "url";
  if (media.getAttribute("src")) {
    newMedia.value = media.src;
  } else {
    newMedia.value = "";
  }

  media.replaceWith(newMedia);

  let button = element.querySelector(".changer");
  button.innerHTML = "Confirm Changes";
  button.setAttribute("onClick", "javascript: editConfirm(this.parentNode);");
}

async function editConfirm(element) {
  let newPost = element.querySelectorAll("input");

  let postEdit = {
    title: `${newPost[0].value}`,
    body: `${newPost[1].value}`,
    media: `${newPost[2].value}`,
  };

  if (postEdit["media"] === "") {
    delete postEdit["media"];
  }

  await postApiCall(editUrl, "PUT", postEdit);
  postPage();
  messager.innerHTML = "Post Edited.";

  setTimeout(() => {
    messager.innerHTML = "";
  }, 5000);
}

postPage();
