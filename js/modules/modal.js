let wasOpened = false;

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const modalContent = document.querySelector(".modal__content");

  modal.classList.add("show");
  modal.classList.remove("hide");
  modalContent.classList.add("animate-in");
  modalContent.classList.remove("animate-out");
  document.body.style.overflow = "hidden";

  if(modalTimerId) {
    clearTimeout(modalTimerId);
  }
  wasOpened = true;
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  const modalContent = document.querySelector(".modal__content");

  modalContent.classList.add("animate-out");
  modalContent.classList.remove("animate-in");
  setTimeout(() => {
    modal.classList.remove("show");
    modal.classList.add("hide");
  }, 500);
  document.body.style.overflow = "";
}



function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);



  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(modalSelector);
    }
  });



  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      removeScrollEvent();
    } else if (wasOpened === true) {
      removeScrollEvent();
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  function removeScrollEvent() {
    window.removeEventListener("scroll", showModalByScroll);
  }
}



export default modal;
export { openModal };
export { closeModal };
