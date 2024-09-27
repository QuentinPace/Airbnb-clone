const express = require('express')
const { literal, Op } = require('sequelize');

const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const {environment} = require('../../config/index.js')

const { validateSpot, validateReviewCreate, validateQuery } = require('../../utils/validationArrays');
const spot = require('../../db/models/spot.js');


const router = express.Router()

router.get('/current', async(req,res) => {
    const { user } = req;
    if (user) {
        try{
            let spots;
            if(environment==="development"){ 
                spots = await Spot.findAll({
                    where : {ownerId : user.id},
                    attributes: {
                        include: [
                            [literal(`(
                                SELECT AVG(stars) 
                                FROM "Reviews" 
                                WHERE "Reviews"."spotId" = Spot.id
                                )`), 'avgRating'], 
                            [literal(`(
                                SELECT url 
                                FROM "SpotImages" 
                                WHERE "SpotImages"."spotId" = Spot.id 
                                    AND "SpotImages".preview = true 
                                LIMIT 1
                                )`), 'previewImage']  
                        ]
                    },
                    raw: true
                });
            } else { // production environment
                spots = await Spot.findAll({
                    where : {ownerId : user.id},
                    attributes: {
                        include: [
                            [literal(`(
                                SELECT AVG(stars) 
                                FROM "airbnb-db"."Reviews" 
                                WHERE "Reviews"."spotId" = "Spot".id
                                )`), 'avgRating'],  
                            [literal(`(
                                SELECT url 
                                FROM "airbnb-db"."SpotImages" 
                                WHERE "SpotImages"."spotId" = "Spot".id 
                                    AND "SpotImages".preview = true 
                                LIMIT 1
                                )`), 'previewImage']  
                        ]
                    },
                    raw: true
                });
                spots.map(spotObj => {
                    let updatedLat = spotObj.lat ? Number(spotObj.lat) : null
                    spotObj.lat = updatedLat
                    let updatedLng = spotObj.lng ? Number(spotObj.lng) : null
                    spotObj.lng = updatedLng
                    let updatedPrice = spotObj.price ? parseFloat(Number(spotObj.price).toFixed(2)) : null
                    spotObj.price = updatedPrice
                    let updatedAvgRate = spotObj.avgRating ? parseFloat(Number(spotObj.avgRating).toFixed(1)) : null
                    spotObj.avgRating = updatedAvgRate
                })
            }

            return res.status(200).json({Spots:spots})
        } catch (error) {
            console.error('Error details:', error.message);  
            console.error('Stack trace:', error.stack);  
            res.status(500).json({ error: 'An error occurred while fetching spots.' });
        }
    } else {
        res.status(401)
        return res.json({
            "message": "Authentication required"
          });
    }
})

