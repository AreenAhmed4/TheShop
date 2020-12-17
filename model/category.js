const mongoose = require ('mongoose');

const objectId = mongoose.Schema.Types.ObjectID

let schema = mongoose.Schema;

let category = new schema ({
    CategoryName : {type: String , required: true},
    categoryID : Number,
    tshirts : [{ type : objectId , ref : 'Tshirt' }]
})

module.exports = mongoose.model ('Category', category)