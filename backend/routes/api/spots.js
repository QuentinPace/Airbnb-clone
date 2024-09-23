const express = require('express')
const { Spot, User } = require('../../db/models');


const router = express.Router()

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll()
    res.statusCode = 200
    return res.json(allSpots)
})

module.exports = router;