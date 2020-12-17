const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectID

let schema = mongoose.Schema;

let order = new schema({
    OrderNumber: {
        type: Number,
        required: true,
        default: "No#"
    },
    TshirtID: {
        type: Number,
        required: true
    },
    OrderDateTime: Date,
    CustomerPhoneNumber: {
        type: Number,
        required: true
    },
    NumberOfAvailableItems: [{
        type: objectId,
        required: true,
        ref: 'Tshirt'
    }]

});


//function Order(err, NumberOfAvailableItems) {
//
//    if ((NumberOfAvailableItems !=0) && (!(err))) {
//        res.send(NumberOfAvailableItems-1);
//    } else {
//        res.status(500).send({
//            error: "Coudn't add ORDER"
//        })
//    }
//
//}

module.exports = mongoose.model('ORDERS', order);
