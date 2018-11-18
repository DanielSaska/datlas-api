'use strict';
const express = require('express');

const router = express.Router();
router.use('/analysis', require('./analysis'));


router.use('/:id', require('./id'));

module.exports = router;
