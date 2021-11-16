// ----------------------  GLOBAL DECLARATIONS  ---------------------  //

let addToy = false;
const baseURL = 'http://localhost:3000/toys';
let toyCollection = dqs('#toy-collection');

// ------------------------------------------------------------------  //

//  ----------------------  // MAIN FUNCTION // ---------------------- //

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  refreshToys();

  const submitForm = dqs('.add-toy-form');
  submitForm.addEventListener('submit', e => {
    e.preventDefault();
    const submittedName = e.target.name.value;
    const submittedImage = e.target.image.value;
    addNewToy(submittedName, submittedImage);
    e.target.reset();
  })
});

//  ----------------------  // MAIN FUNCTION // ---------------------- //

// ------------------------------------------------------------------  //

function dqs(targ) {
  return document.querySelector(targ);
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function renderToy(name, img_url, numLikes, id) {
  let newCard = document.createElement('div');

  newCard.className = 'card';
  newCard.innerHTML = `<h2>${name}</h2> 
  <img src="${img_url}" class="toy-avatar" />
  <p>${numLikes} Likes </p>
  <button class="like-btn" id="${id}">Like <3</button>`;

  likeButton = newCard.querySelector('.like-btn');
  likeButton.addEventListener('click', e => increaseLikes(e, id));

  toyCollection.appendChild(newCard);
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function refreshToys() {
  fetch(baseURL)
  .then(resp => resp.json())
  .then(allToys => {
    for (toy of allToys) {
      renderToy(toy.name, toy.image, toy.likes, toy.id);
    }
  });
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function addNewToy (name, img_url) {
  fetch(baseURL, {
    method: 'POST',
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify({
      "name": name,
      "image": img_url,
      "likes": 0
    }),
  })
  .then(resp => resp.json())
  .then(addedToy => {
    renderToy(addedToy.name, addedToy.image, addedToy.likes, addedToy.id);
  });
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function increaseLikes(e, id) {
  
  const DOMLikes = e.target.parentElement.querySelector("p");

  fetch(`${baseURL}/${id}`)
  .then(resp => resp.json())
  .then(toy => {
    let likes = toy.likes + 1;
    fetch(`${baseURL}/${id}`, {
      method: 'PATCH',
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({
        "likes": likes
      }),
    })
    .then(resp => resp.json())
    .then(updatedToy => {
      DOMLikes.textContent = `${updatedToy.likes} Likes`;
    });
  })
}

// ------------------------------------------------------------------  //

