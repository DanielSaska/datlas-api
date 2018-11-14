'use strict';
const express = require('express');

const router = express.Router({mergeParams: true});

router.get('/', require('./get'));

module.exports = router;
