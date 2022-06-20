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