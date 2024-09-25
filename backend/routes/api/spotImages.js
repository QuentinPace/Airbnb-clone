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
        const targetSpotImage = await SpotImage.findOne({
            where : {id :imageId},
            include :{
                model : Spot,
                attributes : ['ownerId']
            }
        });
        if(!targetSpotImage){
            res.status(404)
            return res.json({
                "message": "Spot Image couldn't be found"
              })
        }else {
            if(targetSpotImage.dataValues.Spot.dataValues.ownerId !== req.user.id){
                res.statusCode = 403
                return res.json({
                    "message": "Forbidden"
                  })
            }
            await SpotImage.destroy({ where: { id: imageId } });
            res.statusCode = 200
            return res.json({
                "message": "Successfully deleted"
              })
        }

    }

})





module.exports = router;
