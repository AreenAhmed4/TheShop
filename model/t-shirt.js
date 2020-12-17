const mongoose = require ('mongoose');

const objectId = mongoose.Schema.Types.ObjectID

let schema = mongoose.Schema;

let tshirt = new schema ({
    TshirtName : { type : String, required : true , default : "No T-shirt"} ,
    TshirtCategoryName: [{ type : objectId, ref : 'Category' }] ,
    TshirtPrice : Number,
    NumberOfAvailableItems : Number 
    
})

module.exports = mongoose.model ('Tshirt' , tshirt);