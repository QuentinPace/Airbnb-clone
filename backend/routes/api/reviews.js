const express = require('express');

const { Spot, User, SpotImage, ReviewImage,Review } = require('../../db/models');

const { Op } = require('sequelize');

const router = express.Router();


router.post('/:reviewId/images',async (req,res)=>{
    if(!req.user) {
        return res.json({
            message: 'Require proper authorization: Review must belong to the current user'
        })
    } else{
        const reviewId = parseInt(req.params.reviewId)
        const targetReview = await Review.findByPk(reviewId);
        if (!targetReview){
            res.status(404);
            return res.json({
                "message": "Review couldn't be found"
            })
        } else {
            const existingImages = await ReviewImage.findAll({
                where : {
                    reviewId
                }
            })
            if (existingImages.length>=10){
                res.status(403);
                res.json({
                    "message": "Maximum number of images for this resource was reached"
                })
            } else {
                const newReviewImage = await ReviewImage.create({
                    reviewId,
                    url:req.body.url
                })
                const { id, url } = newReviewImage;
                res.statusCode = 201;
                return res.json({id,url});
            }
        
        }
    }
})





module.exports = router;
