/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc () {

    const result = document.querySelector('.calculating__result span')
let sex, height, weight, age, ratio;



if(localStorage.getItem('sex')) {
 sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')) {
 sex = localStorage.getItem('ratio');
} else {
  sex = 1.375;
  localStorage.setItem('ratio', 1.375);
}



function initLocalSettings (selector, activeClass) {
  const elements = document.querySelectorAll(selector)

  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute('id') === localStorage.getItem('sex'))  {
      elem.classList.add(activeClass);
    }

    if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      elem.classList.add(activeClass);
    }
  })
}

initLocalSettings('#gender div', 'calculating__choose-item_active')
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

  function calcTotal () {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal()


  function getStaticInfoirmation(selector, activeClass) { 
  const elements = document.querySelectorAll(`${selector}`)
  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if(e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio')
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
      } else {
        sex = e.target.getAttribute('id')
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }
  
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      })
  
      e.target.classList.add(activeClass)
  
      calcTotal()
    });
  
  })

  }


  getStaticInfoirmation('#gender div', 'calculating__choose-item_active')
  getStaticInfoirmation('.calculating__choose_big div', 'calculating__choose-item_active')


  function getDynamicInfoirmation (selector) {
    const input = document.querySelector(selector);

    
    input.addEventListener('input', () => {
      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
     
      } else {
        input.style.border = 'none';
      }
      
      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    })

  }


  getDynamicInfoirmation ('#height')
  getDynamicInfoirmation ('#weight')
  getDynamicInfoirmation ('#age')
}


module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards () {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.parent = document.querySelector(parentSelector)
          this.price = price;
          this.classes = classes;
          this.transfer = 29;
          this.transferToUAH();
        }
      
      
        transferToUAH () {
           this.price = this.price * this.transfer;
        
        }
      
      
        render () {
          const div = document.createElement('div');
      
          if(!this.classes.length) {
           this.defaultClass = 'menu__item';
            div.classList.add(this.defaultClass)
      
          } else {
            this.classes.forEach(className => div.classList.add(className));
          }
      
          div.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          
                          `;
            this.parent.append(div);
        }
      }
      
      // получаем карточки товара из базы данных и отрисовуем на странице
      const getResource = async (url) => {
        const res = await fetch(url);
          
        if(!res.ok) {
          throw new Error(`Fetching ${url} failed, status ${res.status}`);
        }
      
        return await res.json();
      }
      
      getResource('http://localhost:3000/menu')
        .then(data => {
          data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          })
        })
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms () {

// две формы на странице
const formWithModal = document.querySelector('[data-form]');
const formAction = document.querySelector('[data-action]');

// объект с сообщениями для отражения пользователю
const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Мы скоро вам перезвоним',
  failure: 'Что-то пошло не так...'
}


  // функция POST запроса на сервер и записи данных из формы в базу данных
  const postData =  async (url, data) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
      },
      body: data
      })

      return await res.json();
  }


// функция отправки формы, показа спиннера во время отправки, считывание данных с формы и вызов функции postData для записи в базу данных
function bindPostData (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;    
    `
    form.insertAdjacentElement('afterend', statusMessage)

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData))


    postData('http://localhost:3000/requests', json)
    .then( data  => {
      console.log(data),
      showThanksModal(message.success),
      statusMessage.remove()
    }).catch( () => {

      showThanksModal(message.failure) 
    }
      ).finally ( () => {
        form.reset()

      })


      
    })
  }

  // вызов функции считывающей данные с форм на странице
  bindPostData(formWithModal);
  bindPostData(formAction);

// // функция динамического создания модального окна с надписью о результате заполнения формы пользователем
// function showThanksModal(message) {
//   const prevModalDialog = document.querySelector('.modal__dialog');

//   prevModalDialog.classList.add('hide');
//   openModal();

//   const thanksModal = document.createElement('div');
//   thanksModal.classList.add('modal__dialog');
//   thanksModal.innerHTML = `
//       <div class="modal__content">
//           <div class="modal__close" data-close>×</div>
//           <div class="modal__title">${message}</div>
//       </div>
//   `;
//   document.querySelector('.modal').append(thanksModal);
//   setTimeout(() => {
//       thanksModal.remove();
//       prevModalDialog.classList.add('show');
//       prevModalDialog.classList.remove('hide');
//       closeModal();
//   }, 4000);
// }


