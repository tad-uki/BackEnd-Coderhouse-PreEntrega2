import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { _dirname } from "./utils.js";

const port = 8080
const app = express()

app.listen(port, ()=>console.log(`Server running on port ${port}`))

app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

