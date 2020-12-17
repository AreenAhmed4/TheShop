const app = require('express')();
const mongoose = require('mongoose');


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}))

// parse application/json
app.use(bodyParser.json())


const db =
    mongoose.connect('mongodb://localhost/Store', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });



let Category = require('./model/category');
let Tshirt = require('./model/t-shirt');
let ORDERS = require('./model/ORDERS');

app.post('/t-shirt', function (req, res) {
    let NewTshirt = new Tshirt()

    NewTshirt.TshirtName = req.body.TshirtName;
    NewTshirt.TshirtCategoryName = req.body.TshirtCategoryName;
    NewTshirt.TshirtPrice = req.body.TshirtPrice;
    let sales = NewTshirt.NumberOfAvailableItems = req.body.NumberOfAvailableItems;

    NewTshirt.save(function (err, SavedTshirt) {

        if (err) {
            res.status(500).send({
                error: "Coudn't add T-shirt"
            })
        } else {
            res.send(SavedTshirt)
        }
    })
})

app.get('/t-shirt', function (req, res) {
    Tshirt.find({}, function (err, Tshirts) {

        if (err) {
            res.status(500).send({
                Error: "Coudn't get Tshirts"
            })
        } else {
            res.status(500).send(Tshirts)
        }
    })
})



app.post('/category', function (req, res) {
    let NewCategory = new Category()

    NewCategory.CategoryName = req.body.CategoryName;


    NewCategory.save(function (err, SavedCategory) {

        if (err) {
            res.status(500).send({
                error: "Coudn't add category"
            })

        } else {
            res.send(SavedCategory)
        }

    })
})




app.get('/category', function (req, res) {

    Category.find({}).populate(


        {
            path: 'tshirts',
            model: 'Tshirt',
            select: 'TshirtName',
        }
    ).exec(function (error, categores) {

        if (error) {
            res.status(500).send({
                Error: "Coudn't get Tshirts"
            })
        } else {

            res.send(categores);
        }
    })

})

app.put('/category/t-shirt/add', function (req, res) {
    let tshirtID = req.body.tshirtId
    let categoryID = req.body.categoryId

    Tshirt.findOne({
        _id: tshirtID
    }, function (err, tshirt) {

        if (err) {
            res.status(500).send({
                error: "Coudn't find tshirt"
            })
        } else {
            Category.updateOne({
                    _id: categoryID
                }, {
                    $addToSet: {
                        tshirts: tshirt._id
                    }
                },
                function (err, status) {
                    if (err) {

                        res.status(500).send({
                            error: "Coudn't update category"
                        })

                    } else {
                        res.status(500).send(status)
                    }
                })
        }
    })
})


app.post('/ORDERS', function (req, res) {
    let NewOrder = new ORDERS()

    NewOrder.OrderNumber = req.body.OrderNumber;
    NewOrder.TshirtID = req.body.TshirtId;
    NewOrder.OrderDateTime = req.body.OrderDateTime;
    NewOrder.CustomerPhoneNumber = req.body.CustomerPhoneNumber;
    NewOrder.NumberOfAvailableItems = req.body.NumberOfAvailableItems;
    NewOrder.save(function (err, SavedOrder) {

        if (err) {
            res.status(500).send({
                error: "Coudn't add Order"
            })

        } else {
            function Order(err, NumberOfAvailableItems) {

                if ((NumberOfAvailableItems != 0) && (!(err))) {
                    res.send(NumberOfAvailableItems-1);
                } else {
                    res.status(500).send({
                        error: "Coudn't add ORDER"
                    })
                }

            }
        }

    })
})



app.get('/ORDERS', function (req, res) {
    ORDERS.find({}, function (err, Orders) {

        if (err) {
            res.status(500).send({
                Error: "Coudn't get Orders"
            })
        } else {
            res.status(500).send(Orders)
        }
    })
})




app.listen(3000, function () {

    console.log("Server is running on 3000 port")
})
