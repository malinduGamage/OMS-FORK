const express = require('express');
const router = express.Router();

const orphanageController = require('../../controllers/orphanageController')
const ROLES_LIST = require('../../config/roles_list')

const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
.post(verifyRoles(ROLES_LIST.Admin),orphanageController.addOrphanage)

router.route('/byHead')
.get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Head),orphanageController.getOrphanageByHead)

module.exports = router