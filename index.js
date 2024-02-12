let localStore = {
  currentIndexes: [0, 1, 2],
  currentStepIndex: 0,
};

// Single slider creator function

const singleSlider = ({ prev, next, items, indicator }) => {
  if (indicator.state) {
    indicator.span.innerHTML = `${localStore.currentStepIndex + 1} / ${items.length}`;
  } else if (indicator.dot) {
    console.log('dot')
  }
  let currentSlide = null;

  const handlePrev = () => {
    localStore.currentStepIndex =
      localStore.currentStepIndex <= 0
        ? (localStore.currentStepIndex = items.length - 1)
        : localStore.currentStepIndex - 1;
    renderSingleSlider();
  };

  const handleNext = () => {
    localStore.currentStepIndex =
      localStore.currentStepIndex >= items.length - 1
        ? (localStore.currentStepIndex = 0)
        : localStore.currentStepIndex + 1;
    renderSingleSlider();
  };

  const renderSingleSlider = () => {
    currentSlide = items[localStore.currentStepIndex];
    if (indicator.state === 'text') {
      indicator.span.innerHTML = `${localStore.currentStepIndex + 1} / ${items.length}`;
    } else if (indicator.state === 'dot') {
      if (localStore.currentStepIndex > 0) {
        prev.disabled = !true;
      } 
      indicator.span.forEach(el => el.style.backgroundColor = '#D9D9D9');
      indicator.span[localStore.currentStepIndex].style.backgroundColor = '#313131';
    }
    
    items.forEach((box) => (box.style.display = "none"));
    currentSlide.style.display = "block";
  };

  prev.addEventListener("click", handlePrev);
  next.addEventListener("click", handleNext);
};

// Card-slider creator function

const cardSlider = ({ prev, next, items, indicator }) => {
  indicator.innerHTML = `${localStore.currentIndexes[2]} / ${items.length}`;
  let renderCards = [];

  const handlePrevBtn = () => {
    localStore.currentIndexes = localStore.currentIndexes.map((el) =>
      el === 0 ? (el = items.length - 1) : (el = el - 1)
    );
    renderCardSlider();
  };

  const handleNextBtn = () => {
    localStore.currentIndexes = localStore.currentIndexes.map((el) =>
      el >= items.length - 1 ? (el = 0) : (el = el + 1)
    );
    renderCardSlider();
    
  };

  const renderCardSlider = () => {
    localStore.currentIndexes.forEach(
      (el) => (renderCards = [...renderCards, items[el]])
    );
    indicator.innerHTML = `${localStore.currentIndexes[1] + 1} / ${items.length}`;
    cards.forEach((card) => (card.style.display = "none"));

    renderCards.forEach((card, i) => {
      card.style.display = "block";
      card.style.order = i;
    });

    renderCards = [];
  };
  
  prev.addEventListener("click", handlePrevBtn);
  next.addEventListener("click", handleNextBtn);

  setInterval(() => handleNextBtn(), 4000)
};

const stepPrev = document.querySelector(".step__prev");
const stepNext = document.querySelector(".step__next");
const stepsInfoBoxes = document.querySelectorAll(".item__mobile");
const stepIndicator = document.querySelectorAll(".step__dot");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const cards = document.querySelectorAll(".slider-participants__card");
const sliderIndicator = document.querySelector('.slider-participants__indicator');


const mediaQueryFunc = () => {
  if (window.matchMedia("(max-width: 1222px)").matches) {
    singleSlider({ prev: stepPrev, next: stepNext, items: stepsInfoBoxes, indicator: { state: 'dot', span: stepIndicator } });
    singleSlider({ prev: prevBtn, next: nextBtn, items: cards, indicator: { state: 'text', span: sliderIndicator } });
  } else {
    cardSlider({ prev: prevBtn, next: nextBtn, items: cards, indicator: sliderIndicator }); 
  }
};

mediaQueryFunc();
