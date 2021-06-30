'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/* Переведено на промисы
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status !== 200){
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
}; */

class ProductList {
  #goods;
  #allProducts;
  constructor(container = '.products') {
    this.container = container;
    this.#goods = []; // то, что прилетело с API
    this.#allProducts = []; // то, что готово для отрисовки

    this.#getProducts()
        .then((data) => {
          this.#goods = data;
          this.#render();
        });

    document.querySelector(this.container).addEventListener('click', (event) => {
      if (event.target.className === 'buy-btn') {
        
        const itemId = event.target.parentElement.dataset.id;
        const item = this.#goods.find((goodsItem) => goodsItem.id_product === parseInt(itemId));
        if (typeof item !== 'undefined') {
          basket.addItem(item);
        } else {
          console.error(`не находится элемент с id ${itemId}`)
        }
      }
    });
  }

  sum() {
    return this.#allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item">
              <img src="${this.img}" alt="Some img">
              <div class="desc" data-id="${this.id}">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

class Basket {
  constructor() {
    this.goods = [];

    this.getBasket()
      .then((data) => {
        this.goods = data;
        console.log('содержимое корзины', data); // выводятся данные для корзины
      });
  }

  getBasket() {
    return fetch(`${API}/getBasket.json`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
  }

  addItem(item) {
    return fetch(`${API}/addToBasket.json`)
        .then((response) => response.json())
        .then((response) => {

          if (response.result !== 0) {
            const itemIndex = this.goods.contents.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
            if (itemIndex > -1) {
                this.goods.contents[itemIndex].quantity += 1;
                this.goods.amount += this.goods.contents[itemIndex].price;
                this.goods.countGoods += 1;
            } else {
                this.goods.contents.push({ ...item, quantity: 1});
                this.goods.amount += this.goods.contents[itemIndex].price;
                this.goods.countGoods += 1;
            }
            console.log(this.goods);
          } else {
            console.error(`какая-то неведомая ошибка`, item, this.goods);
          }
          
        })
        .catch((err) => console.log(err));
  }

  removeItem(id) {
    return fetch(`${API}/deleteFromBasket.json`)
        .then((response) => response.json())
        .then((response) => {
          if (response.result !== 0) {
            this.goods.contents = this.goods.contents.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
            console.log(this.goods);
          } else {
              console.error(`какая-то неведомая ошибка`);
          }
        })
        .catch((err) => console.log(err));
  }
}

const catalog = new ProductList();
const basket = new Basket();
