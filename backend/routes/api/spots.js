const express = require('express')
const { Spot, User, SpotImage } = require('../../db/models');


const router = express.Router()

router.post('/:spotId/images', async(req, res) => {
    const { user } = req
    if (user) {
        const spotFound = await Spot.findOne({
            where: {
                id: parseInt(req.params.spotId)
            }

        })
        if(!spotFound){
            res.statusCode = 404
            return res.json({
                message: "Spot Couldn't be found"
            })
        }
        else{
            const newSpotImage = await SpotImage.create({
                ...req.body,
                spotId: parseInt(req.params.spotId)
            })
            const { id, url, preview } = newSpotImage
            res.statusCode = 201

            return res.json({
                id,
                url,
                preview
            })
        }    
    } else {
        res.status(403)
        return res.json({ user: null , message: 'you must log in'});

    }


})

router.get('/:spotId', async(req, res) => {
    const spotById = await Spot.findAll({
        where: {
            id: parseInt(req.params.spotId)
        }
    })
    res.statusCode = 200
    return res.json(spotById)
})

router.get('/current', async(req,res) => {
    const { user } = req;
    if (user) {
        const allSpots = await Spot.findAll({
        where : {ownerId : user.id}
        })
        res.status(200)
        return res.json(allSpots)  
    } else {
        res.status(403)
        return res.json({ user: null });
    } 
})

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll()
    res.statusCode = 200
    return res.json(allSpots)
})

router.post('/', async(req, res) => {
    const { user } = req;
    //const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (user) {
        try{
        console.log("====> 2");
        const newSpot = await Spot.create({
            ownerId: user.id,
            ...req.body
        })
        res.status(201)
        console.log("====> 3");
        return res.json(newSpot)
    }
    catch{
        const errors = {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude must be within -90 and 90",
            "lng": "Longitude must be within -180 and 180",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day must be a positive number"
          }
          res.status(400)
          return res.json({
            message: "Bad Request",
            errors
          })

    }
    } else {
        console.log("====> 4");
        res.status(403)
        return res.json({ user: null });
    }

})


module.exports = router;