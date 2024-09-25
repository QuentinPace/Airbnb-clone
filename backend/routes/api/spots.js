const express = require('express')
const { fn, col } = require('sequelize');

const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];


const router = express.Router()

router.get('/current', async(req,res) => {
    const { user } = req;
    if (user) {
        const spots = await Spot.findAll({
            where : {ownerId : user.id},
            attributes: {
                include: [
                    [fn('AVG', col('Reviews.stars')), 'avgRating']  
                ]
            },
            include: [
                {
                    model: Review,
                    attributes: [],  
                    required :false
                },
                {
                    model: SpotImage,
                    where :{ preview: true},
                    attributes:[['url','previewImage']],
                    required :false
                }
            ],
            group: ['Spot.id'],  // Group by SpotId
        });
        
        const formattedSpots = spots.map(spot => {
            let previewImage = spot.dataValues.SpotImages.length > 0 ? spot.dataValues.SpotImages[0].dataValues.previewImage : null; 
            delete spot.dataValues.SpotImages;
            return {
                ...spot.get(),
                previewImage,  
            };
        });
        res.status(200)
        return res.json(formattedSpots)  
    } else {
        res.status(403)
        return res.json({ user: null });
    }
})

router.post('/:spotId/reviews', validateReview, async (req, res) => {
    const spotId = parseInt(req.params.spotId)
    const { user } = req
    if(user) {
        const spot = await Spot.findByPk(spotId)
        if(!spot){
            res.statusCode = 404
            return res.json({
                "message": "Spot couldn't be found"
              })
        }
        const allReviewsForSpot = await Review.findAll({
            where: {
                spotId: spotId
            }
        })
        for(let i = 0; i < allReviewsForSpot.length; i++){
            const currRev = allReviewsForSpot[i].dataValues
            if(currRev.userId === user.id){
                res.statusCode = 500
                return res.json({
                    "message": "User already has a review for this spot"
                  })
            }

        }
        const createdReview = await Review.create({
            ...req.body,
            userId: user.id,
            spotId: spot.dataValues.id
        })
        res.statusCode = 201
        return res.json(createdReview)
    }
    else {
        res.statusCode = 401
        return res.json({
            "message": "Authentication required"
          })
    }

})

router.get('/:spotId/reviews', async (req,res) => {
    const spotId = parseInt(req.params.spotId);
    const targetSpot = await Spot.findByPk(spotId);
    if (!targetSpot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
          })
    } else {
        const reviews = await Review.findAll({
            where : {
                spotId
            },
            include:[
                {
                    model:User,
                    attributes: ['id','firstName', 'lastName']
                },
                {
                    model:ReviewImage,
                    attributes: ['id','url']
                }
            ]
        })
        res.status(200);
        return res.json(reviews);
    }
})

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
                message: "Spot couldn't be found"
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
    const spots = await Spot.findAll({
        where: {
            id: parseInt(req.params.spotId)
        },
        attributes: {
            include: [
                [fn('AVG', col('Reviews.stars')), 'avgRating']  
            ]
        },
        include: [
            {
                model: Review,
                attributes: [],  
                required :false
            }
        ],
        group: ['Spot.id'],  // Group by SpotId
    })
    // console.log(spots)
    if(!spots.length){
        res.statusCode = 404
        return res.json({
            message: "Spot Couldn't be found"
        })
    }
    const ownerId = spots[0].dataValues.ownerId
    const owner = await User.findOne({
        where: {
            id: ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })

    const spotImages = await SpotImage.findAll({
        where: {
            spotId: parseInt(req.params.spotId)
        }
    })

    const imagesArr = []
    spotImages.forEach(spot => {
        const imageObj = {}
        imageObj.id = spot.dataValues.id
        imageObj.url = spot.dataValues.url
        imageObj.preview = spot.dataValues.preview
        imagesArr.push(imageObj)
    })
    const response = {
        ...spots[0].dataValues,
        SpotImages: imagesArr,
        Owner: owner
    }
    res.statusCode = 200
    return res.json(response)
})


router.put('/:spotId', async (req, res,next ) => {
    if(!req.user) {
        res.status=200;
        res.json({ 'message': 'Require proper authorization: Spot must belong to the current user'})
    } else {
        const spotId= parseInt(req.params.spotId);
        const targetSpot = await Spot.findByPk(spotId);
        try {
            if(!targetSpot) {
                res.status(404);
                return res.json({
                    "message": "Spot couldn't be found"
                })
            } else {
                await Spot.update(
                    req.body, // attributes and values to update
                    { where:
                        { id: spotId}  // specific records to update
                    }
                )
                const updatedSpot = await Spot.findByPk(spotId);
                res.status(200);
                return res.json(updatedSpot);
            }
        } catch (err){
            res.statusCode=400;
            res.json({
                "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
                "errors": {
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
            })
        }
    }
})

router.delete('/:spotId', async (req, res) => {
    const spotId = parseInt(req.params.spotId)
    if(!req.user){
        res.status(401)
        return res.json({
            message: "Require proper authorization: Spot must belong to the current user"
        })
    }
    else{
        const targetSpot = await Spot.findByPk(spotId);
        if(!targetSpot){
            res.status(404)
            return res.json({
                "message": "Spot couldn't be found"
              })
        }else {
            await targetSpot.destroy()
            res.statusCode = 200
            return res.json({
                "message": "Successfully deleted"
              })
        }
    }

})




router.get('/', async(req, res) => {
    try {
        const spots = await Spot.findAll({
            attributes: {
                include: [
                    [fn('AVG', col('Reviews.stars')), 'avgRating']  
                ]
            },
            include: [
                {
                    model: Review,
                    attributes: [],  
                    required :false
                },
                {
                    model: SpotImage,
                    where :{ preview: true},
                    attributes:[['url','previewImage']],
                    required :false
                }
            ],
            group: ['Spot.id'],  // Group by SpotId
        });
        
        const formattedSpots = spots.map(spot => {
            let previewImage = spot.dataValues.SpotImages.length > 0 ? spot.dataValues.SpotImages[0].dataValues.previewImage : null; 
            delete spot.dataValues.SpotImages;
            return {
                ...spot.get(),
                previewImage,  
            };
        });

        res.statusCode = 200
        return res.json(formattedSpots); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching spots.' });
    }
    

    // res.statusCode = 200
    // return res.json(allSpots)
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