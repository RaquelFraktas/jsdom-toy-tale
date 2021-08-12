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
      forEachToy(result)
    });

  function renderToys(toy){
  // toys.forEach ((toy) =>{

      let h2Tag = document.createElement('h2');
        h2Tag.innerText = toy["name"];
      let imageTag= document.createElement("img");
        imageTag.src = toy["image"];
        imageTag.className= "toy-avatar"
      let p = document.createElement('p');
        p.innerText = toy["likes"];
      let button = document.createElement('button');
        button.className= "like-btn";
        button.innerText= "like";
        button.addEventListener("click", e => addLikes(e, toy.id))
      
      let cardDiv = document.createElement('div');
      cardDiv.className = "card";
      cardDiv.append(h2Tag, imageTag, p, button);
      toyCollection.appendChild(cardDiv);
    // })
  }

  function postToy(toy_data){
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },   
      body: JSON.stringify({
        "name": toy_data["name"].value,
        "image": toy_data["image"].value,
        "likes": 0
       
      })
    })
    .then(response => response.json())
    .then(toy_obj => renderToys(toy_obj))
  };
  


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", function (e){
        e.preventDefault();
        postToy(e.target)
      })
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function addLikes(event, id){
    let numLikes = parseInt(event.target.parentElement.querySelector("p").innerText)
     event.preventDefault()
     fetch(`http://localhost:3000/toys/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },  
      body: JSON.stringify({
        "likes": numLikes +1
      })
    })
      .then(response => response.json())
      .then(obj => event.target.parentElement.querySelector("p").innerText= obj.likes)
  }

  function forEachToy(toys){toys.forEach((toy) => {renderToys(toy)})}

});
