// ----------------------  GLOBAL DECLARATIONS  ---------------------  //

const buzzURL = 'https://corporatebs-generator.sameerkumar.website/';
const profileURL = 'https://randomuser.me/api/';
const userURL = 'http://localhost:3000/user';
const jobURL = 'http://localhost:3000/jobs';
const companiesURL = 'http://localhost:3000/companies';
const imgURL = 'http://localhost:3000/images';
const defaultImg = "./images/default_profile_small.png"


const postCount = 5;
const verbosity = 5;
const newsCount = 6;
const maxViews = 36;
const minConnections = 50;

let editUser = false;
let createPost = false;


// ------------------------------------------------------------------  //

//  ----------------------  // MAIN FUNCTION // ---------------------- //

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------ declare all DOM element selectors here ---------------------- //
  const userDOM = {
    name: dqs('.profile_column_header'),
    tagline: dqs('#profile_intro'),
    image: dqs('.profile_column_me'),
    header: dqs('.profile_column'),
    edit: dqs('#edit_profile'),
    views: dqs('#profile_views'),
    connections:dqs('#profile_connections')
  };

  const profUpdate = dqs('#edit_profile_form');

  // ssd wip below 

  const userName = dqs('.profile_column_header');
  const userTagline = dqs('#profile_intro');
  const userImage = dqs('.profile_column_me');
  const userHeader = dqs('.profile_column');
  const editProfile = dqs('#edit_profile');
  
  const userViews = dqs('#profile_views');
  const userConnections = dqs('#profile_connections');

  // --------------------- set up event handlers here ------------------------------------- // 
  userDOM.name.addEventListener('click', () => {
    editUser = toggleDisplay(editUser, userDOM);
  });

  
  fetch(userURL)
  .then(resp => resp.json())
  .then(user => {
    renderUser(user, userDOM);
  });

  // profile update funcitonality                                 HERE HERE HERE                    !!!

  // console.log(nameUpdate);
  profUpdate.addEventListener('submit', e => {
    e.preventDefault();
    updateProfile(e);
    e.target.reset();
  })

  //  create post toggle

  const startPostButton = dqs('#start_a_post_button');

  startPostButton.addEventListener('click', e => {
    e.preventDefault();

    createPostContainer = dqs('.create_post_form_container');

    createPost = !createPost;
    if (createPost) {
      createPostContainer.style.display = "block";
    }
    else {
      createPostContainer.style.display = "none"
    }


  })

  // add create a post event listeners  ================================================

  const createPostForm = dqs('#create_post_form');
  
  // document.addEventListener('submit', e => {
  //   e.preventDefault();
  //   const newPostContent = e.target.postContent.value;
  //   const newPostImage = e.target.image.value;

  
  //   renderMyPost(user.image, user.name, "me", user.intro, "blank", "Just now", newPostContent, newPostImage)

  //   e.target.reset();
  // })



  // build content 
  for (i = 0; i < postCount; i++) {
    fetch(profileURL)
    .then(resp => resp.json())
    .then(profile => {
      const fakeProfile = profile.results[0];
      const fakeImg = fakeProfile.picture.medium;
      const fakeName = `${fakeProfile.name.first} ${fakeProfile.name.last}`;
      // console.log(fakeProfile);
      // console.log(fakeImg);
      // console.log(fakeName);

      let id = Math.ceil(Math.random() * 88);
      // console.log(id);
      fetch(`${jobURL}/${id}`)
      .then(resp => resp.json())
      .then(job => {
        const fakeJob = job.name;
        // console.log(`the fake job is: ${fakeJob}`);

        const time = postTime();
        // console.log(time);
        
        const degree = connectionDegree();
        // console.log(degree);

        fetch(companiesURL)
        .then(resp => resp.json())
        .then(companies => {
          const randC = Math.floor(Math.random() * 500);
          // console.log(randC);
          // console.log(companies[0][randC]);
          const fakeCompany = companies[0][randC];

          fetch(buzzURL)
          .then(resp => resp.json())
          .then(phrase => {

            const buzzPhrase = phrase.phrase;
            // console.log(buzzPhrase);
            // console.log('we are here');

            const randPost = Math.random();

            if (randPost < 0.6) {
              fetch(imgURL)
              .then(resp => resp.json())
              .then(img => {
                const postImg = img[Math.floor(Math.random() * img.length)];
                renderPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPhrase, postImg);
              })
            }
            else {
              createBuzzParagraph(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPhrase);
              // console.log(buzzParagraph);
              // console.log(`typeof = ${typeof buzzParagraph}`);
              // renderParagraphPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzParagraph);

            }

          })

          

        })

        

      });


    });
  }

  for (i = 0; i < newsCount; i++) {
    fetch(buzzURL)
    .then(resp => resp.json())
    .then(phrase => {
      // console.log(`second fetch phrase for news: ${phrase.phrase}`);

      const time = postTime();
      // console.log(time);

      const num = numReaders();

      const newsList = dqs('.news_list');
      // console.log(newsList);

      let li = document.createElement('li');
      li.className = 'list_title';
      li.textContent = fakeHeadline(phrase.phrase);

      let p = document.createElement('p');
      p.className = 'list_subtext';
      p.textContent = `${time} ago • ${num} readers`
      li.appendChild(p);

      newsList.appendChild(li);
    })
  }


  // const postFeed = dqs('.content_column');
  // console.log(postFeed);



  // let post = document.createElement('div');
  // post.className = 'content_post';
  // post.innerHTML = `
  // <div class="content_post_inner">
  //   <div class="content_profile">
  //     <img class="content_profile_img" src="images/me.jpg" alt="user_icon">
  //     <div class="content_profile_stack">
  //       <span class="stack_name_span">
  //         <div class="stack_firstname_lastname">
  //           Firstname Lastname
  //         </div>
  //         <div class="stack_connection">
  //           • 3rd
  //         </div>
  //       </span>
  //       <br/>
  //       <span class="stack_title">
  //         Senior Account Executive at Company
  //       </span>
  //       <br/>
  //       <span class="stack_time">
  //         10h •
  //       </span>
  //       <img class="global" src="images/global.png" width="14" alt="user_icon">
  //     </div>
  //   </div>
  //   <div class="content_text">Holistically E-enable Extensive Internal Or "Organic" Sources</div>
  //   <div class="content_image">
  //     <img class="content_image_img" src="images/generic.jpeg" alt="content_image">
  //   </div>
  //   <div class="content_likes">
  //     <span class="likes_span">
  //       <img class="likes_image" src="images/likes.png" width="14" alt="likes"> 
  //       <span class="number_likes">11</span>
  //     </span>
  //   </div>
  //   <hr class="solid">
  //   <span class="bottom_buttons">
  //     <input type="button" class="like_button" value="      Like" />
  //     <input type="button" class="comment_button" value="        Comment" />
  //   </span>
  // </div>
  // `;

  // postFeed.appendChild(post);

  // getBuzzPhrase();

  // getFakeProfile();

  // getFakeJob();

  // connectionDegree();

  // postTime();

});

