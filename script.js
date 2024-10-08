const productsContainer = document.querySelector('#products');
const ordersContainer = document.querySelector('#orders');

fetch('data.json')
.then(res => res.json())
.then(data =>{ uploadProducts(data); generateId(data)});

//cambiar imagenes segun el dispositivo
//restaurar aparencia de boton
//padding y margenes en your cart
//color en amount of products
//restaurar your cart if the array is empty
//add more animations
//put the icons into a div


const icons ={
    addToCart:"./assets/images/icon-add-to-cart.svg",
    decrementQuantity: "./assets/images/icon-decrement-quantity.svg",
    incrementQuantity: "./assets/images/icon-increment-quantity.svg",
    orderConfirmed: "./assets/images/icon-order-confirmed.svg",
    removeItem: "./assets/images/icon-remove-item.svg",
    neutral: "./assets/images/icon-carbon-neutral.svg",
}

const productsInCart = [];

function generateId(data){
    data.forEach((item ,index)=>{
        item.id = index + 1;
        item.quantity = 0;
    })
}
    

function uploadProducts(products){

    products.forEach(product => {
        // console.log(product);
        const div = document.createElement('div');
        const addButton = document.createElement('div');
        const productInfo = document.createElement('div');
        
        div.classList.add('product-container');
        productInfo.classList.add('product-info');
        addButton.classList.add('product-img-button');

        const img = document.createElement('img');
        img.src = product.image.mobile;
        img.alt = product.name;

        buttonInitial(addButton, product,img);
        
        productInfo.innerHTML = 
        `<small>${product.category}</small>
        <h2>${product.name}</h2>
        <h3>${product.price.toFixed(2)}</h3>
        `;
        addButton.appendChild(img)
        div.append(addButton,productInfo);
        productsContainer.appendChild(div);
    });
}

//function to add and remove products 

function takeOffProducts(id){
    const product = findId(id);
    product.quantity -= 1; 
}


function addAmount(id){
    findId(id).quantity += 1;
}


function uploadingCart(products){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";
    // console.log(products);
    products.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const divText = document.createElement('div');
        divText.classList.add('product-price');
        const h4 = document.createElement('h3');
        h4.textContent = product.name;
        const pAmount = document.createElement('span');
        pAmount.textContent = `${product.quantity}x`;
        const iconRemove = document.createElement('img');
        iconRemove.src = icons.removeItem;
        iconRemove.addEventListener('click', e => {
            removeProduct(product.id);
        })
        const pPrice = document.createElement('span');
        pPrice.textContent = `@$${product.price.toFixed(2)}`;
        const ptotalAmount = document.createElement('span');
        ptotalAmount.textContent = `$${sumAmount(product)}`;
        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(divText,iconRemove)
        ordersContainer.appendChild(div);
        
    })

    if (products.length >= 0) {
        const h2 = document.querySelector('h2.order-amount');
        h2.textContent = `Your cart (${productsInCart.length})`;
        
        console.log(products.length)
    }
    if(products.length > 0){
        orderTotal(products, ordersContainer);
        uploadingDelivery();
    }
    
}

function orderTotal(products,container){
    let total = parseFloat(0);
    
    products.forEach( product =>{
        total += parseFloat(sumAmount(product));
    })

    const div = document.createElement('div');
    div.classList.add('order-total')
    const p = document.createElement('p');
    p.textContent = "Order Total";
    const h4 = document.createElement('h4');
    h4.textContent = `$${total.toFixed(2)}`
    div.append(p,h4)
    container.appendChild(div)
    
}
function uploadingDelivery(){
    const div = document.createElement('div');
    div.classList.add('delivery-container');

    const divDelivery = document.createElement('div');
    divDelivery.classList.add('delivery');
    const pDelivery = document.createElement('p');
    pDelivery.textContent = "This is a carbon-neutral delivery";
    const imgDelivery = document.createElement('img');
    imgDelivery.src = icons.neutral;

    const button = document.createElement('button');
    button.addEventListener('click', e => showMessage())
    button.textContent = "Confirm Order";

    divDelivery.append(imgDelivery,pDelivery);
    div.append(divDelivery,button);
    ordersContainer.appendChild(div);
}
function findId(id){
    const existingProduct = productsInCart.find(p => p.id === id);
    return existingProduct
}



