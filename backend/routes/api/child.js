const express = require('express');
const router = express.Router();

const childController = require('../../controllers/childController')
const ROLES_LIST = require('../../config/roles_list')

const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Head), childController.getAllChildren)

router.route('/add').post(verifyRoles(ROLES_LIST.Head), childController.addChild)

module.exports = router