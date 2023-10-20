import { Router } from "express";
import { ProductManager } from "../components/ProductManager.js";
import { _dirname } from "../utils.js";
import path from "path"

const router = Router()

const productsService = new ProductManager(path.join(_dirname, "/files/products.json"))

const products = await productsService.getProducts()

router.get("/", async(req, res)=>{
    try {
        const limitQuery = req.query.limit
        if(limitQuery){
            const limitProducts = await products.filter((p)=> p.id <= limitQuery)
            res.send(limitProducts)
        }
        else{
            res.send(products)
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/:pid", async (req, res)=>{
    try {
        const idParam = parseInt(req.params.pid)
        const paramProduct = await productsService.getProductById(idParam)
        if(paramProduct){
            res.send(paramProduct)
        }
        else{
            res.send(new Error("Product doesn't exist."))
        }
    } catch (error) {
        res.send(error)
    }
})

router.post("/", async (req, res)=>{
    try {
        const newProduct = req.body
        let result = await productsService.addProduct(newProduct)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.put("/:pid", async (req, res)=>{
    try {
        const idParam = parseInt(req.params.pid)
        const updProduct = req.body
        let result = await productsService.updateProduct(idParam, updProduct)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/:pid", async (req, res)=>{
    try {
        const idParam = parseInt(req.params.pid)
        let result = await productsService.deleteProduct(idParam)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

export {router as productsRouter}