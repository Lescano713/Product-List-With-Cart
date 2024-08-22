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
            addToArray(product);
            buttonAddRemove(button, product.id)
            
            img.style.border = '3px solid red';});

        const small = document.createElement('small');
        small.textContent = product.category;

        const h2 = document.createElement('h2');
        h2.textContent = product.name ;

        const h3 = document.createElement('h3');
        h3.textContent = `$${product.price.toFixed(2)}`;

        div.append(img,button,small,h2,h3);
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
    // console.log(products)
    if (products.length > 0 ) {
        orderTotal(products)
    }
    
}

function orderTotal(products){
    let total = parseFloat(0);
    
    products.forEach( product =>{
        total += parseFloat(sumAmount(product));
    })
    
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
    h4.textContent = `$${total.toFixed(2)}`
    const button = document.createElement('button');
    button.addEventListener('click', e => showMessage())
    button.textContent = "Confirm Order";

    divDelivery.append(imgDelivery,pDelivery);
    div.append(p,h4,divDelivery,button);
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
    
    const iconPlus = document.createElement('img');
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;

    const p = document.createElement('p');
    p.textContent = amount || 1;


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
        pAmount.textContent = product.quantity;
        const pPrice = document.createElement('p');
        pPrice.textContent = product.cost;
        const ptotalAmount = document.createElement('p');

        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(img,divText)
        confirmedProducts.appendChild(div);
        
    })

    console.log("non")
}

function addToArray(product){
    if (!findId(product.id)) {
        productsInCart.push(product);
        product.quantity = 1;
    }else if(product.quantity === 0){
        removeProduct(product.id)
    }

    uploadingCart(productsInCart)
    console.log(productsInCart)
}

function sumAmount(product){
    const amount = parseFloat(product.quantity);
    const price = parseFloat(product.price);
    return (amount*price).toFixed(2)
    
}