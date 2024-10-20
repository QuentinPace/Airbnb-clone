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

     const ratingInfo = () => {
        if(!spot.numReviews){
            return (<div className='rating-info'><BsStarFill/><p className='res-review-text'>New</p></div>)
        }
        else{
            return (<div className='rating-info'><p><BsStarFill/>{Number.isInteger(spot.avgStarRating) ? `${spot.avgStarRating}.0` : spot.avgStarRating}</p><span className='review-dot'>&middot;</span><p>{spot.numReviews} Review{spot.numReviews == 1 ? '' : 's'}</p></div>)
        }
    }

    return (
        <main className='spot-view-main'>
            <h1 data-testid='spot-name'>{spot.name}</h1>
            <h3 data-testid='spot-location'>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
            <SpotImages spotImages={spot.SpotImages}/>
            <div className='spot-details-reserve-container'>
                <div className='spot-view-info'>
                    <h2 data-testid='spot-host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p data-testid='spot-description'>{spot.description}</p>
                </div>
                <div data-testid='spot-callout-box' className='reserve-container'>
                    <div className='review-price-button-text'>
                        <div className='per-night-button-text'><p data-testid='spot-price'>${spot.price} night</p></div>
                        {ratingInfo()}
                    </div>
                    <div className='reserve-button-container'>
                        <button data-testid='reserve-button' className='reserve-button' onClick={onClick}>Reserve</button>
                    </div>

                </div>
            </div>
            <SpotReviewSection spot={spot}/>
        </main>
    )
}