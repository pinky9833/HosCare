const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

const themeToggler = document.querySelector(".theme-toggler");
themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register() {
  RegForm.style.transform = "translateX(0px)";
  LoginForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
}

function login() {
  RegForm.style.transform = "translateX(300px)";
  LoginForm.style.transform = "translateX(300px)";
  Indicator.style.transform = "translateX(0px)";
}





const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  // if user is scrolling to the left
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);




// Smooth scrolling for quick links
document.querySelectorAll('.footer-section.links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hover effect for social media icons
const socialIcons = document.querySelectorAll('.footer-section .socials a');

socialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.color = '#aaa';
  });

  icon.addEventListener('mouseleave', () => {
    icon.style.color = '#fff';
  });
});




const reviewsContainer = document.querySelector(".reviews-container");
let isDrag = false, startPos, currentTranslate, prevTranslate, animationID, currentIndex = 0;

const reviews = Array.from(reviewsContainer.children);

reviewsContainer.addEventListener("mousedown", touchStart);
reviewsContainer.addEventListener("mouseup", touchEnd);
reviewsContainer.addEventListener("mousemove", touchMove);
reviewsContainer.addEventListener("touchstart", touchStart);
reviewsContainer.addEventListener("touchend", touchEnd);
reviewsContainer.addEventListener("touchmove", touchMove);

function touchStart(event) {
  isDrag = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  reviewsContainer.classList.add("grabbing");
}

function touchEnd() {
  isDrag = false;
  cancelAnimationFrame(animationID);
  reviewsContainer.classList.remove("grabbing");

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < reviews.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
}

function touchMove(event) {
  if (isDrag) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDrag) requestAnimationFrame(animation);
}

function setSliderPosition() {
  reviewsContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}









document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const firstImg = carousel.querySelectorAll("img")[0];
  const arrowIcons = document.querySelectorAll(".wrapper i");
  const modal = document.getElementById("doctorModal");
  const modalContent = modal.querySelector(".modal-content");
  const closeBtn = modal.querySelector(".close");
  const doctorNameElem = document.getElementById("doctorName");
  const doctorDetailsElem = document.getElementById("doctorDetails");

  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

  const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
  }

  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg.clientWidth + 14;
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
    });
  });

  const autoSlide = () => {
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
      return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  }

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  }

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);

  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);

  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
  carousel.addEventListener("touchend", dragStop);

  carousel.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", (e) => {
      const doctorName = e.target.getAttribute("data-name");
      const doctorDetails = e.target.getAttribute("data-details");

      doctorNameElem.textContent = doctorName;
      doctorDetailsElem.textContent = doctorDetails;

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});







document.addEventListener('DOMContentLoaded', function () {
  const moreBoxes = document.querySelectorAll('.more-box');
  const viewMoreLink = document.getElementById('viewMoreLink');

  // Initially hide additional boxes
  moreBoxes.forEach(box => {
    box.style.display = 'none';
  });

  // Handle click event on View More/View Less link
  viewMoreLink.addEventListener('click', function (event) {
    event.preventDefault();

    // Toggle visibility of additional boxes
    moreBoxes.forEach(box => {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });

    // Toggle text of View More/View Less link
    const linkText = viewMoreLink.textContent.trim();
    viewMoreLink.textContent = linkText === 'View More' ? 'View Less' : 'View More';
  });
});




const scriptURL = 'https://script.google.com/macros/s/AKfycby1qk-t_bARJj1pFKoKo0tZR-vOp0qAaS4j5ANpDgRtauK-7PtNODoWnV1x7r485nkqzA/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "Message Sent Successfully"
      setTimeout(function () {
        msg.innerHTML = ""
      }, 3000)
      form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})


