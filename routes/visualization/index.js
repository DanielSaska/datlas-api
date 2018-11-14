'use strict';
const express = require('express');

const router = express.Router();

router.get('/:id', require('./id.get'));

module.exports = router;
