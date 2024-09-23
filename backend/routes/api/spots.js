const express = require('express')
const { Spot, User } = require('../../db/models');


const router = express.Router()

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll()
    res.statusCode = 200
    return res.json(allSpots)
})

router.get('/current', async(req,res) => {
    console.log("====> 1");
    const { user } = req;
    if (user) {
        console.log("====> 2");
        const allSpots = await Spot.findAll({
        where : {ownerId : user.id}
        })
        res.status(200)
        console.log("====> 3");
        return res.json(allSpots)  
    } else {
        console.log("====> 4");
        res.status(403)
        return res.json({ user: null });
    } 
})




module.exports = router;