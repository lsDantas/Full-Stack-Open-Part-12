const express = require('express');
const redis = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  const count = await redis.getAsync('added_todos');
  res.send({ 'added_todos': count })
});

module.exports = router;
