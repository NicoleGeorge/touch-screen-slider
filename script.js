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
    startPosition = getPositionX(e)
    // console.log(startPosition)
    isDragging= true;

    animationID = requestAnimationFrame(animation)

    slider.classList.add('grabbing')
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID)

  const movedBy = currentTranslate - prevTranslate
  if(movedBy < -100 && currentIndex < slides.length -1)
  currentIndex +=1;

  if(movedBy > 100 && currentIndex > 0) currentIndex -=1;

  setSliderPositionByIndex()


  slider.classList.remove('grabbing')
}

function touchMove(e) {
if (isDragging) {
  // console.log('move')
  const currentPosition = getPositionX(e)
  currentTranslate = prevTranslate + currentPosition - startPosition
}
}

function getPositionX(e) {
  return e.type.includes('mouse') 
    ? e.pageX 
    : e.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setSliderPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition();

}