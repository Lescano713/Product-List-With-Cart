const productsContainer = document.querySelector('#products');
const ordersContainer = document.querySelector('#orders');

fetch('data.json')
.then(res => res.json())
.then(data =>{ uploadProducts(data); generateId(data)});



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

function generateId(data){
    data.forEach((item ,index)=>{
        item.id = index + 1;
    })
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
            buttonAddRemove(button,product.name,product.price,product.id, product.pQuantity)
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

function takeOffProducts(name){
    // const product = document.querySelector('#'+ id);
    const index = productsInCart.findIndex(product => product.name === name);
    if (index !== -1) {
        // Eliminar el elemento en el índice encontrado
        productos.splice(index, 1);
    }
}

function addElements(id){

}



function getObjects(name, cost,id){
    const existingProducts = productsInCart.find(products => products.pid === id);
    if(existingProducts){
        existingProducts.pQuantity = (existingProducts.pQuantity || 1) + 1;
    }else{
        const product ={
            pName: name,
            pCost: cost,
            pId: id,
            pQuantity: 1,
        }
        productsInCart.push(product);
    }
    
    uploadingCart(productsInCart);
    orderTotal(products.pCost);
    console.log(productsInCart);
}

function uploadingCart(array){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";

    const uniqueProducts = array.reduce((acc, product) => {
        if (!acc[product.pId]) {
            acc[product.pId] = product;
        } else {
            acc[product.pId].pQuantity += product.pQuantity;
        }
        return acc;
    }, {});


    Object.values(uniqueProducts).forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const divText = document.createElement('div');
        divText.classList.add('product-price');
        const h4 = document.createElement('h3');
        h4.textContent = product.pName;
        const pAmount = document.createElement('p');
        const iconRemove = document.createElement('img');
        iconRemove.src = icons.removeItem;
        const pPrice = document.createElement('p');
        pPrice.textContent = product.pCost;
        const ptotalAmount = document.createElement('p');

        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(divText,iconRemove)
        ordersContainer.appendChild(div);
        
    })
}

function orderTotal(totalAmount){
    totalAmount = 1;
    const div = document.createElement('div');
    div.classList.add('order-total');

    const divDelivery = document.createElement('div');
    divDelivery.classList.add('delivery-container');
    const pDelivery = document.createElement('p');
    pDelivery.textContent = "This is a carbon-neutral delivery";
    const imgDelivery = document.createElement('img');
    imgDelivery.src = icons.neutral;

    const p = document.createElement('p');
    p.textContent = "Order Total";
    const h4 = document.createElement('h4');
    h4.textContent = `$${totalAmount}`
    const button = document.createElement('button');
    button.textContent = "Confirm Order";

    divDelivery.append(imgDelivery,pDelivery);
    div.append(p,h4,divDelivery,button);
    ordersContainer.appendChild(div);
}

function buttonAddRemove(button,name,cost,id,quantity){
    button.innerHTML = "";
    button.classList.add('buttonAdd');
    // console.log(e.target)
    
    const iconPlus = document.createElement('img');
    iconPlus.addEventListener('click', e => getObjects(name,cost,id));

    iconPlus.src = icons.incrementQuantity;

    const iconMinus = document.createElement('img');
    iconMinus.addEventListener('click', takeOffProducts(name,cost));
    iconMinus.src = icons.decrementQuantity;
    // button.innerHTML = `${iconMinus} ${amount} ${iconPlus}`;
    button.appendChild(iconMinus);
    button.innerHTML += quantity;
    button.appendChild(iconPlus);
}

function suma(cost){
    const numero = parseFloat(cost);
}
