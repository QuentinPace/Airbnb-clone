import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import SpotImages from './SpotImages'
import { BsStarFill } from "react-icons/bs";
import SpotReviewSection from "./SpotReviewSection"
import './SpotView.css'

export default function SpotView () {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(store => store.spots[0])

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))

    }, [dispatch, spotId])

    if(!spot) return (<></>)
    if(!spot.Owner) return (<></>)

     const onClick = () => {
        alert("Feature coming soon")
     }

    return (
        <main>
            <h1>{spot.name}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <SpotImages spotImages={spot.SpotImages}/>
            <div className='spot-details-reserve-container'>
                <div className='spot-view-info'>
                    <h2>Hosted By {spot.Owner.firstName}, {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='reserve-button-container'>
                    <div className='review-price-button-text'>
                        <p>${spot.price} Night</p>
                        <p><BsStarFill/>{spot.avgStarRating}</p>
                        <p>{spot.numReviews} Reviews</p>
                    </div>
                    <button onClick={onClick}>Reserve</button>

                </div>
            </div>
            <SpotReviewSection spot={spot}/>
        </main>
    )
}