//  ##################  ##################  ----------------------  // MAIN FUNCTION // ---------------------- #################  ##################  //

// ------------------------------------------------------------------  //

function generateUserStats(userViews, userConnections) {
  const numViews = Math.ceil(Math.random() * (maxViews + 1))
  userViews.textContent = numViews;

  const numConnections = Math.ceil(Math.random() * 650) + minConnections;

  if (numConnections >= 500 ) {
    userConnections.textContent = "500+";
  }
  else {
    userConnections.textContent = numConnections;
  }
};

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function renderUser(user, userDOM) {
  userDOM.name.textContent = user.name;
  userDOM.tagline.textContent = user.tagline;
  userDOM.image.src = user.image;

  generateUserStats(userDOM.views, userDOM.connections);
};

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function toggleDisplay(toggle, userDOM) {
  toggle = !toggle;
  if (toggle) {
    userDOM.edit.style.display = "block";
  } 
  else {
    userDOM.edit.style.display = "none";
  }
  return toggle;
};

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function updateProfile(e) {
  console.log('working');

  newName = e.target.name.value;
  newTagline = e.target.intro.value;
  newImage = e.target.image.value;

  if (newName.length == 0) {
    newName = 'Firstname Lastname';
  }
  else {
    // nothing
  }
  if (newTagline.length == 0) {
    newTagline = 'Job Title at Some Company';
  }
  else {
    // nothing
  }
  if (newImage.length == 0) {
    newImage = defaultImg;
  }
  else {
    // nothing
  }

  const userName = dqs('.profile_column_header');
  const userTagline = dqs('#profile_intro');
  const userImage = dqs('.profile_column_me');
  const myImage2 = dqs('.create_post_me');
  const myImage3 = dqs(".nav_me");

  userName.textContent = newName;
  userTagline.textContent = newTagline;
  userImage.src = newImage;
  myImage2.src = newImage;
  myImage3.src = newImage;
}













// ------------------------------------------------------------------  //

