import express from "express";
import path from "path";
import { _dirname } from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { ProductManager } from "./persistence/classes/ProductManager.js";
import { CartManager } from "./persistence/classes/CartManager.js";



const port = 8080
const app = express()

const httpServer = app.listen(port, ()=>console.log(`Server running on port ${port}`))
const io = new Server(httpServer)

connectDB()


const productsService = new ProductManager()
const cartsService = new CartManager()

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", path.join(_dirname, "/views"))

app.use(express.json())
app.use(express.static(path.join(_dirname, "/public")))

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

io.on("connection", async (socket)=>{
    console.log("Client succesfully connected")
    const products = await productsService.getProducts()
    socket.emit("productList", products)

    socket.on("addProduct", async (data)=>{
       await productsService.addProduct(data)
       const products = await productsService.getProducts()
       socket.emit("productList", products)
    })

    socket.on("addProductToCart", async (prodId)=>{
        await cartsService.addProductToCart("653ed60a9225dfc61e160e95", prodId)
    })
})



