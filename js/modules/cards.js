import {getResource} from '../services/services'

function cards () {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.parent = document.querySelector(parentSelector);
          this.price = price;
          this.classes = classes;
          this.transfer = 40;
          this.transferToUAH();
        }
      
      
        transferToUAH () {
           this.price = Math.round(this.price * this.transfer);
        
        }
      
      
        render () {
          const div = document.createElement('div');
      
          if(!this.classes.length) {
           this.defaultClass = 'menu__item';
            div.classList.add(this.defaultClass);
      
          } else {
            this.classes.forEach(className => div.classList.add(className));
          }
      
          div.innerHTML = `
          <img id="img" src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
          <div class="menu__item-common">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
          <div class="menu__item-cart">
          <img style="width: 30px" src="./img/cart/cart2.png" alt="cart">
          </div>
          
                          `;
            this.parent.append(div);
        }
      }
      
  
      getResource('http://localhost:3000/menu')
        .then(data => {
          data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          });
        });
}

export default cards;