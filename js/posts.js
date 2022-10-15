
const base_Url = "https://nf-api.onrender.com/api/v1";

const postUrl = `${base_Url}/social/posts?_author=true`;

let json;

async function getWithToken(url) {
  try {
    console.log(url);
    if (localStorage.getItem("accessToken") === null) {
      console.log("no token");
      location.href = "index.html"
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
    json = await response.json();
    console.log(json);

  } catch (error) {
    console.log(error);
  }
}


let container = document.querySelector(".card")


function postMaker(cards) {
  let update = "created";
  container.innerHTML = "";


  for (let i = Object.keys(cards).length - 1; i >= 0; i--) {
    let buttons = "";

    if (cards[i].created !== cards[i].updated) {
      update = "updated";
      console.log(update);
    }

    if (cards[i].author.name == localStorage.getItem("username")) {
      buttons = `
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-warning">Delete</button>



            `;
    }


    let pfp = "./multimedia/default.png"

    if (cards[i].author.avatar) {
        pfp = cards[i].author.avatar 
    }

    let date = new Date(cards[i][update]);
    (container.innerHTML += `
                <div class="card-body bg-light mb-5 border">
                    <div class="card-title d-flex justify-content-between"><h3>${cards[i].title}</h3><img src ="${pfp}" class="img-fluid" width = "50px"/></div>
                    <div class="card-subtitle mb-2 text-muted">By: ${
                        cards[i].author.name
                    }</div>
                    <p class="card-text">${cards[i].body}</p>
                    <img src= "${cards[i].media}" class="img-fluid"></img>
                    <p class="card-text"><b>${uppercase(update)}</b> ${date.toString().replace(/GMT.*$/g, "")}</p>
                    ${buttons}
                </div>
 `);
  }
}

function uppercase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}





function logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
}



//---- sorting

let radioBttns = document.getElementById("switch")

radioBttns.addEventListener("click", sortNewOld)

function sortNewOld() {


    let element = document.querySelectorAll(".card-body")
    let lastElement = container.lastElementChild;

    if (radioBttns.innerHTML === "Showing: Newest First"){
         radioBttns.innerHTML="Showing: Oldest First";
        console.log("oldest posts first")
    } else {
        radioBttns.innerHTML="Showing: Newest First";
        console.log("newest post first")
    }
    

    for (let i = 0; i < element.length; i++) {
            container.insertBefore(element[i], lastElement.nextSibling);

    }
  };

function sortMedia() {


    let postList = {};
    let j = 0

for (let i = 0; i < json.length; i++) {
    if (!json[i].media == "") {
        postList[j] = json[i]
        j++;
        }
    
}
postMaker(postList);
}

function sortMe() {

    let postList = {};
    let j = 0

for (let i = 0; i < json.length; i++) {
    if (json[i].author.name == localStorage.getItem("username")) {
        postList[j] = json[i]
        j++;
        }
        postMaker(postList);


}

}








    const search = document.querySelector("form#searchBar");
    search.addEventListener("submit", sortSearch);

function sortSearch() {
    event.preventDefault();

let keyword = search.elements[0].value

if (!keyword) {
    postMaker(json);
    return;
}


let postList = {};
let j = 0

for (let i = 0; i < json.length; i++) {
if (json[i].body.includes(keyword) || json[i].title.includes(keyword) || json[i].author.name.includes(keyword)) {
    postList[j] = json[i]
    j++;
    }
    postMaker(postList);

}
}






async function initial() {
    await getWithToken(postUrl);
postMaker(json);
}


initial()