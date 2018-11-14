'use strict';
const express = require('express');

const router = express.Router({mergeParams: true});

router.use('/:dtype', require('./dtype'));
router.get('/', require('./get'));

module.exports = router;
