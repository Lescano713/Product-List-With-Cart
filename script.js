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
    // 
    
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

function takeOffProducts(id){
    const product = findId(id);
    product.quantity -= 1; 
    uploadingCart(productsInCart); 
    
}


function addAmount(id, p){
    findId(id).quantity += 1;
    p.textContent = findId(id).quantity;
}


function uploadingCart(products){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";
    // console.log(products);
    products.forEach(product =>{
        if(!product.quantity < 1){
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
        pPrice.textContent = `$${product.price.toFixed(2)}`;
        const ptotalAmount = document.createElement('span');
        ptotalAmount.textContent = `$${sumAmount(product)}`;
        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(divText,iconRemove)
        ordersContainer.appendChild(div);}
        
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

function buttonAddRemove(button,id){
    button.innerHTML = "";
    button.classList.add('buttonAdd');
    let amount;
    // amount = findId(id).quantity || 0;
    amount = !findId(id) ? 0 : findId(id).quantity; 
    
    const iconPlus = document.createElement('img');
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;

    const p = document.createElement('p');
    p.textContent = amount;


    iconPlus.addEventListener('click', () =>{
        addAmount(id,p)
    });

    iconMinus.addEventListener('click', e =>{
        takeOffProducts(id, p);
    });

    button.append(iconMinus,p,iconPlus);
    
}

function removeProduct(id){
    const index = productsInCart.findIndex( p => p.id === id)
    productsInCart.splice(index, 1);
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
    }else if(product.quantity === 0){
        removeProduct(product.id)
    }

    uploadingCart(productsInCart)
    // console.log(productsInCart)
}

function sumAmount(product){
    const amount = parseFloat(product.quantity);
    const price = parseFloat(product.price);
    return (amount*price).toFixed(2)
    
}

function buttonInitial(container, product, img){
    const button = document.createElement('button');
    button.classList.remove('buttonAdd')
    const icon = document.createElement('img');
    icon.src = icons.addToCart;
    button.appendChild(icon);
    button.innerHTML += " Add to cart";
    button.addEventListener('click',e =>{
        addToArray(product);
        buttonAddRemove(button, product.id);
        targetProduct(product,img)
    });
    container.append(button);
}

function showButton(id){
    if(!findId(id) || findId(id).quantity < 1 ){
        // buttonInitial
    }
}

function targetProduct(product,img){
    if (!findId(product.id)) {
        img.style.border = 'none';
    } else {
        img.style.border = '3px solid red';
        
    }
}