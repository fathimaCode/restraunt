//user.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let historySchema = new Schema({
    purchase_id:{
        type:String
    },
    quantity:{
        type:String
    },
    productId:{
        type:String
    },
    subtotal:{
        type:String
    },
  
})
module.exports = mongoose.model('history',historySchema)