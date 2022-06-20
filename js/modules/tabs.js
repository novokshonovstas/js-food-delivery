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