const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
startPosition = 0,
currentTranslate = 0,
prevTranslate = 0,
animationID = 0,
currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImg = slide.querySelector('img');
  slideImg.addEventListener('dragstart', (e) => e.preventDefault());
  // TOUCH EVENTS
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
  // MOUSE EVENTS
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
})

// DISABLE CONTEXT MENU
window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false
}

// FUNCTIONS

function touchStart(index) {
  return function (e) {
    currentIndex = index 
    // console.log(e.type.includes('mouse'))
    startPosition = e.type.includes('mouse') 
    ? e.pageX 
    : e.touches[0].clientX
    // console.log(startPosition)
    isDragging= true;
  }
}

function touchEnd() {
  isDragging=false;
}

function touchMove() {
if (isDragging) {
  console.log('move')
}
}