// show details of item by query string url search id

    // categoryId: 1
    // discontinued: "false"
    // productId: "1"
    // productName: "Chai"
    // supplier: "Exotic Liquids"
    // unitPrice: "18.0000"
    // unitsInStock: "39"

window.onload = () => {
    let queryValues = location.search.split("=");
    let productId = queryValues[1];

    fetch(`http://localhost:8081/api/products/${productId}`)
        .then((res)=>res.json())
        .then((product)=>{

            let detailsContainer = document.getElementById("product-details");
            console.log(product)

            let price = Number(product.unitPrice).toFixed(2);

            console.log(product.discontinued)

            detailsContainer.innerHTML = `
            <h3>${product.productName}</h3>
            <hr />
            <p>$${price}</p>
            <p>Supplier: ${product.supplier}</p>
            <p>Units in Stock: ${product.unitsInStock}</p>
            <p>Discontinued: ${product.discontinued}</p>
            
            `;
        });
}