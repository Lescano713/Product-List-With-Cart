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
// console.log(productsInCart)
// uploadingCart();
// menos()
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
    const product = findId(id);
    if (product.pQuantity <= 1){
        removeProduct(id)
        console.log(findId(id))
    } else{
        // console.log("si")
        product.pQuantity -= 1;  
        // uploadingCart();
    }
    uploadingCart(); 
}


function getObjects(name, cost,id){
    if(!findId(id)){
        const product ={
            pName: name,
            pCost: cost,
            pId: id,
            pQuantity: 0,
        }
        productsInCart.push(product);
        // uploadingCart()
        
    }
}

function addAmount(id, p){
    findId(id).pQuantity += 1;
    p.textContent = findId(id).pQuantity;
    uploadingCart();
}


function uploadingCart(){
    ordersContainer.innerHTML = "";
    document.querySelector('section.order-section').style.background = "none";

    productsInCart.forEach(product =>{
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
        iconRemove.addEventListener('click', e => {
            removeProduct(product.pId);
        })
        const pPrice = document.createElement('p');
        pPrice.textContent = product.pCost;
        const ptotalAmount = document.createElement('p');

        divText.append(h4,pAmount,pPrice,ptotalAmount);
        div.append(divText,iconRemove)
        ordersContainer.appendChild(div);
        
    })
    console.log(productsInCart)
    if (productsInCart.length > 0 ) {
        orderTotal(1)
    }
    
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
    button.innerHTML = "";
    button.classList.add('buttonAdd');
    let amount = 1;
    
    const iconPlus = document.createElement('img');
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;

    const p = document.createElement('p');
    const product = findId(id);
    p.textContent = 1;

    // if (!product) {
    //     getObjects(name, cost, id);
    // }
    // uploadingCart();
    iconPlus.addEventListener('click', () =>{
        getObjects(name,cost,id);
        addAmount(id,p)
    });

    iconMinus.addEventListener('click', e =>{
        takeOffProducts(id, p);
    });

    button.append(iconMinus,p,iconPlus);
    
}

function suma(cost){
    const numero = parseFloat(cost);
}

function removeProduct(id){
    const index = productsInCart.findIndex( p => p.pId === id)
    // if (index !== -1) {
        productsInCart.splice(index, 1);
        uploadingCart();
        // takeOffProducts(id)
        // orderTotal(2)
    // } else {
    //     console.log("no")
    //     document.querySelector('section.order-section').style.background = "flex";

    // }
}

function showMessage(){
    const sectionMessage = document.querySelector('.order-confirmed-section');

    sectionMessage.style.display = "block"
    console.log("non")
}

function removeTarget(id){
    const target = findId(id);
    const img = target.querySelector('img');
    img.style.border = '3px solid red';
}

function menos(){
    // productsInCart.forEach(product =>{
    //     const nose = product.pQuantity < 0;
    //     if (nose) {
    //         const newArray = productsInCart.filter(item => item !== nose);
            
    //         uploadingCart(newArray);
    //     }
    // })
    
    const newArray = productsInCart.filter(item => item !== item.pQuantity < 0);
            
            uploadingCart(newArray);
}