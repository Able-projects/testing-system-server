const express = require('express')
const SectionCtrl = require('../controllers/sectionController')
const router = express.Router()
const isAuth = require('../validators/isAuth')
const isAdmin = require('../validators/isAdmin')
router.post('/section',isAdmin, SectionCtrl.createSection)
router.put('/section/:id',isAdmin, SectionCtrl.updateSection)
router.delete('/section/:id', isAdmin, SectionCtrl.deleteSection)
router.get('/sections', isAuth, SectionCtrl.getSections)
module.exports = router