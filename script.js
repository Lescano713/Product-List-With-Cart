const productsContainer = document.querySelector('#products');
const ordersContainer = document.querySelector('#orders');

fetch('data.json')
.then(res => res.json())
.then(data => uploadProducts(data));


const icons ={
    addToCart:"./assets/images/icon-add-to-cart.svg",
    decrementQuantity: "./assets/images/icon-decrement-quantity.svg",
    incrementQuantity: "./assets/images/icon-increment-quantity.svg",
    orderConfirmed: "./assets/images/icon-order-confirmed.svg",
    removeItem: "./assets/images/icon-remove-item.svg",
    neutral: "./assets/images/icon-carbon-neutral.svg",
}

const productsInCart = [];

uploadingCart();
function generateId(div){
    document.querySelectorAll('')
}
    

// consoles()
function uploadProducts(products){
    // console.log(products);
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-container');

        const img = document.createElement('img');
        img.src = product.image.mobile;
        img.alt = product.name;

        const button = document.createElement('button');
        const icon = document.createElement('img');
        icon.src = icons.addToCart;
        button.appendChild(icon);
        button.innerHTML += " Add to cart";
        button.addEventListener('click',e =>{
            buttonAddRemove(button,icon,product.name,product.price)});

        const small = document.createElement('small');
        small.textContent = product.category;

        const h2 = document.createElement('h2');
        h2.textContent = product.name ;

        const h3 = document.createElement('h3');
        h3.textContent = `$${product.price}`;

        div.append(img,button,small,h2,h3);
        productsContainer.appendChild(div);
    });
}

function takeOffProducts(id){
    const product = document.querySelector('#'+ id);

}

function addElements(id){

}

function uploadingCart(){
    // ordersContainer.innerHTML = "";
    productsInCart.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const h2 = document.createElement('h2');
        h2.textContent = product.name;
        const pAmount = document.createElement('p');
        const iconRemove = document.createElement('img');
        iconRemove.src = icons.removeItem;
        const pPrice = document.createElement('p');
        pPrice.textContent = document.price;
        const ptotalAmount = document.createElement('p');

        div.append(h2,pAmount,pPrice,ptotalAmount,iconRemove);
        ordersContainer.appendChild(div);
        
    })
}

function getObjects(name, cost){
    const product ={
        pName: name,
        pCost: cost,
    }
    productsInCart.push(product);
    console.log(productsInCart);
}

function buttonAddRemove(button,img,name,cost){
    // const productContainer = document.querySelectorAll('div.product-container');

    // const buttons = productContainer.querySelectorAll('buttons');

    // buttons.forEach(button=>{
        button.innerHTML = "";
        button.classList.add('buttonAdd');
    // })
    // console.log(e.target)
    let amount = 1;
    
    const iconPlus = document.createElement('img');
    iconPlus.addEventListener('click', e => getObjects(name,cost),  console.log(amount+1));
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;
    // button.innerHTML = `${iconMinus} ${amount} ${iconPlus}`;
    button.appendChild(iconMinus);
    button.innerHTML += amount;
    button.appendChild(iconPlus);
    img.style.border = '3px solid red';
}
// function focusDiv(element){

// }
// function add(e,a){
//     a++
//     return a
// }

// function createIcons(icon){
//     const img = document.createElement('img');
//     img.src = icon;
// }