function showThanksModal (message) {
  const prevModalDialog = document.querySelector('.modal__dialog');

  prevModalDialog.classList.add('hide');
  openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog')

  thanksModal.innerHTML = `
  <div class="modal__content blue">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">
  <img class="callback" src="./icons/callback2.png" >
  ${message}
  </div>
</div>
  `;

  document.querySelector('.modal').append(thanksModal)
  setTimeout(() => {
    modal.classList.add('hide')
    thanksModal.remove();
    closeModal();
    
  }, 3500)
  setTimeout(() => {
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
  }, 4100)
}
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
    const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');

let wasOpened = false;

function openModal() {
  modal.classList.add('show')
  modal.classList.remove('hide')
  modalContent.classList.add('animate-in')
  modalContent.classList.remove('animate-out')
    document.body.style.overflow = 'hidden';
    clearTimeout(timerModalId)
    wasOpened = true;
    
}

modalTrigger.forEach((btn) => {
  btn.addEventListener('click', openModal);
})


function closeModal() {
  modalContent.classList.add('animate-out')
  modalContent.classList.remove('animate-in')
  setTimeout(() => {
    modal.classList.remove('show');
    modal.classList.add('hide');
  },500)
  document.body.style.overflow = '';

}


modal.addEventListener('click', (e) => {
if(e.target === modal || e.target.getAttribute('data-close') == '') {
  closeModal();
}
})

document.addEventListener('keydown', (e) => {
  if(e.code === 'Escape') {
    closeModal();
  }
})

const timerModalId = setTimeout(openModal, 20000);



function showModalByScroll () {
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModal();
    removeScrollEvent()
  }
  else if(wasOpened === true) {
    removeScrollEvent()
  }
}

window.addEventListener('scroll', showModalByScroll)

