const express = require('express');
const QRCode = require('qrcode');
const generatePayload = require("promptpay-qr");

const router = express.Router();

router.post('/generate-qr', (req, res) => {
  const mobileNumber = '0638288463';
  const amount = 20;
  const payload = generatePayload(mobileNumber, { amount });
  const option = {
    color: {
      dark: "#2563eb", // สีตัว QRcode ตรงนี้กำหนดไว้เป็นสีน้ำ
      light: "#fff", // สีพื้นหลัง
    },
  };
  QRCode.toDataURL(payload, option, (err, url) => {
    if (err) {
      res.status(500).send('Error generating QR code');
      return;
    }
    res.json({ url });
  });
});

module.exports = router;
