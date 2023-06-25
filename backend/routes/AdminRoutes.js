const express = require('express');
const UserModel = require('../models/usermodel');
const jeansModel = require('../models/jeansmodel');
const topsModel = require('../models/topsmodel');
const shoesModel = require('../models/shoesmodel');
const CartModel = require('../models/cartmodel');
const AdminRoute = express.Router()

//get all users
AdminRoute.get("/api/users", async (req, res) => {
    try {
        const data = await UserModel.find()
        res.status(200).send({ "data": data, "ok": true })
    } catch (error) {
        res.status(404).send({ "msg": error.message, "ok": false })
    }
})

AdminRoute.get("/api/products", async (req, res) => {
    try {

        let allProductsData = []
        const jeans = await jeansModel.find()
        const tops = await topsModel.find()
        const shoes = await shoesModel.find()

        allProductsData = [...jeans, ...tops, ...shoes]
        res.status(201).send(allProductsData)
    } catch (error) {
        res.status(404).send({ "msg": error.message, "ok": false })

    }
})



AdminRoute.post("/api/jeans", async (req, res) => {
    try {
        const data = new jeansModel(req.body)
        await data.save()
        res.status(200).send({ "msg": "Jeans Added Succesfully", "data": data , "ok":true })

    } catch (error) {
        res.status(400).send({ "msg": "error occured while Posting jeans", "err": error.message , "ok":false })

    }
})
AdminRoute.post("/api/tops", async (req, res) => {
    try {
        const data = new topsModel(req.body)
        await data.save()
        res.status(200).send({ "msg": "Tops Added Succesfully", "data": data , "ok":true })

    } catch (error) {
        res.status(400).send({ "msg": "error occured while Posting tops", "err": error.message, "ok":false })

    }
})

AdminRoute.post("/api/shoes", async (req, res) => {
    try {
        const data = new shoesModel(req.body)
        await data.save()
        res.status(201).send({ "msg": "Shoes Added Succesfully" , "ok":true })

    } catch (error) {
        res.status(401).send({ "msg": "error occured while Posting shoes", "err": error.message , "ok":false})

    }

})

//update Jeans

AdminRoute.patch("/api/product/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        let updated = null;
        updated = await jeansModel.findByIdAndUpdate(id, payload);
        
        if (!updated) {
            updated = await topsModel.findByIdAndUpdate(id, payload);
        }
        
        if (!updated) {
            updated = await shoesModel.findByIdAndUpdate(id, payload);
        }
        
        if (!updated) {
            return res.status(200).send({ msg: "Product Not Found" });
        }
        
        res.status(201).send({ msg: "Product Updated Successfully", data: updated, ok: true });
    } catch (error) {
        res.status(401).send({ err: error.message, ok: false });
    }
});


// //update tops
// AdminRoute.patch("/api/tops/update/:id", async (req, res) => {
//     try {
//         const { id } = req.params
//         const payload = req.body
//         const updated = await topsModel.findByIdAndUpdate({ _id: id }, payload)
//         res.status(201).send({ "msg": "tops Updated Succesfully", "data": updated, "ok": true })
//     } catch (error) {
//         res.status(401).send({ "err": error.message, "ok": false })
//     }
// })
// //update shoes
// AdminRoute.patch("/api/shoes/update/:id", async (req, res) => {
//     try {
//         const { id } = req.params
//         const payload = req.body
//         const updated = await shoesModel.findByIdAndUpdate({ _id: id }, payload)
//         res.status(201).send({ "msg": "shoes Updated Succesfully", "data": updated, "ok": true })
//     } catch (error) {
//         res.status(401).send({ "err": error.message, "ok": false })
//     }
// })

//delete jeans
AdminRoute.delete("/api/jeans/delete/:id", async (req, res) => {
    try {
        const { id } = req.params

        await jeansModel.findByIdAndDelete({ _id: id })
        res.status(201).send({ "msg": "Jeans Deleted Succesfully", "ok": true })
    } catch (error) {
        res.status(401).send({ "err": error.message, "ok": false })
    }
})
//delete tops

AdminRoute.delete("/api/tops/delete/:id", async (req, res) => {
    try {
        const { id } = req.params

        await topsModel.findByIdAndDelete({ _id: id })
        res.status(201).send({ "msg": "tops Deleted Succesfully", "ok": true })
    } catch (error) {
        res.status(401).send({ "err": error.message, "ok": false })
    }
})
//delete shoes

AdminRoute.delete("/api/shoes/delete/:id", async (req, res) => {
    try {
        const { id } = req.params

        await shoesModel.findByIdAndDelete({ _id: id })
        res.status(201).send({ "msg": "Shoes Deleted Succesfully", "ok": true })
    } catch (error) {
        res.status(401).send({ "err": error.message, "ok": false })
    }
})





module.exports = AdminRoute