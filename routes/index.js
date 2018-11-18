'use strict';
const express = require('express');

const router = express.Router();
router.use('/recording', require('./recording'));
router.use('/recordings', require('./recordings'));
router.use('/experiment', require('./experiment'));
router.use('/experiments', require('./experiments'));
router.use('/tag', require('./tag'));
router.use('/tags', require('./tags'));
router.use('/group', require('./group'));
router.use('/groups', require('./groups'));
router.use('/visualization', require('./visualization'));

//router.get('/', require('./get'));

module.exports = router;
