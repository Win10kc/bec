const express = require('express');
const { issueCertificate } = require('../services/blockchain');
const router = express.Router();

router.post('/issue', async (req, res) => {
  const { recipientAddress, certificateURI } = req.body;
  try {
    const certificate = await issueCertificate(recipientAddress, certificateURI);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