function removeProduct(id){
    const index = productsInCart.findIndex( p => p.id === id)
    productsInCart.splice(index, 1);
    // targetProduct(findId(id), findId(id).image.desktop)
    uploadingCart(productsInCart);
}

function showMessage(){
    const confirmedProducts = document.querySelector('footer');
    document.body.classList.add("order-confirmed-show");
    const newOrderButton = document.querySelector('#new-order');
    newOrderButton.addEventListener('click', e=>{
        document.body.classList.remove("order-confirmed-show");
    })
    confirmedProducts.innerHTML = "";
    productsInCart.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('product-in-car');
        const divText = document.createElement('div');
        const img = document.createElement('img');
        img.src = product.image.desktop;
        divText.classList.add('product-price');
        const h4 = document.createElement('h3');
        h4.textContent = product.name;
        const pAmount = document.createElement('p');
        pAmount.textContent = `${product.quantity}x`;
        const pPrice = document.createElement('p');
        pPrice.textContent = `$${product.price.toFixed(2)}`;
        const ptotalAmount = document.createElement('p');
        ptotalAmount.textContent = `$${sumAmount(product)}`;

        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(img,divText)
        confirmedProducts.appendChild(div);
        
    })

    orderTotal(productsInCart,confirmedProducts);
}

function addToArray(product){
    if (!findId(product.id)) {
        productsInCart.push(product);
        product.quantity = 1;
    }else if(product.quantity < 1){
        removeProduct(product.id)
    }
    if (productsInCart.length === 0) {
        restore()
    }else{
        uploadingCart(productsInCart)
    }
    // console.log(productsInCart)
}

function sumAmount(product){
    const amount = parseFloat(product.quantity);
    const price = parseFloat(product.price);
    return (amount*price).toFixed(2)
    
}

function buttonInitial(container, product, img){
    const button = document.createElement('button');
    button.innerHTML = "";
    button.classList.add('add-to-cart')
    button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart-icon" />
    <p> Add to cart</p>`
    button.addEventListener('click',e =>{
        addToArray(product);
        buttonAmount(button,product.id,img)
        targetProduct(product.id,img)
        // console.log(e.target);
    });
    container.append(button);
}



function targetProduct(id,img){
    if (!findId(id) || findId(id).quantity < 1) {
        img.style.border = 'none';
    } else {
        img.style.border = '3px solid red';
        
    }
}

function restore(){
    const orderSection =  document.querySelector('.order-section');
    orderSection.style.background = "url('./assets/images/illustration-empty-cart.svg') no-repeat center";
    ordersContainer.innerHTML = `
    <p class="default-text" >Your added items will apper here</p>`
}

function buttonAmount(button,id,img){
    button.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('buttonIcons')
    let amount;
    amount = !findId(id) ? 0 : findId(id).quantity; 
    if (amount === 0 || !findId(id)) {
        button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart-icon" />
    <p> Add to cart</p>`;
    } else {
        div.innerHTML = `
    <button type='button' class="take-off-product">
        <img src="./assets/images/icon-decrement-quantity.svg"/>
    </button>
    <p>${amount}</p>
    <button type='button' class="add-product">
        <img src="./assets/images/icon-increment-quantity.svg"/>
    </button>`
    
    button.appendChild(div);
    addEvents(div,id,img);
    }
    
}

function addEvents(button,id,img){
    const takeOff = button.querySelector('.take-off-product');
    const add = button.querySelector('.add-product');

    takeOff.addEventListener('click', e =>{
        takeOffProducts(id);
        targetProduct(id,img);
    });
    add.addEventListener('click', e =>{
        addAmount(id)
    });
}