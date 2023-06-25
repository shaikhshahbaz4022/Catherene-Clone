const express = require('express');
const jwt = require('jsonwebtoken');
const CartModel = require('../models/cartmodel');
const jeansModel = require('../models/jeansmodel');
const topsModel = require('../models/topsmodel');
const shoesModel = require('../models/shoesmodel');



const cartRoute = express.Router()

cartRoute.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, "privateKey")
  // console.log(decoded);
  try {
    // console.log(decoded.userID);
    if (decoded) {
      // 
      const data = await CartModel.findOne({ "userID": decoded.userID }).populate("jeans.data").populate("tops.data").populate("shoes.data")
      res.status(201).send(data)
    }
  } catch (error) {
    res.status(401).send({ "msg": error.message })
  }
  // res.send("welocme")
})

cartRoute.post("/post", async (req, res) => {
  try {
    const data = new CartModel(req.body)
    await data.save()
    res.status(200).send(data)

  } catch (error) {
    res.status(400).send({ "msg": error.message })

  }
})



//for adding jeans to cart
cartRoute.post("/jeans/:id", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, "privateKey")
  const jeansID = req.params.id
  try {
    let cart = await CartModel.findOne({ userID: decoded.userID })


    const jeans = await jeansModel.findById(jeansID)

    if (!cart) {
      cart = new CartModel({ userID: decoded.userID })
    }

    if (!jeans) {
      return res.status(404).send({ "msg": "Jeans Not Found In DB" })
    }

    const isJeansInCart = cart.jeans.some((ele) =>
      ele.data.equals(jeans._id)
    )
    // const isSaleInCart = cart.sales.some((ele) => ele.sale.equals(sale._id));

    if (isJeansInCart) {
      return res.status(404).send({ "msg": "Product Already in the Cart" })
    }

    cart.jeans.push({ data: jeansID, quantity: 1 });

    await cart.save()
    res.status(200).send({ "msg": "Product Added To Cart", "data": cart })



  } catch (error) {
    res.status(400).send({ "msg": error.message })

  }
})

//for adding tops

cartRoute.post("/tops/:id", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, "privateKey")
  const topsID = req.params.id
  try {
    let cart = await CartModel.findOne({ userID: decoded.userID })


    const tops = await topsModel.findById(topsID)

    if (!cart) {
      cart = new CartModel({ userID: decoded.userID })
    }

    if (!tops) {
      return res.status(404).send({ "msg": "tops Not Found In DB" })
    }

    const istopsInCart = cart.tops.some((ele) =>
      ele.data.equals(tops._id)
    )

    if (istopsInCart) {
      return res.status(404).send({ "msg": "Product Already in the Cart" })
    }

    cart.tops.push({ data: topsID, quantity: 1 });

    await cart.save()
    res.status(200).send({ "msg": "Product Added To Cart" })



  } catch (error) {
    res.status(400).send({ "msg": error.message })

  }
})

//for adding shoes in the cart

cartRoute.post("/shoes/:id", async (req, res) => {
  try {
    const ShoesID = req.params.id
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "privateKey")


    let cart = await CartModel.findOne({ userID: decoded.userID })

    if (!cart) {
      cart = new CartModel({ userID: decoded.userID })
    }
    const shoes = await shoesModel.findById(ShoesID)
    if (!shoes) {
      return res.status(404).send({ "msg": "Shoes Not Present In Database" })
    }

    const isShoesPresentInCart = cart.shoes.some((ele) => ele.data.equals(shoes._id))

    if (isShoesPresentInCart) {
      return res.status(404).send({ "msg": "Product Already In the cart" })
    }

    cart.shoes.push({ data: ShoesID, quantity: 1 });
    await cart.save()
    res.status(200).send({ "msg": "Product Added To Cart" })



  } catch (error) {
    res.status(400).send({ "msg": error.message })

  }
})


cartRoute.patch("/inc/:itemId", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "privateKey");
    const cartId = req.params.id;
    const cart = await CartModel.findOne({ userID: decoded.userID })
  
    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }

    const itemId = req.params.itemId;
    let item = null;

    item = cart.jeans.find((ele) => ele._id.equals(itemId));


    if (!item) {
      item = cart.shoes.find((ele) => ele._id.equals(itemId));
    }

    if (!item) {
      item = cart.tops.find((ele) => ele._id.equals(itemId));
    }

    if (!item) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }

    item.Quantity += 1;
    await cart.save();

    res.status(200).send({ "msg": "Quantity Increased Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ "msg": error.message });
  }
})


cartRoute.patch("/decr/:itemId", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "privateKey");
    const cartId = req.params.id;
    const cart = await CartModel.findOne({ userID: decoded.userID })
    // console.log(cart);
    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }

    const itemId = req.params.itemId;
    let item = null;

  
    item = cart.jeans.find((ele) => ele._id.equals(itemId));

    
    if (!item) {
      item = cart.shoes.find((ele) => ele._id.equals(itemId));
    }

  
    if (!item) {
      item = cart.tops.find((ele) => ele._id.equals(itemId));
    }

    if (!item) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }

    item.Quantity -= 1;
    await cart.save();

    res.status(200).send({ "msg": "Quantity Increased Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ "msg": error.message });
  }
})
cartRoute.delete("/delete/:itemId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token, "privateKey");

    const cart = await CartModel.findOne({ userID: decoded.userID });

    if (!cart) {
      return res.status(404).send({ "msg": "Cart Not Found" });
    }

    const itemId = req.params.itemId;

    let itemArray = null;


    let itemIndex = cart.jeans.findIndex((item) => item.data._id.equals(itemId));
    if (itemIndex !== -1) {
      itemArray = cart.jeans;
    }


    if (itemIndex === -1) {
      itemIndex = cart.tops.findIndex((item) => item.data._id.equals(itemId));
      if (itemIndex !== -1) {
        itemArray = cart.tops;
      }
    }


    if (itemIndex === -1) {
      itemIndex = cart.shoes.findIndex((item) => item.data._id.equals(itemId));
      if (itemIndex !== -1) {
        itemArray = cart.shoes;
      }
    }

    if (itemIndex === -1) {
      return res.status(404).send({ "msg": "Item Not Found in Cart" });
    }


    itemArray.splice(itemIndex, 1);
    await cart.save();
 
    res.status(200).send({ "msg": "Item Removed Successfully" });
  } catch (error) {
    res.status(400).send({ "msg": error.message });
  }



})







module.exports = cartRoute