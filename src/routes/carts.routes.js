import { Router } from "express";
import { CartManager } from "../components/CartManager.js";
import { _dirname } from "../utils.js";
import path from "path";

const router = Router()

const cartsService = new CartManager(path.join(_dirname, "/files/carts.json"))

const carts = await cartsService.getCarts()



router.get("/", async (req, res)=>{
    try {
        res.send(carts)
    } catch (error) {
        res.send(error)
    }
})

router.get("/:cid", async (req, res)=>{
    try {
        const idParam = parseInt(req.params.cid)
        const paramCart = await cartsService.getCartById(idParam)
        if(paramCart){
            res.send(paramCart)
        }
        else{
            res.send(new Error("Cart doesn't exist."))
        }
    } catch (error) {
        res.send(error)
    }
})

router.post("/", async (req, res) =>{
    try {
        let result = await cartsService.addCart()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.post("/:cid/products/:pid", async (req, res)=>{
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        
        let result = await cartsService.addCartProduct(cartId, productId)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

export {router as cartsRouter}