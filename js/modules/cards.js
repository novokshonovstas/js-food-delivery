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