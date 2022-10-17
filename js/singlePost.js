const base_Url = "https://nf-api.onrender.com/api/v1";


let json;

async function postPage() {
    let query = location.search;

    let checkedQuery = query.replace(/[?]/, "")

    const postApiUrl = `${base_Url}/social/posts/${checkedQuery}?_author=true`;
await fetchApi(postApiUrl);
singlePostMaker(json)
}


// PUT ALL THIS AS IMPORT EXPORT LATER


async function fetchApi(url) {
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


function singlePostMaker(card) {
  container.innerHTML = "";




let buttons = "";
 let update = "created";

    if (card.created !== card.updated) {
      update = "updated";
      console.log(update);
    }

    if (card.author.name == localStorage.getItem("username")) {
      buttons = `
                <button type="button" class="btn btn-warning changer" onclick="editer(${card.id}, this.parentNode)">Edit</button>
                <button type="button" class="btn btn-warning" onclick="deleter(${card.id})">Delete</button>

            

            `;
    }


    let pfp = "./multimedia/default.png"

    if (card.author.avatar) {
        pfp = card.author.avatar 
    }

    let date = new Date(card[update]);

    
    (container.innerHTML += `
                <div class="card-body bg-light mb-5 mt-5 border">
                    <div class="card-title d-flex justify-content-between"><h3 class= "textTitle">${card.title}</h3><img src ="${pfp}" class="img-fluid" width = "50px"/></div>
                    <div class="card-subtitle mb-2 text-muted">By: ${
                        card.author.name
                    }</div>
                    <p class="card-text baseText">${card.body}</p>
                    <img src= "${card.media}" class="img-fluid cardMedia"></img>
                    <p class="card-text"><b>${uppercase(update)}</b> ${date.toString().replace(/GMT.*$/g, "")}</p>
                    ${buttons}
                    <br>
                    <a href="./home.html" type="button" class="btn btn-warning changer">Return</a>
                    
                </div>
 `);
  
}

function uppercase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}





function logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
}
