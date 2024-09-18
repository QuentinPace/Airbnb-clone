// backend/routes/api/index.js
const router = require('express').Router();

// backend/routes/api/index.js

router.post('/test', function(req, res) {
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    //res.json({made: 'it here'})
    res.json({ requestBody: req.body });
  });


module.exports = router;