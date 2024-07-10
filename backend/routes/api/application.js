const express = require('express')
const router = express.Router()

const applicationController = require('../../controllers/applicationController')

const ROLES_LIST = require('../..//config/roles_list')

const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
.get(verifyRoles(ROLES_LIST.Head,ROLES_LIST.SocialWorker),applicationController.getApplications)

module.exports = router