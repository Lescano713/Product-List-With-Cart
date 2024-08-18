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
            buttonAddRemove(button,product.name,product.price,product.id)
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

function takeOffProducts(id){
    findId(id).pQuantity -= 1;
    uploadingCart(productsInCart);
    orderTotal(2)
}


function getObjects(name, cost,id){
    // let mas = 1;
    const product ={
        pName: name,
        pCost: cost,
        pId: id,
        pQuantity: 1,
    }
    
    if (!findId(id)) {
        productsInCart.push(product);
    } else {
        findId(id).pQuantity += 1;
    }
    
    uploadingCart(productsInCart);
    orderTotal(2)
    // orderTotal(product.pQuantity)
    console.log(productsInCart);
}

function uploadingCart(array){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";

    array.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const divText = document.createElement('div');
        divText.classList.add('product-price');
        const h4 = document.createElement('h3');
        h4.textContent = product.pName;
        const pAmount = document.createElement('p');
        pAmount.textContent = product.pQuantity;
        const iconRemove = document.createElement('img');
        iconRemove.src = icons.removeItem;
        iconRemove.addEventListener('click', e => removeProduct(product.pId))
        const pPrice = document.createElement('p');
        pPrice.textContent = product.pCost;
        const ptotalAmount = document.createElement('p');

        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(divText,iconRemove)
        ordersContainer.appendChild(div);
        
    })
}

function orderTotal(totalAmount){
    // totalAmount = 1;
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
    button.addEventListener('click', e => showMessage())
    button.textContent = "Confirm Order";

    divDelivery.append(imgDelivery,pDelivery);
    div.append(p,h4,divDelivery,button);
    ordersContainer.appendChild(div);
}

function findId(id){
    const existingProduct = productsInCart.find(p => p.pId === id);
    return existingProduct
}

function buttonAddRemove(button,name,cost,id){
    // orderTotal(2)
    button.innerHTML = "";
    let amount = 0;

    if(findId(id)){
        amount = findId(id).pQuantity;
    }
    button.classList.add('buttonAdd');
    const iconPlus = document.createElement('img');
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;

    const p = document.createElement('p');
    p.textContent = amount;

    iconPlus.addEventListener('click', () =>{
        getObjects(name,cost,id);
        p.textContent = findId(id).pQuantity;
    });

    iconMinus.addEventListener('click', e =>{
        takeOffProducts(id);
        p.textContent = findId(id).pQuantity;
    });

    button.append(iconMinus,p,iconPlus);
    
}

function suma(cost){
    const numero = parseFloat(cost);
}

function removeProduct(id){
    if (findId(id) && !productsInCart.length < 1) {
        productsInCart.splice(findId(id), 1);
        uploadingCart(productsInCart);
        // takeOffProducts(id)
        orderTotal(2)
    } else {
        console.log("no")
        document.querySelector('section.order-section').style.background = "flex";

    }
}

function showMessage(){
    const sectionMessage = document.querySelector('.order-confirmed-section');

    sectionMessage.style.display = "block"
    console.log("non")
}