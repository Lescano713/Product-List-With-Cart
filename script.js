const productsContainer = document.querySelector('#products');

fetch('data.json')
.then(res => res.json())
.then(data => uploadProducts(data));

function uploadProducts(products){
    products.forEach(product => {
        const div = document.createElement('div');

        const img = document.createElement('img');
        img.src = product.image.mobile;
        img.alt = product.name;

        const button = document.createElement('button');
        button.textContent = "add to cart"

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