function removeScrollEvent() {
  window.removeEventListener('scroll', showModalByScroll);
};

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {
    const slides = document.querySelectorAll('.offer__slide');
const slider = document.querySelector('.offer__slider')
const prevArrow = document.querySelector('.offer__slider-prev');
const nextArrow = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total');
const current = document.querySelector('#current');
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
const slidesField = document.querySelector('.offer__slider-inner');
//ширина блока wrapper со слайдером
const width = window.getComputedStyle(slidesWrapper).width;
//индекс слайда
let slideIndex = 1;
// отступ слайда влево/вправо при периключении
let offset = 0;

// slider 1



// проверка отоброжения блока с текущим слайдом и всеми доступными слайдами
if(slides.length < 10) {
  total.textContent = `0${slides.length}`
  current.textContent = `0${slideIndex}`
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

  

//устанавливаем ширину блока со слайдами - кол-во слайдов * на 100%
// чтоб все слайды помешались в блок со слайдами slidesField в одну строку в ширину
// он займет 400% ширины родителя - блока slidesWrapper
slidesField.style.width = 100 * slides.length + '%';
// уравниваем все слайды по одной ширине из строки выше
slides.forEach(slide => {
  slide.style.width = width;
})


//ПАГИНАЦИЯ
slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

// КОНЕЦ ПАГИНАЦИИ


// применяем flex для того чтоб слайды встали в ряд в своем блоке slidesField
slidesField.style.display = 'flex';
slidesField.style.transition = `0.5s all`;

// у нас есть блок со слайдами slidesField - его родитель блок обертка slidesWrapper
//ограничиваем показ элементов которые не помешаются в блок у slidesWrapper, чтоб спрятать остальные слайды 
slidesWrapper.style.overflow = 'hidden';

//обработчик события при клике на стрелочку вперед при котором слайд будет сдвигаться по значениею переменной offset
nextArrow.addEventListener('click', () => {
  // проверка для того если мы дошли до последнего слайда - перейти на первый
  // если наш отступ равен ширине одного слайда width умноженого на количество всех слайдов - 1;
  //width parse Int - превращаем width из '500px' в 500 (число).
  if(offset === parseInt(width) * (slides.length - 1)) {
    offset = 0;
    // если слайд не последний то к текущему слайду добавить ширина еще одного слайда и значене добавится в переменную offset и слайд сместится вперед
  } else {
    offset += parseInt(width);
  }

  
  slidesField.style.transform = `translateX(-${offset}px)`

  // переключение индикатора слайда при переключении самого слайда
  if(slideIndex === slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  if(slides.length < 10) {
    current.textContent = `0${slideIndex}`
  } else {
    current.textContent = slideIndex;
  }
  dots.forEach(dot => dot.style.opacity = ".5");
  dots[slideIndex-1].style.opacity = 1;
})

// функция устанавливает всем точкам пагинации opacity 0.5, а текущему opacity - 1
function dotsInitialStyle (arrLi) {
  arrLi.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex-1].style.opacity = 1;
}



prevArrow.addEventListener('click', () => {
  // проверка для того если мы дошли до первого слайда слайда - перейти на последний
  // если наш отступ равен ширине одного слайда width умноженого на количество всех слайдов - 1;
  //width.slice - превращаем width из '500px' в 500 (число).
  if(offset === 0) {
    offset = parseInt(width) * (slides.length - 1)
    // если слайд не первый то к текущему слайду добавить ширина еще одного слайда и значене добавится в переменную offset и слайд сместится назад
  } else {
    offset -= parseInt(width);
  }


  slidesField.style.transform = `translateX(-${offset}px)`;

  if(slideIndex === 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }

  if(slides.length < 10) {
    current.textContent = `0${slideIndex}`
  } else {
    current.textContent = slideIndex;
  }

  // функция устанавливает всем точкам пагинации opacity 0.5, а текущему opacity - 1
  dotsInitialStyle(dots);
})



// перемещение слайда при клике на сам слайд-картинку
slides.forEach(slide => {
slide.style.cursor = 'pointer';

  slide.addEventListener('click', () => {
    if(offset === parseInt(width) * (slides.length - 1)) {
      offset = 0;
      // если слайд не последний то к текущему слайду добавить ширина еще одного слайда и значене добавится в переменную offset и слайд сместится вперед
    } else {
      offset += parseInt(width);
    }
  
    slidesField.style.transform = `translateX(-${offset}px)`
  
    // переключение индикатора слайда при переключении самого слайда
    if(slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
  
    if(slides.length < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex;
    }
   
    dotsInitialStyle(dots);
  })


})

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
     

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
          current.textContent =  `0${slideIndex}`;
      } else {
          current.textContent =  slideIndex;
      }

      dotsInitialStyle(dots);
  });
});
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs () {

    const tab = document.querySelectorAll(".tabheader__item");
  const tabParent = document.querySelector(".tabheader__items");
  const tabContent = document.querySelectorAll(".tabcontent");


  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tab.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tab[i].classList.add("tabheader__item_active");
  }

  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tab.forEach((currTab, i) => {
        if (target === currTab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}


module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {

// таймер

const deadline = '2022-06-27';


function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  let days, hours, minutes, seconds;
  
  if(t <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    
  } else {
    
    days = Math.floor((t / (1000 * 60 * 60 * 24)));
    hours = Math.floor((t / (1000 * 60 * 60) % 24));
    minutes = Math.floor((t / (1000 * 60) % 60));
    seconds = Math.floor(( (t / 1000) % 60)); 

  }



  return {
    'total': t, 
    days,
    hours,
    minutes,
    seconds,
  }
}


function getZero (num) {
  if(num >= 0 && num < 10){
   return num = `0${num}`
  } else {
    return num;
  }
}


function setClock (selector, endtime) {
  const timer = document.querySelector(selector);
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');
  const timeInterval = setInterval(updateClock, 1000)

  
  
  updateClock()



  function updateClock () {

    const t = getTimeRemaining(endtime);

    
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if(t.total <= 0 ) {
      clearInterval(timeInterval);
    }
  }
}


setClock('.timer', deadline)

}


module.exports =timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
window.addEventListener("DOMContentLoaded", () => {
const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");


tabs();
modal();
timer();
calc();
cards();
slider();
forms();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map