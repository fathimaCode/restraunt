//user.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let productSchema = new Schema({
    title:{
        type:String
    },
    quantity:{
        type:String
    },
    price:{
        type:String
    },
    imageFile:{
        type:String
    },
    created_at:{
        type:String
    }
})
module.exports = mongoose.model('product',productSchema)