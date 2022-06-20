function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tab = document.querySelectorAll(tabsSelector);
  const tabParent = document.querySelector(tabsContentSelector);
  const tabContent = document.querySelectorAll(tabsParentSelector,);


  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tab.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tab[i].classList.add(activeClass);
  }

  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tab.forEach((currTab, i) => {
        if (target === currTab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}


export default tabs;