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

// uploadingCart();

function generateId(div){
    document.querySelectorAll('')
}
    

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
            buttonAddRemove(button,product.name,product.price)
            img.style.border = '3px solid red';});

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

function takeOffProducts(name,cost){
    // const product = document.querySelector('#'+ id);
    productsInCart.find
}

function addElements(id){

}



function getObjects(name, cost){
    const product ={
        pName: name,
        pCost: cost,
    }
    productsInCart.push(product);
    uploadingCart();
    orderTotal(product.pCost);
    console.log(productsInCart);
}

function uploadingCart(){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";
    productsInCart.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const h4 = document.createElement('h3');
        h4.textContent = product.pName;
        const pAmount = document.createElement('p');
        const iconRemove = document.createElement('img');
        iconRemove.src = icons.removeItem;
        const pPrice = document.createElement('p');
        pPrice.textContent = product.pCost;
        const ptotalAmount = document.createElement('p');

        div.append(h4,pAmount,pPrice,ptotalAmount,iconRemove);
        ordersContainer.appendChild(div);
        
    })
}

function orderTotal(totalAmount){
    totalAmount = 1;
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = "Order Total";
    const h4 = document.createElement('h4');
    h4.textContent = totalAmount
    const button = document.createElement('button');
    button.textContent = "Confirm Order";
    div.append(p,h4,button);
    ordersContainer.appendChild(div);
}

function buttonAddRemove(button,name,cost){
    button.innerHTML = "";
    button.classList.add('buttonAdd');
    // console.log(e.target)
    let amount = 1;
    
    const iconPlus = document.createElement('img');
    iconPlus.addEventListener('click', e => getObjects(name,cost),  console.log(amount+1));

    iconPlus.src = icons.incrementQuantity;

    const iconMinus = document.createElement('img');
    iconMinus.addEventListener('click', takeOffProducts(name,cost));
    iconMinus.src = icons.decrementQuantity;
    // button.innerHTML = `${iconMinus} ${amount} ${iconPlus}`;
    button.appendChild(iconMinus);
    button.innerHTML += amount;
    button.appendChild(iconPlus);
}

function suma(cost){
    const numero = parseFloat(cost);
}
