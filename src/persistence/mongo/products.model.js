import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    code:{
        type:String,
        required: true,
        unique: true
    },
    stock:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required: true,
        enum: ["CategoryA", "CategoryB", "CategoryC"]
    },
    status:{
        type:Boolean,
        required: true
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollection, productsSchema)