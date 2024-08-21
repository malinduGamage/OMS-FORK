const express = require('express')
const router = express.Router()

const fileController = require('../../controllers/fileController')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../config/roles_list')

router.route('/childPhotoUpload/:path')
    .get(verifyRoles(ROLES_LIST.Staff), fileController.getChildPhotoUploadURL)
router.route('/childPhotoDownload/:childId')
    .get(verifyRoles(ROLES_LIST.Head, ROLES_LIST.Staff), fileController.getChildPhotoDownloadURL)
router.route('/requestPhotoDownload/:requestId')
    .get(verifyRoles(ROLES_LIST.Head, ROLES_LIST.Staff), fileController.getRequestPhotoDownloadURL)
router.route('/childDocumentUpload/:path')
    .get(verifyRoles(ROLES_LIST.Head, ROLES_LIST.Staff), fileController.getChildDocUploadURL)
router.route('/childDocumentDownload/:documentId')
    .get(verifyRoles(ROLES_LIST.Head, ROLES_LIST.Staff), fileController.getChildDocDownloadURL)

module.exports = router;



