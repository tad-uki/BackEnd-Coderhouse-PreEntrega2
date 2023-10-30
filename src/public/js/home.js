const socketClient = io()

const productsDisplay = document.getElementById("productsDisplay")

socketClient.on("productList", (productData)=>{
    let productTags = []
    productData.forEach(product => {
        productTags += `<p> Nombre: ${product.title} </p>`
    });
    productsDisplay.innerHTML = productTags
})