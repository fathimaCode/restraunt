//user.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let purchaseSchema = new Schema({
    name:{
        type:String
    },
    purchase_id:{
        type:String
    },
    total_amount:{
        type:String
    },
    debit_id:{
        type:String
    },
    purchased_at:{
        type:String
    },
  
})
module.exports = mongoose.model('purchase',purchaseSchema)