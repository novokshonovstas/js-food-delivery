import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import calc from "./modules/calc";
import cards from "./modules/cards";
import slider from "./modules/slider";
import forms from "./modules/forms";
import {openModal} from "./modules/modal"

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 20000);

  tabs(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-06-27');
  calc();
  cards();
  forms();
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',

});
});
