const express = require("express");
const merchantRouter = express.Router();
const { v4: uuid } = require("uuid");
const { db } = require("../config");
const { deleteApp } = require("firebase-admin/app")

merchantRouter.post("/", (req, res) => {
  const data = {
    merchant_id: uuid(),
    restaurant_id: req.body.restaurant_id.replaceAll(" ", "_").toLowerCase(),
    account_type: req.body.account_type, // Standard, Featured, Deliver-Only, or Chain
    subscription_fee: req.body.subscription_fee, // Basic: Access to basic app features, lower commission rate. Standard: Additional features like priority delivery, data insights, marketing support. Premium: Highest visibility, lowest commission rate, dedicated account manager.
    delivery_fee: req.body.delivery_fee, // Free, 0.99, 1.99, 3.99
    payment_method: req.body.payment_method, // Credit cards: Visa, Mastercard, American Express, Debit card, Digital wallets, Bank transfers
    account_status: req.body.account_status, // Pending, Active, Suspended, Terminated, Probation
    additional_notes: req.body.additional_notes,
  };
  const merchantReference = db
    .collection("merchants")
    .doc(uuid())
    .set(data, { merge: true });
  merchantReference
    .then((merchant) => {
      if (!merchant) {
        res.status(400).send({
          message:
            "Can't create account,  please check your info and try again.",
        });
      } else {
        res.status(200).send(merchant);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.code + "Unable to create account. Please try again later.",
      });
    });
});

merchantRouter.get("/:merchantId", (req, res) => {
  const merchant_id = req.params.merchantId;
  const getMerchantReference = db
    .collection("merchants")
    .doc(merchant_id)
    .get();
  getMerchantReference
    .then((merchant) => {
      if (!merchant.exists) {
        res.status(400).send({ message: "Merchant not found" });
      } else {
        res.status(200).send(merchant.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

merchantRouter.put("/:merchantId", (req, res) => {
    const merchant_id = req.params.merchantId
  const data = {
    account_type: req.body.account_type, // Standard, Featured, Deliver-Only, or Chain
    subscription_fee: req.body.subscription_fee, // Basic: Access to basic app features, lower commission rate. Standard: Additional features like priority delivery, data insights, marketing support. Premium: Highest visibility, lowest commission rate, dedicated account manager.
    delivery_fee: req.body.delivery_fee, // Free, 0.99, 1.99, 3.99
    payment_method: req.body.payment_method, // Credit cards: Visa, Mastercard, American Express, Debit card, Digital wallets, Bank transfers
    account_status: req.body.account_status, // Pending, Active, Suspended, Terminated, Probation
    additional_notes: req.body.additional_notes,
  };
  const updateMerchantReference = db
    .collection("merchants")
    .doc(merchant_id)
    .set(data, { merge: true });
  updateMerchantReference
    .then((update) => {
      if (!update) {
        res.status(400).send({
          message:
            "Unable to update merchant, please check your info and try again.",
        });
      } else {
        res.status(200).send(update.writeTime.seconds);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.code + "Unable to update account. Please try again later.",
      });
    });
});

merchantRouter.delete("/:merchantId", (req, res)=> {
    const merchant_id = req.params.merchantId
    const deleteMerchantReference = db.collection("merchants").doc(merchant_id).delete()
    deleteMerchantReference.then((merchant) => {
        if (!merchant) {
            res.status(400).send({message: "Merchant not found"})
        } else {
            res.status(200).send(merchant.writeTime)
        }
    }).catch((error) => {
        res.status(500).send({message: "Unable to delete merchant. Please try again later" + error.code})
    })
})

module.exports = merchantRouter;