router.post('/:spotId/reviews', validateReviewCreate, async (req, res) => {
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
        if(spotFound.dataValues.ownerId !== user.id){
            res.statusCode = 403
            return res.json({
                "message": "Forbidden"
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
        res.status(401)
        return res.json({
            "message": "Authentication required"
          });

    }


})



router.get('/:spotId', async(req, res) => {
    const spotById = await Spot.findAll({
        where: {
            id: parseInt(req.params.spotId)
        }
    })
    console.log(spotById)
    if(!spotById.length){
        res.statusCode = 404
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    const ownerId = spotById[0].dataValues.ownerId
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
        ...spotById[0].dataValues,
        SpotImages: imagesArr,
        Owner: owner
    }
    res.statusCode = 200
    return res.json(response)
})


router.put('/:spotId', validateSpot, async (req, res,next ) => {
    if(!req.user) {
        res.statusCode = 401;
        res.json({
            "message": "Authentication required"
          })
    } else {
        const spotId= parseInt(req.params.spotId);
        const targetSpot = await Spot.findByPk(spotId);
        
            if(!targetSpot) {
                res.status(404);
                return res.json({
                    "message": "Spot couldn't be found"
                })
            } else {
                if(targetSpot.dataValues.ownerId !== req.user.id){
                    res.statusCode = 403
                    return res.json({
                        "message": "Forbidden"
                      })
                }
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
    }
})

router.delete('/:spotId', async (req, res) => {
    const spotId = parseInt(req.params.spotId)
    if(!req.user){
        res.status(401)
        return res.json({
            "message": "Authentication required"
          })
    }
    else{
        const targetSpot = await Spot.findByPk(spotId);
        if(targetSpot.dataValues.ownerId !== req.user.id){
            res.statusCode = 403
            return res.json({
                "message": "Forbidden"
              })
        }
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




router.get('/', validateQuery, async (req,res) =>{
    try{
        let { page, size } = req.query


        page = parseInt(page);
        size = parseInt(size);


        if (Number.isNaN(page) || page <= 0) page = 1;
        if (Number.isNaN(size) || size <= 0) size = 20;




        const where = {}
        // creating the where clause from the querys in the url
        for(let query in req.query){

            if(query == 'minLat'){
                if(where.lat){
                    where.lat =  { [Op.between]: [req.query.minLat, req.query.maxLat]}
                }
                else{where.lat = {
                    [Op.gte]: req.query.minLat
                }}
            }
            else if(query == 'maxLat'){
                if(where.lat){
                    where.lat =  { [Op.between]: [req.query.minLat, req.query.maxLat]}
                }
                else{where.lat = {
                    [Op.lte]: req.query.maxLat
                }}
            }
            else if(query == 'minLng'){
                if(where.lng){
                    where.lng =  { [Op.between]: [req.query.minLng, req.query.maxLng]}
                }
                else{where.lng = {
                    [Op.gte]: req.query.minLng
                }}
            }
            else if(query == 'maxLng'){
                if(where.lng){
                    where.lng =  { [Op.between]: [req.query.minLng, req.query.maxLng]}
                }
                else{where.lng = {
                    [Op.lte]: req.query.maxLng
                }}


            }
            else if(query == 'minPrice'){
                if(where.price){
                    where.price =  { [Op.between]: [req.query.minPrice, req.query.maxPrice]}
                }
                else{where.price = {
                    [Op.gte]: req.query.minPrice
                }}
            }
            else if(query == 'maxPrice'){
                if(where.price){
                    where.price =  { [Op.between]: [req.query.minPrice, req.query.maxPrice]}
                }
                else{where.price = {
                    [Op.lte]: req.query.maxPrice
                }}


            }
        }

        let spots;

        if(environment==="development"){

            const query = {
                attributes: {
                    include: [
                        [literal(`(
                            SELECT AVG(stars) 
                            FROM "Reviews" 
                            WHERE "Reviews"."spotId" = Spot.id
                            )`), 'avgRating'],  
                        [literal(`(
                            SELECT url 
                            FROM "SpotImages" 
                            WHERE "SpotImages"."spotId" = Spot.id 
                                AND "SpotImages".preview = true 
                            LIMIT 1
                            )`), 'previewImage']  
                    ]
                },
                raw: true
            }

            query.where = where
            query.limit = size
            query.offset = size * (page - 1)


            spots = await Spot.findAll(query);

        } else { // production environment

            const query = {
                attributes: {
                    include: [
                        [literal(`(
                            SELECT AVG(stars) 
                            FROM "airbnb-db"."Reviews" 
                            WHERE "Reviews"."spotId" = "Spot".id
                            )`), 'avgRating'],  
                        [literal(`(
                            SELECT url 
                            FROM "airbnb-db"."SpotImages" 
                            WHERE "SpotImages"."spotId" = "Spot".id 
                                AND "SpotImages".preview = true 
                            LIMIT 1
                            )`), 'previewImage']  
                    ]
                },
                raw: true
            }

            query.where = where
            query.limit = size
            query.offset = size * (page - 1)

            spots = await Spot.findAll(query);

            console.log(spots)

            spots.map(spotObj => {
                let updatedLat = spotObj.lat ? Number(spotObj.lat) : null
                spotObj.lat = updatedLat
                let updatedLng = spotObj.lng ? Number(spotObj.lng) : null
                spotObj.lng = updatedLng
                let updatedPrice = spotObj.price ? parseFloat(Number(spotObj.price).toFixed(2)) : null
                spotObj.price = updatedPrice
                let updatedAvgRate = spotObj.avgRating ? parseFloat(Number(spotObj.avgRating).toFixed(1)) : null
                spotObj.avgRating = updatedAvgRate
            })


        }

        return res.status(200).json({
            Spots:spots,
            page: page,
            size: size

        })
    } catch (error) {
        console.error('Error details:', error.message);  
        console.error('Stack trace:', error.stack);  
        res.status(500).json({ error: 'An error occurred while fetching spots.' });
    }
})



router.post('/', validateSpot, async(req, res) => {
    const { user } = req;
    //const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (user) {
        const newSpot = await Spot.create({
            ownerId: user.id,
            ...req.body
        })
        res.status(201)
        return res.json(newSpot)
    } else {
        res.status(401)
        return res.json({
            "message": "Authentication required"
          });
    }

})


module.exports = router;