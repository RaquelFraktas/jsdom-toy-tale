let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
   
  
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    })
    .then(result => {
      renderToys(result)
    });

  function renderToys(toys){
  toys.forEach ((toy) =>{
      let cardDiv = document.createElement('div');
        cardDiv.className = "card";
      let h2Tag = document.createElement('h2');
        h2Tag.innerHTML = toy["name"];
      let imageTag= document.createElement("img");
        imageTag.src = toy["image"];
      let p = document.createElement('p');
        p.innerHTML = toy["likes"];
      let button = document.createElement('button');
        button.className= "like-btn";
        button.innerText= "like";

      cardDiv.appendChild(button);
      cardDiv.appendChild(p);
      cardDiv.appendChild(h2Tag);
      cardDiv.appendChild(imageTag);
      toyCollection.appendChild(cardDiv);
    })
  }

  function postToy(toy_data){
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name" : toy_data["name"]
        "image": toy_data["image"]
        "likes": 0
       
      })
    }
    .then(response => response.json())
    .then(toy_obj => {
      renderToys(toy_obj)
      })
    }







  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      document.addEventListener("submit", postToy(e.target))
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
