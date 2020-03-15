//home and about
const dropdown = document.querySelector('.dropdown')
const menu = document.querySelector('#menu')
const logo = document.querySelector('.logo')
const hero = document.querySelector('#hero')
const home = document.querySelector('.home')
const about = document.querySelector('.about')
const projects = document.querySelector('.projects')
const contact = document.querySelector('.contact')
const headshot = document.querySelector('#headshot')

//nav buttons
const homeBtns = document.querySelectorAll('.home-btn')
const aboutBtns = document.querySelectorAll('.about-btn')
const projectsBtns = document.querySelectorAll('.projects-btn')
const contactBtns = document.querySelectorAll('.contact-btn')

//titles
const aboutTitle = document.querySelector('#about-title')
const projectsTitle = document.querySelector('#projects-title')
const contactTitle = document.querySelector('#contact-title')


//project containers
const projectsContainer = document.querySelector('.projects-container')

//about text
const aboutText = document.querySelector('#about-text')
const about1 = document.querySelector('#about1')
const about2 = document.querySelector('#about2')
const underscore = document.querySelector('.underscore')

//skills
const skillIntro = document.querySelector('#skill-intro')
const skillsContainer = document.querySelector('#skills-container')

//projects (outside link)
const project1 = document.querySelector('#project1')
const project2 = document.querySelector('#project2')
const project3 = document.querySelector('#project3')

//projects text
const textBoxTl = document.querySelector('.text-box-tl')
const textBoxBr = document.querySelector('.text-box-br')


//all nav anchors
const anchors = document.querySelectorAll('.nav-anchor')

//contact section

const contactForm = document.querySelector('#contact-form')
const submitBtn = document.querySelector('#submit-btn')

const messageName = document.querySelector('#message-name')
const messageSubject = document.querySelector('#message-subject')
const messageContent = document.querySelector('#message-content')





//threejs for home section
let scene, camera, renderer, cube;

function init() {
  scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xFFFFFF );

  camera = new THREE.PerspectiveCamera(75,
    home.offsetWidth / home.offsetHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

  //MOBILE render
  if (window.innerWidth < 800) {
    renderer.setSize(window.innerWidth * .8, window.innerHeight * .8)
    // renderer.domElement.style = 'padding-bottom: 10rem'
  } else {
    renderer.setSize( window.innerWidth, window.innerHeight
      )};

  home.appendChild(renderer.domElement)

  const geometry = new THREE.DodecahedronGeometry();
  const material = new THREE.MeshBasicMaterial( {color: 0x6bb37d} );

  cube = new THREE.Mesh( geometry, material );

  scene.add( cube );

  const wireGeo = new THREE.DodecahedronGeometry();
  const wireMat = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: true} );

  wireCube = new THREE.Mesh(wireGeo, wireMat)

  scene.add( wireCube )


  camera.position.z = 3.4;

}

//menu drop on click

function dropMenu() {
  ('dropping menu!')
  dropdown.classList.contains('open') ? dropdown.classList.remove('open') : dropdown.classList.add('open')
  menu.classList.contains('dropped') ? menu.classList.remove('dropped') : menu.classList.add('dropped')
}

//animate dodecagon
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  wireCube.rotation.x += 0.02;
  wireCube.rotation.y += 0.02;

  renderer.render( scene, camera )

}

init();
animate();

//WebGLRenderer
const canvas = renderer.domElement



//Sticky Header on scroll
window.onscroll = function() {myFunction()};
  console.log('scrollY: ', window.scrollY)
var header = document.querySelector("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//Smooth scroll for button transitions
function smoothScroll(target, duration) {

  // var target = document.querySelector(target);

  //Top of the target
  //Target position changes by header height(?) when header is added
  var startPosition = window.pageYOffset
  if(target === projectsTitle) {
    targetPosition = target.getBoundingClientRect().top - 150;
  } else {
    var targetPosition = target.getBoundingClientRect().top;

  }

  //distance the of the window (client view) from the page top StartPosition
  //home to any of the links works, but between links it still treats the bottom of the header like the top of the page
  var distance = targetPosition - startPosition;
  var startTime = null

  function animation(currentTime) {
    if(startTime === null) {
      startTime = currentTime
    }
    var timeElapsed = currentTime - startTime
    var run = ease(timeElapsed, startPosition, targetPosition, duration)
    window.scrollTo(0, run)
    if(timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }
//ease function
  function ease(t, b, c, d) {
  	t /= d/2;
  	if (t < 1) return c/2*t*t*t + b;
  	t -= 2;
  	return c/2*(t*t*t + 2) + b;
  };

    requestAnimationFrame(animation)
}
//spin logo on click
function spinLogo(){
    ('spinning', this.style)
    function removeSpin() {
      logo.classList.remove("spin")
    }
    let duration = 600
    logo.classList.value === "logo" ? logo.classList.add("spin") : null
    logo.classList.value === "logo spin" ? setTimeout(removeSpin, duration) : null
}


//get position from element to top of page by cycling through all parent elements
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}




dropdown.addEventListener('click', dropMenu)


//resize canvas on window resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//mobile version - switch if less than a certain size
window.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile!')
  if(window.innerWidth < 900) {
    // window.location.href = "./mobile.html"

  }
})


