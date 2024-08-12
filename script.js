const productsContainer = document.querySelector('#products');

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


    

// consoles()
function uploadProducts(products){
    products.forEach(product => {
        const div = document.createElement('div');

        const img = document.createElement('img');
        img.src = product.image.mobile;
        img.alt = product.name;

        const button = document.createElement('button');
        const icon = document.createElement('img');
        icon.src = icons.addToCart;
        button.appendChild(icon);
        button.innerHTML += " Add to cart";
        button.addEventListener('click',e =>{
            
            consoles(e,button)})

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



function consoles(e, button){
    // console.log(e.target)
    let a = 1;
    button.innerHTML = "";
    button.classList.add('buttonAdd');
    const iconPlus = document.createElement('img');
    iconPlus.addEventListener('click', e => a++)
    iconPlus.src = icons.incrementQuantity;
    const iconMinus = document.createElement('img');
    iconMinus.src = icons.decrementQuantity;
    button.appendChild(iconMinus);
    button.innerHTML += a;
    button.appendChild(iconPlus);
}

// function add(e,a){
//     a++
//     return a
// }

// function createIcons(icon){
//     const img = document.createElement('img');
//     img.src = icon;
// }
