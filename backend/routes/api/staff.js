const express = require('express');
const router = express.Router();

const staffController = require('../../controllers/staffController')
const ROLES_LIST = require('../../config/roles_list')

const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), staffController.addStaff)


module.exports = router