logo.addEventListener('click', spinLogo)
//go to home on home btn click
homeBtns.forEach(btn => {
  btn.addEventListener('click', function(){
    smoothScroll(home, 900)
  })
})
//go to projects
projectsBtns.forEach(btn => {
  btn.addEventListener('click', function(){
    smoothScroll(projectsTitle, 900)
  })
})
//go to about
aboutBtns.forEach(btn => {
  btn.addEventListener('click', function(){
    smoothScroll(about, 900)
  })
})
//go to contact
contactBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    smoothScroll(contact, 900)
  })
})
//adding classes on scroll down
window.addEventListener('scroll', function() {
  ((window.scrollY + window.innerHeight))
  //title fade in for each section
    //about
  if((window.scrollY + window.innerHeight) >= aboutTitle.offsetTop) {
    aboutTitle.classList.add('fadeIn')
  }
  if((window.scrollY + window.innerHeight) >= (underscore.offsetTop + 1000)) {
    underscore.classList.add('slideIn')
  }
  if((window.scrollY + window.innerHeight) >= getPosition(skillsContainer).y) {
    skill1.classList.add('slideDown')
    skill2.classList.add('slideDown')
    skill3.classList.add('slideDown')

  }
  if((window.scrollY + window.innerHeight) >= getPosition(skillsContainer).y) {
    skill4.classList.add('slideUp')
    skill5.classList.add('slideUp')
    skill6.classList.add('slideUp')
  }

    //projects
  if((window.scrollY + window.innerHeight) >= projectsTitle.offsetParent.offsetTop) {
    projectsTitle.classList.add('fadeIn')

  }
  //contact
  if((window.scrollY + window.innerHeight) >= contactTitle.offsetParent.offsetTop) {
    contactTitle.classList.add('fadeIn')

  }



  //About section transitions
  if((window.scrollY + window.innerHeight) >= aboutText.offsetTop) {
    aboutText.classList.add('fadeIn')
  }

  if((window.scrollY + window.innerHeight) >= about1.offsetTop) {
    about1.classList.add('fadeIn')
  }
  //second about text paragraph
  if((window.scrollY + window.innerHeight) >= about2.offsetTop) {
    about2.classList.add('fadeIn')
  }

  if((window.scrollY + window.innerHeight) >= getPosition(skillIntro).y) {
    skillIntro.classList.add('slideLeft')
  }

  //Projects fade in
  if((window.scrollY + window.innerHeight) >= getPosition(projectsContainer).y) {
    //bubble up for projects
    project1.classList.add('bubbleUp')
    project2.classList.add('bubbleUp')
    project3.classList.add('bubbleUp')
    project4.classList.add('bubbleUp')
  }

  //Projects text fade in
  if((window.scrollY + window.innerHeight) >= getPosition(textBoxTl).y + 100) {
    textBoxTl.classList.add('fadeIn')
  }
  if((window.scrollY + window.innerHeight) >= getPosition(textBoxBr).y + 100) {
    textBoxBr.classList.add('fadeIn')
  }

  //contact form pop up
  if((window.scrollY + window.innerHeight) >= contactForm.offsetTop) {
    //
    contactForm.classList.add('popUp')
  }

})

//add shadow class to links on page load
window.addEventListener('DOMContentLoaded', (event) => {
    ('DOM fully loaded and parsed');

    const links = document.querySelectorAll('.project-link')
    links.forEach(link => link.classList.add('shadow'))
});

//prevent page refresh on nav anchor tags
anchors.forEach(anchor => anchor.addEventListener('click', (e) => {
    e.preventDefault();
}))


//prevent page refresh on submit btn
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let message = {};
  message.name = messageName.value;
  message.name === "" ? message.name = "a friend" : null;
  message.subject = messageSubject.value;
  message.subject === "" ? message.subject = "Hello!" : null;
  message.content = messageContent.value;
  message.content === "" ? message.content = "I love your portfolio!" : null;
  window.open(`mailto:baintonw@gmail.com?subject=${message.subject}&body=A message from ${message.name}: ${message.content}`);


  ('message', message)
})
