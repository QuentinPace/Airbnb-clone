import './SpotReviewSection.css'
import { getAllReviewsOfSpotThunk } from '../../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function SpotReviewSection ({spot}) {
    const months = ["Offset", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(getAllReviewsOfSpotThunk(spot.id))
    }, [dispatch])

    console.log(reviews)

    if(reviews.length === 0) return (<></>)
    

    return (
        <>
            <div className='review-header'><p>*{spot.avgStarRating}</p><p>{spot.numReviews} Reviews</p></div>
            <ul>
                {reviews.map(review => {
                    return (
                        <li key={review.id} className='review-spot-view'>
                            <h4>{review.User.firstName}</h4>
                            <h5>{months[review.createdAt.substring(5, 7)]}, {review.createdAt.substring(0, 4)}</h5>
                            <p>{review.review}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )

}