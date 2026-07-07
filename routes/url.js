const express = require("express");
const router = express.Router()
const URL = require('../models/url')
const {handler_GenerateShortURL,handler_GetRedirectUrl,handler_GetAnalytics,handler_emptyGetRequest} = require('../controllers/url')

router.get('/',(req,res)=>{return res.redirect('/test')})
router.post('/',handler_GenerateShortURL);
router.get('/:shortId',handler_GetRedirectUrl)
router.get('/analytics/:shortId',handler_GetAnalytics)
module.exports = router;