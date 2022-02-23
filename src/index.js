let addToy = false;
const toys = "http://localhost:3000/toys";
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection")
document.addEventListener("DOMContentLoaded", () => {
  fetch(toys)
    .then (response => response.json())
    .then(toys => {
      let toysHTML = toys.map(function(toy){
        return `
        <div class='card'>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class='toy-avatar'/>
        <p>${toy.likes} likes</p>
        <button class='like-btn'>Like </button>
        </div>
        `
      })
        toyCollection.innerHTML = toysHTML.join('')
      });
toyFormContainer.addEventListener("submit", e => {
  e.preventDefault()
  const toyName = e.target.name.value
  const toyImage = e.target.image.value
  fetch(toys , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
  .then (r => r.json())
  .then(newToy => {
    let newToyHTML = `
    <div class='card'>
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class='toy-avatar'/>
    <p>${newToy.likes} likes</p>
    <button class='like-btn'>Like </button>
    </div>
    `
    toyCollection.innerHTML += newToyHTML

  })
})
  
toyCollection.addEventListener("click", (e) => {
  if (e.target.className === "like-btn"){
   let currentLikes = parseInt(e.target.previousElementSibling.innerText) 
   let newLikes = currentLikes + 1
   e.target.previousElementSibling.innerText = newLikes + " likes"
   fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
   method: "PATCH",
   headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    likes: newLikes
  })

  })
  }
})

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  
  })
  })
