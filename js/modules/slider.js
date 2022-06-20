function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container)
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
//ширина блока wrapper со слайдером
const width = window.getComputedStyle(slidesWrapper).width;
//индекс слайда
let slideIndex = 1;
// отступ слайда влево/вправо при периключении
let offset = 0;


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
next.addEventListener('click', () => {
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



prev.addEventListener('click', () => {
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

export default slider;