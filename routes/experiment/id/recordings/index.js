'use strict';
const express = require('express');

const router = express.Router({mergeParams: true});

router.get('/:start', require('./start.get'));

module.exports = router;
