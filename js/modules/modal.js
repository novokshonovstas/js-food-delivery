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