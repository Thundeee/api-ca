
const base_Url = "https://nf-api.onrender.com/api/v1";

const postUrl = `${base_Url}/social/posts?_author=true`;

const postApiUrl = `${base_Url}/social/posts/`;


    const search = document.querySelector("form#searchBar");
    search.addEventListener("submit", sortSearch);


    let messager = document.querySelector(".msg")


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
  container.innerHTML = "";

  radioBttns.innerHTML="Showing: Newest First";

// Object.keys(cards).length
  for (let i = 0; i < Object.keys(cards).length; i++) {
    let buttons = "";
  let update = "created";

    if (cards[i].created !== cards[i].updated) {
      update = "updated";
      console.log(update);
    }

    if (cards[i].author.name == localStorage.getItem("username")) {
      buttons = `
                <button type="button" class="btn btn-warning changer" onclick="editer(${cards[i].id}, this.parentNode)">Edit</button>
                <button type="button" class="btn btn-warning" onclick="deleter(${cards[i].id})">Delete</button>

            

            `;
    }


    let pfp = "./multimedia/default.png"

    if (cards[i].author.avatar) {
        pfp = cards[i].author.avatar 
    }

    console.log(cards[i].media)
    if (!cards[i].media) {

      cards[i].media = ``
    };

    let date = new Date(cards[i][update]);

    
    (container.innerHTML += `
                <div class="card-body bg-light mb-5 border">
                    <div class="card-title d-flex justify-content-between"><h3 class= "textTitle">${cards[i].title}</h3><img src ="${pfp}" class="img-fluid" width = "50px"/></div>
                    <div class="card-subtitle mb-2 text-muted">By: ${
                        cards[i].author.name
                    }</div>
                    <p class="card-text baseText">${cards[i].body}</p>
                    <img src= "${cards[i].media}" class="img-fluid cardMedia"></img>
                    <a href="./post.html?${cards[i].id}">Link to post</a>
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
    let title = document.querySelector("h2")
    title.innerHTML = `What's on your mind ${localStorage.getItem("username")}?`
postMaker(json);
}


initial()




//post update delete





async function postApiCall(url, methodType, userData) {
  try {

    const token = localStorage.getItem("accessToken");
      const postData = {
          method: methodType,
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),

      };
      console.log(userData)
      const response = await fetch(url, postData);
      console.log(response);
      const json = await response.json();
      console.log(json);


  }   catch (error) {
      console.log(error);
  }

}


const postPoster = document.querySelector("form.poster");
postPoster.addEventListener("submit", maker);


async function maker() {
  event.preventDefault();
  let postMakerData = {
    "title": `${postPoster.elements[0].value}`,
    "body": `${postPoster.elements[1].value}`,
    "media": `${postPoster.elements[2].value}`,
  }

  if( postMakerData["media"] === "" ) {
    delete postMakerData["media"]
  }


 await postApiCall(postApiUrl, "POST", postMakerData);
 await getWithToken(postUrl);
 postMaker(json);

 messager.innerHTML = "Post Created."

 setTimeout(() => {

   messager.innerHTML = ""
   
 }, 5000);

}




async function deleter(postId) {
  
let url = postApiUrl + postId;



  await postApiCall(url, "DELETE");
  await getWithToken(postUrl);
  postMaker(json);
  messager.innerHTML = "Post Deleted."

  setTimeout(() => {

    messager.innerHTML = ""
    
  }, 5000);
}




let editUrl;

function editer(postId, element) {

  editUrl = postApiUrl + postId
  
  console.log(element)
 let title = element.querySelector(".textTitle");
 let text = element.querySelector(".baseText");
 let media = element.querySelector(".cardMedia");


  newTitle = document.createElement('input');
 newTitle.value = title.innerHTML;
 title.replaceWith(newTitle);


  newText = document.createElement("input");
 newText.value = text.innerHTML;
 text.replaceWith(newText);

  newMedia = document.createElement("input");
  newMedia.type = 'url'
 if (media.getAttribute('src')) {
  newMedia.value = media.src;
  
 } else {
   newMedia.value = "";
 }

 media.replaceWith(newMedia);
 newMedia.insertAdjacentHTML("afterend", "<br>")

let button = element.querySelector(".changer")
button.innerHTML = "Confirm Changes";
button.setAttribute( "onClick", "javascript: editConfirm(this.parentNode);" );







}


async function editConfirm(element) {

 let newPost = element.querySelectorAll("input")

 let postEdit = {
    "title": `${newPost[0].value}`,
    "body": `${newPost[1].value}`,
    "media": `${newPost[2].value}`,
  }


  if( postEdit["media"] === "" ) {
    delete postEdit["media"]
  }  

await postApiCall(editUrl, "PUT", postEdit);
await getWithToken(postUrl);
postMaker(json);
messager.innerHTML = "Post Edited."

setTimeout(() => {

  messager.innerHTML = ""
  
}, 5000);


}