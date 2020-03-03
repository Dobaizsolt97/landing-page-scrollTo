// Define Global Variables

// selecting all tags with the name of section
const navbarUl = document.getElementById("navbar__list");
const sections = document.getElementsByTagName("section");

//spreadding them into an array
const arrayOfSections = [...sections];
//getting the id-s of those sections
const links = arrayOfSections.map(section => section.id);

// activate and deactivate a certain section of the page by removing/ adding the class
function makeUnactive(section) {
  const target = document.getElementById(`${section}`);
  target.classList.remove("your-active-class");
}
function makeActive(section) {
  const target = document.getElementById(`${section}`);
  target.classList.add("your-active-class");
}
// adding class to highight the current section, on the navbar
function makeLinkActive(section) {
  const linkTarget = document.querySelector(`.${section}`);
  linkTarget.style.background = "#333";
  linkTarget.style.color = "white";
}
function makeLinkInactive(section) {
  const linkTarget = document.querySelector(`.${section}`);
  linkTarget.style.background = "white";
  linkTarget.style.color = "#333";
}

// build the nav
// generating the navbar based on the array containing the sections id's
function populateNav(array) {
  for (link of array) {
    navbarUl.innerHTML += `<li><a onclick='scrollToAnchor(${link})' class='menu__link ${link}'  >${link}</a></li>`;
  }
}
//calling the function to populate the navbar from the start
populateNav(links);

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(link) {
  // initializing the scrollTo distance
  let distance = 0;
  // getting the Oy value of our targeted section
  const targetPozition = link.getBoundingClientRect().top;
  // getting the current Oy position
  const startPosition = window.pageYOffset;
  // determining the distance to be scrolled and adjusting it considering the navbar's influence
  distance = targetPozition + startPosition - 100;
  window.scrollTo({
    top: distance,
    behavior: "smooth"
  });
}

// function that determines if a section is in viewport or not, while scrolling
window.onscroll = () => {
  for (link of links) {
    let element = document.getElementById(`${link}`);
    let elementPosition = element.getBoundingClientRect().top;
    console.log(elementPosition);
    let heightElement = element.offsetHeight;
    /* making the item active as it remains in our viewport
    the 200 value makes sure we don't have 2 sections active at the same time */
    if (elementPosition >= -heightElement + 200 && elementPosition < 200) {
      this.makeActive(link);
      this.makeLinkActive(link);
    } else {
      this.makeUnactive(link);
      this.makeLinkInactive(link);
    }
  }
};
