const express = require('express')

const router = express.Router()

const caseController = require('../../controllers/caseController')

const ROLES_LIST = require('../../config/roles_list')

const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Head),caseController.createCase)
.get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Head,ROLES_LIST.SocialWorker),caseController.getAllCases)

module.exports = router


