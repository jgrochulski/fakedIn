// ----------------------  GLOBAL DECLARATIONS  ---------------------  //

let addToy = false;
const buzzURL = 'https://corporatebs-generator.sameerkumar.website/';
const profileURL = 'https://randomuser.me/api/';
const myURL = 'http://localhost:3000/myProfile';
const jobURL = 'http://localhost:3000/jobs';
const companiesURL = 'http://localhost:3000/companies';
const imgURL = 'http://localhost:3000/images';
let toyCollection = dqs('#toy-collection');

const postCount = 5;
const verbosity = 5;
const newsCount = 6;
const maxViews = 36;
const minConnections = 50;

let edit = false;


// ------------------------------------------------------------------  //

//  ----------------------  // MAIN FUNCTION // ---------------------- //

document.addEventListener("DOMContentLoaded", () => {
  // build randomization
  const profileViews = dqs('#profile_views');
  const numViews = Math.ceil(Math.random() * (maxViews + 1))
  profileViews.textContent = numViews;

  const profileConnections = dqs('#profile_connections');
  const numConnections = Math.ceil(Math.random() * 650) + minConnections;

  if (numConnections >= 500 ) {
    profileConnections.textContent = "500+";
  }
  else {
    profileConnections.textContent = numConnections;
  }

  fetch(myURL)
  .then(resp => resp.json())
  .then(myProfile => {
    console.log(myProfile.name);

    const myName = dqs('.profile_column_header');
    const myIntro = dqs('#profile_intro');
    const myImage = dqs('.profile_column_me');
    const myHeader = dqs('.profile_column');
    const editProfile = dqs('#edit_profile');

    myName.textContent = myProfile.name;
    myIntro.textContent = myProfile.intro;
    myImage.src = myProfile.image;
    myHeader.style.backgroundImage = "url('./images/default.png')";
    myHeader.style.backgroundSize = "220px";

    myName.addEventListener('click', e => {
      edit = !edit;
      if (edit) {
        editProfile.style.display = "block";
      } else {
        editProfile.style.display = "none";
      }
    });

  })

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
      console.log(`second fetch phrase for news: ${phrase.phrase}`);

      const time = postTime();
      console.log(time);

      const num = numReaders();

      const newsList = dqs('.news_list');
      console.log(newsList);

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

//  ----------------------  // MAIN FUNCTION // ---------------------- //

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
        console.log(buzzPara);
        renderParagraphPost(fakeImg, fakeName, degree, fakeJob, fakeCompany, time, buzzPara)
      }
      else {
        buzzPara = buzzPara + conjunction[Math.floor(Math.random()*conjunction.length)] + phrase.phrase.toLowerCase();
      }

    });
  }
}

/*
https://upload.wikimedia.org/wikipedia/commons/b/b5/Arthur_Andersen_Witnesses.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Enron_Complex.jpg/1920px-Enron_Complex.jpg
https://assets.entrepreneur.com/static/1425489402-vince-vaughn-appearing-free-cheesy-stock-images-you-can-download-getty-4.jpg
https://cdn.business2community.com/wp-content/uploads/2014/10/wideo-13-10.jpg
https://www.toolbox-studio.com/blog/wp-content/uploads/2020/01/infographic-video.jpg
https://illinilandfca.org/wp-content/uploads/sites/29/2020/01/synergy.jpg
https://www.northeastern.edu/graduate/blog/wp-content/uploads/2019/05/whatdoesabusinessanalystdo_FB.jpg
https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2020/01/20104314/small-business-entrepreneur.jpg
https://www.incimages.com/uploaded_files/image/1920x1080/shutterstock_1145284904_372957.jpg
https://s3.amazonaws.com/utep-uploads/wp-content/uploads/sparkle-box/2019/04/30112737/Female-CEO.jpg
https://www.conceptdraw.com/How-To-Guide/picture/business-report-pie.png
https://www.ielts-mentor.com/images/writingsamples/ielts-graph-243-top-priorities-by-company-size-usa.png
https://pas-bplans.s3.amazonaws.com/sample-plans/bplans/commercial_photography_business_plan/images/f9d0815054a94c41a9afefdc05511c41.png
https://www.slidegeeks.com/pics/dgm/l/s/Slides_For_A_Startup_Pitch_Deck_Ppt_PowerPoint_Presentation_Complete_Deck_With_Slides_Slide_37-.jpg
https://www.slidegeeks.com/pics/dgm/l/r/Revenue_Projections_Ppt_PowerPoint_Presentation_Layouts_Topics_Slide_1-.jpg
https://www.inforum.com/1007408-cpki9i-042019.B.FF.BUZZWORDSwebJPG.jpg/alternates/BASE_LANDSCAPE/042019.B.FF.BUZZWORDSwebJPG.jpg
https://matillion.com/wp-content/uploads/2014/06/business-intelligence-basics-buzzwords.png
https://www.smartcompany.com.au/wp-content/uploads/2015/12/buzzwords600.jpg
https://prodocproposals.com/wp-content/uploads/2016/09/check_us_out.png
https://www.leadonuniversity.com/wp-content/uploads/2015/07/Leadon-Survey-Wordpress-800x794.jpg

*/