function dqs(targ) {
  return document.querySelector(targ);
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function getBuzzPhrase() {
  fetch(buzzURL)
  .then(resp => resp.json())
  .then(buzz => console.log(buzz.phrase));
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function getFakeProfile() {
  fetch(profileURL)
  .then(resp => resp.json())
  .then(profile => {
    // console.log(profile.results[0].name.first+' '+profile.results[0].name.last);
  });
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function getFakeJob() {
  let id = Math.ceil(Math.random() * 88);
  console.log(id);
  fetch(`${jobURL}/${id}`)
  .then(resp => resp.json())
  .then(job => {
    console.log(job.name)
    fakeJob = job.name;
  });
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function connectionDegree() {
  let degree = "";
  const rand = Math.random();
  // console.log(rand)
  if (rand < 0.25) {
    degree = "1st";
    // console.log('1st degree here')
  }
  else if (rand < 0.55) {
    degree = "2nd";
    // console.log('2nd degree here')
  }
  else {
    degree = "3rd";
    // console.log('3rd degree here')
  }
  // console.log(degree);
  return degree;
}

// ------------------------------------------------------------------  //

// ------------------------------------------------------------------  //

function postTime() {
  const time = Math.ceil(Math.random() * 24);
  // console.log(`${time}h`)
  return `${time}h`;
  
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function numReaders() {
  const num = Math.ceil(Math.random() * 100000);
  if (num > 999) {

    let numSplit = num.toString().split("");
    numSplit.splice(numSplit.length-3, 0, ",");
    const numFormatted = numSplit.join('');

    return numFormatted;
  }
  else {
    return num;
  }
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function fakeHeadline(str) {
  const num = Math.random();
  if (num < 0.2 ) {
    const headline = `${str}? Yes.`;
    return headline;
  }
  else if (num < 0.3) {
    const headline = `This is How to ${str}.`;
    return headline;
  }
  else if (num < 0.4) {
    const headline = `Finally! ${str}.`;
    return headline;
  }
  else if (num < 0.45) {
    const headline = `${str}.`;
    return headline;
  }
  else if (num < 0.6) {
    const headline = `${str}. Learn How!`;
    return headline;
  }
  else if (num < 0.8) {
    const headline = `This is Why You Need to ${str}.`;
    return headline;
  }
  else if (num < 1.0) {
    const headline = `You Can Now ${str}.`;
    return headline;
  }
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function renderPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPhrase, postImg) {
  
  const punctuation = [
    ".",
    ".",
    ` at ${fakeCompany}!`
  ]

  const intro = [
    "Check out how to ",
    "Learn a bit about how to ",
    `As a ${fakeJob}, I know how to `,
    `To all the ${fakeJob} professionals: See how to '`,
    `Here at ${fakeCompany} we love to `,
  ]

  buzzPhrase = intro[Math.floor(Math.random()*intro.length)] + buzzPhrase.toLowerCase() + punctuation[Math.floor(Math.random()*punctuation.length)];

  


  const postFeed = dqs('.content_column');
  // console.log(postFeed);



  let post = document.createElement('div');
  post.className = 'content_post';
  post.innerHTML = `
  <div class="content_post_inner">
    <div class="content_profile">
      <img class="content_profile_img" src="${fakeImg}" alt="user_icon">
      <div class="content_profile_stack">
        <span class="stack_name_span">
          <div class="stack_firstname_lastname">
            ${fakeName}
          </div>
          <div class="stack_connection">
            • ${degree}
          </div>
        </span>
        <br/>
        <span class="stack_title">
          ${fakeJob} at ${fakeCompany}
        </span>
        <br/>
        <span class="stack_time">
          ${time} •
        </span>
        <img class="global" src="images/global.png" width="14" alt="user_icon">
      </div>
    </div>
    <div class="content_text">${buzzPhrase}</div>
    <div class="content_image">
      <img class="content_image_img" src="${postImg}" alt="content_image">
    </div>
    <div class="content_likes">
      <span class="likes_span">
        <img class="likes_image" src="images/likes.png" width="14" alt="likes"> 
        <span class="number_likes">11</span>
      </span>
    </div>
    <hr class="solid">
    <span class="bottom_buttons">
      <input type="button" class="like_button" value="      Like" />
      <input type="button" class="comment_button" value="        Comment" />
    </span>
  </div>
  `;

  postFeed.appendChild(post);
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function renderParagraphPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPhraseParagraph) {
  const postFeed = dqs('.content_column');
  // console.log(postFeed);



  let post = document.createElement('div');
  post.className = 'content_post';
  post.innerHTML = `
  <div class="content_post_inner">
    <div class="content_profile">
      <img class="content_profile_img" src="${fakeImg}" alt="user_icon">
      <div class="content_profile_stack">
        <span class="stack_name_span">
          <div class="stack_firstname_lastname">
            ${fakeName}
          </div>
          <div class="stack_connection">
            • ${degree}
          </div>
        </span>
        <br/>
        <span class="stack_title">
          ${fakeJob} at ${fakeCompany}
        </span>
        <br/>
        <span class="stack_time">
          ${time} •
        </span>
        <img class="global" src="images/global.png" width="14" alt="user_icon">
      </div>
    </div>
    <div class="content_text">${buzzPhraseParagraph}</div>
    <div class="content_likes">
      <span class="likes_span">
        <img class="likes_image" src="images/likes.png" width="14" alt="likes"> 
        <span class="number_likes">11</span>
      </span>
    </div>
    <hr class="solid">
    <span class="bottom_buttons">
      <input type="button" class="like_button" value="      Like" />
      <input type="button" class="comment_button" value="        Comment" />
    </span>
  </div>
  `;

  postFeed.appendChild(post);
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //

function createBuzzParagraph(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, str) {
  // const randPara = Math.floor(Math.random() * verbosity);
  const randPara = Math.ceil(Math.random() * verbosity);
  const fakeValues = [
    "our commitment to",
    "the endless pursuit towards", 
    "being able to "
  ]
  const intro = [
    "Today we can ",
    `${fakeCompany} is all about ${fakeValues[Math.floor(Math.random()*fakeValues.length)]} `,
    `Check out what ${fakeCompany} is doing to `,
    `Here at ${fakeCompany} we love to `,
    `Our ${fakeCompany} family cares about how we `
  ];
  let buzzPara = intro[Math.floor(Math.random()*intro.length)] + str.toLowerCase();
  // let buzzPara = intro;
  let punctuation = [
    "? Yes!",
    ".",
    "!",
    `. Check us out at ${fakeCompany}!`,
    ". Let's do it!"
  ];

  for (let i = 0; i < randPara; i++) {
    const conjunction = [
      ", while also being able to ",
      " and ",
      " & ",
      ".<br> Together, we can ",
      ".<br><br>Also, we can ",
      " and ",
      " & even ",
      `. Plus, ${fakeCompany} `,
      `. What's more, let's `
    ] ;
    fetch(buzzURL)
    .then(resp => resp.json())
    .then(phrase => {
      
      if (i === randPara - 1) {
        buzzPara = buzzPara + conjunction[Math.floor(Math.random()*conjunction.length)] + phrase.phrase.toLowerCase() + punctuation[Math.floor(Math.random()*punctuation.length)];
        // console.log(buzzPara);
        renderParagraphPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPara)
      }
      else {
        buzzPara = buzzPara + conjunction[Math.floor(Math.random()*conjunction.length)] + phrase.phrase.toLowerCase();
      }

    });
  }
}

// ------------------------------------------------------------------  //
// ------------------------------------------------------------------  //



//

function renderMyPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPhrase, postImg) {
  
  const postFeed = dqs('.content_column');

  let post = document.createElement('div');
  post.className = 'content_post';
  post.innerHTML = `
  <div class="content_post_inner">
    <div class="content_profile">
      <img class="content_profile_img" src="${fakeImg}" alt="user_icon">
      <div class="content_profile_stack">
        <span class="stack_name_span">
          <div class="stack_firstname_lastname">
            ${fakeName}
          </div>
          <div class="stack_connection">
            • ${degree}
          </div>
        </span>
        <br/>
        <span class="stack_title">
          ${fakeJob} at ${fakeCompany}
        </span>
        <br/>
        <span class="stack_time">
          ${time} •
        </span>
        <img class="global" src="images/global.png" width="14" alt="user_icon">
      </div>
    </div>
    <div class="content_text">${buzzPhrase}</div>
    <div class="content_image">
      <img class="content_image_img" src="${postImg}" alt="content_image">
    </div>
    <div class="content_likes">
      <span class="likes_span">
        <img class="likes_image" src="images/likes.png" width="14" alt="likes"> 
        <span class="number_likes">11</span>
      </span>
    </div>
    <hr class="solid">
    <span class="bottom_buttons">
      <input type="button" class="like_button" value="      Like" />
      <input type="button" class="comment_button" value="        Comment" />
    </span>
  </div>
  `;

  postFeed.prepend(post);
}