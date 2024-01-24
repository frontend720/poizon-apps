const express = require("express")
const paymentRouter = express.Router()
const {db} = require("../config")
const { v4: uuid } = require("uuid");


paymentRouter.post("/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const data = {
        card_number: req.body.card_number,
        expiration: req.body.expiration,
        cvc: req.body.cvc,
        zipcode: req.body.zipcode,
        address: req.body.address
    }
    const collectionRef = db.collection("users").doc(user_id).collection("payment-info").doc(uuid()).set(data)
    collectionRef.then((payment) => {
        if (!data) {
           res.status(400).send({message: "payment info must be provided to continue"}) 
        } else {
            res.status(200).send(payment)
        }
    }).catch((error) => {
        res.status(500).send({message: error.code})
    })
})

paymentRouter.put("/:user_id/:payment_id", (req, res) => {
    const user_id = req.params.user_id
    const payment_id = req.params.payment_id
    const paymentRef = db.collection("users").doc(user_id).collection("payment-info").doc(payment_id).set()
})

module.exports = paymentRouter
