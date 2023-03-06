const router = require('express').Router()
const ctrl = require('../controllers/admin.controller')


router.post('/login', ctrl.loginAdmin)

module.exports = router