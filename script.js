let n, z
// Get the modal
const modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const modalImg = document.getElementById("Mimg01");
const captionText = document.getElementById("caption1");


function Enlarge(clicked_id){
    modal.style.display = "grid";
    const img_link = window.getComputedStyle(clicked_id, null).getPropertyValue("background-image");
    modalImg.style.backgroundImage= img_link;
    captionText.innerHTML = clicked_id.title;
    onkeydown = g => {
        if (g.key === "ArrowLeft") previousSlide()
        if (g.key === "ArrowRight") nextSlide()
        if (g.key === "Escape") close_window()
    }
}


function currentSlide(clicked_id) {
    // NOTE: this is reassigning a global var
    n = window.getComputedStyle(clicked_id, null).getPropertyValue("grid-row-start");
    n = parseInt(n, 10);
    // NOTE: this is reassigning a global var
    z = window.getComputedStyle(clicked_id, null).getPropertyValue("grid-column-start");
    z = parseInt(z, 10);
}

const nextSlide = () => navigateSlides(1, 1)
const previousSlide = () => navigateSlides(-1, -1)


function navigateSlides(v, m) {
    const slides = document.getElementsByClassName("gallery__img");

    let slideIndexN = v + n
    let slideIndexZ = m + z

    if (window.matchMedia("(max-width: 800px)").matches) { // If media query matches
        slideIndexZ = 1
        if (slideIndexN < 1) {
            slideIndexN = 39
        } else if (slideIndexN > 39) {
            slideIndexN = 1
        }

    } else if (v > 0) {
        if ([2, 3, 4].includes(slideIndexZ)) {
            slideIndexN -= 1;
        }
    } else {
        if (slideIndexZ === 1) {
            slideIndexZ = 4;
            if (slideIndexN < 1) {
                slideIndexN = 13
            }
        } else if (slideIndexZ === 2) {
            slideIndexN=slideIndexN+1;
        } else if (slideIndexZ === 3) {
            slideIndexN += 1;
            if (slideIndexN < 1) {
                slideIndexN = 1
            }
        } else if (slideIndexZ === 4) {
            slideIndexN += 1;
        }
    }

    if (slideIndexZ > 4) {
        slideIndexZ = 2
    }

    if (slideIndexN > 13) {
        slideIndexN = 1
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";}

    for (i = 0; i < slides.length; i++) {
        let y = window.getComputedStyle(slides[i], null).getPropertyValue("grid-row-start");
        y = parseInt(y,10);
        let p = window.getComputedStyle(slides[i], null).getPropertyValue("grid-column-start");
        p = parseInt(p,10);
        if (y === slideIndexN && p === slideIndexZ) {
            const img_link = window.getComputedStyle(slides[i],null).getPropertyValue("background-image");
            modalImg.style.backgroundImage = img_link;
            captionText.innerHTML = slides[i].title;
        }
    }
    // NOTE: this is reassigning a global var
    n = slideIndexN;
    // NOTE: this is reassigning a global var
    z = slideIndexZ;
};


// When the user clicks on <span> (x), close the modal
function close_window () {
  modal.style.display = "none";
  const slides = document.getElementsByClassName("gallery__img");
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "block";}}

/* scroll pages on iphone */

/* // TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT
// Courtesy of PADILICIOUS.COM and MACOSXAUTOMATION.COM */
var triggerElementID = null; /*/ this variable is used to identity the triggering element */
var fingerCount = 0;
var startX = 0;
var startY = 0;
var curX = 0;
var curY = 0;
var deltaX = 0;
var deltaY = 0;
var horzDiff = 0;
var vertDiff = 0;
var minLength = 72; /*/ the shortest distance the user may swipe */
var swipeLength = 0;
var swipeAngle = null;
var swipeDirection = null;

function touchStart (event, passedName) {
        /*// disable the standard ability to select the touched object */
        event.preventDefault();
        /* // get the total number of fingers touching the screen*/
        fingerCount = event.touches.length;
        /* // since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
        // check that only one finger was used */
        if ( fingerCount === 1 ) {
            /* // get the coordinates of the touch */
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
            /* // store the triggering element ID */
            triggerElementID = passedName;
        } else {
            /* // more than one finger touched so cancel */
            touchCancel(event);}}

function touchMove(event) {
    event.preventDefault();
    if ( event.touches.length === 1 ) {
        curX = event.touches[0].pageX;
        curY = event.touches[0].pageY;
    } else {
        touchCancel(event);}}

function touchEnd(event) {
    event.preventDefault();
    /*// check to see if more than one finger was used and that there is an ending coordinate */
    if ( fingerCount === 1 && curX !== 0 ) {
        /*// use the Distance Formula to determine the length of the swipe */
        swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
        /*// if the user swiped more than the minimum length, perform the appropriate action */
        if ( swipeLength >= minLength ) {
            caluculateAngle();
            determineSwipeDirection();
            processingRoutine();
            touchCancel(event); /*// reset the variables */
        } else {
            touchCancel(event);
        }
    } else {
        touchCancel(event);}}


function touchCancel(event) {
    /*// reset the variables back to default values*/
    fingerCount = 0;
    startX = 0;
    startY = 0;
    curX = 0;
    curY = 0;
    deltaX = 0;
    deltaY = 0;
    horzDiff = 0;
    vertDiff = 0;
    swipeLength = 0;
    swipeAngle = null;
    swipeDirection = null;
    triggerElementID = null;}


function caluculateAngle() {
    const X = startX - curX;
    const Y = curY - startY;
    const r = Math.atan2(Y, X); //angle in radians (Cartesian system)
    swipeAngle = Math.round(r * 180 / Math.PI); //angle in degrees
    if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
    }
}

function determineSwipeDirection() {
    if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
        swipeDirection = 'left';
    } else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
        swipeDirection = 'left';
    } else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
        swipeDirection = 'right';
    } else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
        swipeDirection = 'down';
    } else {
        swipeDirection = 'up';}}


function processingRoutine() {
    if ( swipeDirection === 'left' ) {
        /*// REPLACE WITH YOUR ROUTINES */
        plusSlides(1)
    } else if ( swipeDirection === 'right' ) {
        /*// REPLACE WITH YOUR ROUTINES*/
        plusSlides(-1)
    }
}

// sticky header_landscapes
window.onscroll = () => {
    const header = document.getElementById("myHeader");

    let sticky;
    if (header) {
        sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

// mobile menu script
function myFunction() {
  const x = document.getElementById("new_menu");
  if (x.style.display === "block") {
      x.style.display = "none"
       } else {
       x.style.display = "block";}}

function myFunction2() {
    const x = document.getElementById("new_menu_landscape");
    if (x.style.display === "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block";}}
