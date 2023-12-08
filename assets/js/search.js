
window.onload = () => {

    let topSelect = document.getElementById("top-select-menu");
    let categorySelect = document.getElementById("category-select");
    let productsContainer = document.getElementById("products-list");

    topSelect.onchange = () => {

        // 'search by category' is made invisible and all products removed
        productsContainer.innerHTML = ""
        categorySelect.innerHTML = "";
        categorySelect.classList.add("invisible");

        if(topSelect.selectedIndex === 1){
            return getCategorySelect();
        } else if(topSelect.selectedIndex === 2){
            return getAllProducts();
        } else {
            return;
        }
    }

    categorySelect.onchange = () => {
        productsContainer.innerHTML = ""
        getAllProducts();
    }

}


let getAllProducts = () => {

    fetch("http://localhost:8081/api/products")
        .then((res)=>res.json())
        .then((productList)=>{

            displayProducts(productList);
        });
}

let getCategorySelect = () => {

    fetch("http://localhost:8081/api/categories")
        .then((res)=>res.json())
        .then((categoryList)=>{

            // grabs category dropdown and makes it visible
            let categorySelect = document.getElementById("category-select");
            categorySelect.classList.remove("invisible");

            for(let category of categoryList){

                let categoryOption = new Option(category.name, category.categoryId);
                categorySelect.appendChild(categoryOption);
            }
        });
}


let displayProducts = (products) => {

    let productsContainer = document.getElementById("products-list");
    let categorySelect = document.getElementById("category-select");
    
    for(let product of products){

        let productCard = document.createElement("div");
        productCard.classList.add("card");
        let price = Number(product.unitPrice).toFixed(2);

        // product will display on specific category and view all respectively
        if(categorySelect.value !== "" && product.categoryId == categorySelect.value || categorySelect.value == "" && product.categoryId !== categorySelect.value){
            productCard.innerHTML = `
            <div class="item">${product.productName}</div>
            <div class="details">$${price}</div>
            <a href="details.html?productId=${product.productId}">See Details</a>
            `;
            productsContainer.appendChild(productCard);
        }
    }
}