'use strict';
const express = require('express');

const router = express.Router({mergeParams: true});

router.use('/recordings', require('./recordings'));
router.get('/', require('./get'));

module.exports = router;
