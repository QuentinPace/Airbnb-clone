const express = require('express');
const { fn, col } = require('sequelize');

const { Spot, User, SpotImage, Review, ReviewImage,Booking } = require('../../db/models');

const router = express.Router()

router.get('/current', async(req,res) => {
    const { user } = req;
    if (user) {
        const allBookings = await Booking.findAll({
            where : {userId : user.id},
            include :{
                model: Spot
            }
        })
        
        let response = await Promise.all(allBookings.map(async booking => {
                let spotId = booking.dataValues.spotId;
                try {
                    let previewImageObject = await SpotImage.findOne({
                        where : {
                            spotId,
                            preview : true
                        },
                        attributes :[['url','previewImage']]
                    })
                    let previewImage = previewImageObject.dataValues.previewImage;
                    booking.dataValues.Spot.dataValues.previewImage=previewImage
                } catch {
                    let previewImage = " ";
                    booking.dataValues.Spot.dataValues.previewImage=previewImage
                };
                //reformatted it 
                booking.dataValues ={
                    id: booking.id,
                    spotId: booking.spotId,
                    Spot: booking.Spot,  // Move Spot object here
                    userId: booking.userId,
                    startDate: booking.startDate,
                    endDate: booking.endDate,
                    createdAt: booking.createdAt,
                    updatedAt: booking.updatedAt
                }
            })
        )
        console.log(allBookings)
        res.status(200)
        return res.json(allBookings)  
    } else {
        res.status(403)
        return res.json({
            "message": "Authentication required"
          });
    }
})


module.exports = router;