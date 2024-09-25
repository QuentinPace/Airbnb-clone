const express = require('express');

const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router()

router.delete('/:imageId', async (req, res) => {
    const imageId = parseInt(req.params.imageId)
    if(!req.user){
        res.status(401)
        return res.json({
            "message": "Authentication required"
          })
    }
    else{
        const targetReviewImage = await ReviewImage.findOne({
            where : {id :imageId},
            include :{
                model : Review,
                attributes : ['userId']
            }
        });
        if(!targetReviewImage){
            res.status(404)
            return res.json({
                "message": "Review Image couldn't be found"
              })
        }else {
            if(targetReviewImage.dataValues.Review.dataValues.userId !== req.user.id){
                res.statusCode = 403
                return res.json({
                    "message": "Forbidden"
                  })
            }
            await ReviewImage.destroy({ where: { id: imageId } });
            res.statusCode = 200
            return res.json({
                "message": "Successfully deleted"
              })
        }

    }

})





module.exports = router;
