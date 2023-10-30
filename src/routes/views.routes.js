import { Router } from "express";
import { ProductManager } from "../persistence/classes/ProductManager.js";
import { CartManager } from "../persistence/classes/CartManager.js";

const router = Router()

const productsService = new ProductManager()
const cartsService =  new CartManager()

router.get("/", async(req, res)=>{
    const {limit = 10, page = 1, sort, category} = req.query
        console.log(req.query)

        const query = {}

        const options = {
            limit,
            page,
            sort,
            lean: true
        }

        if(sort){
            options.sort = sort === "asc" ? {price: 1} : sort === "desc" ? {price: -1} : null
        }

        if(category){
            query.category = category
        }

        const productList = await productsService.getPaginatedProducts(query, options)
    res.render("home", {products: productList.docs})
    
})

router.get("/api/carts/:cid", async (req, res)=>{
    try {
        const idParam = req.params.cid
        const paramCart = await cartsService.getCartById(idParam)
        const cartData = paramCart.products
        const productList = []

        cartData.forEach(obj =>{
            let newProduct = {
                title: obj.productId.title,
                price: obj.productId.price,
            }
            productList.push(newProduct)
        })

        if(paramCart){
            res.render("cartId", {products: productList})
        }
        else{
            res.send(new Error("Cart doesn't exist."))
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts")
})


export {router as viewsRouter}