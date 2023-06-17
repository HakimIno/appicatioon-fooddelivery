var express = require("express");
const {
  createOrder,
  getOrder,
  getOneOrderById,
  getOrderSuccess,
  
} = require("../services/order.service");
const QRCode = require("qrcode");
const generatePayload = require("promptpay-qr");
var router = express.Router();

router.post("/", async (req, res) => {
  let { restaurantId } = req?.params;
  let username = req?.username;
  let response = await createOrder({ restaurantId, username });
  res.json(response);
});

router.get("/", async (req, res) => {
  let username = req?.username;
  let response = await getOrder({ username });
  res.json(response);
});

router.get("/success", async (req, res) => {
  let username = req?.username;
  let response = await getOrderSuccess({ username });
  res.json(response);
});

router.get("/:orderId", async (req, res) => {
  let orderId = req?.params?.orderId;
  let response = await getOneOrderById(orderId);
  res.json(response);
});




module.exports = router;
