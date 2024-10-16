import './SpotReviewSection.css'
import { getAllReviewsOfSpotThunk, getReviewsOfCurrentThunk } from '../../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import OpenModalButton from '../../OpenModalButton'
import PostReviewModal from '../../PostReviewModal'

export default function SpotReviewSection ({spot}) {
    const sessionUser = useSelector(state => state.session.user);
    const months = ["Offset", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.spotReviews)
    const userReviews = useSelector(state => state.reviews.currentUser)
    const spotId = spot.id

    const hasReviewButton = () => {
        const reviewIds = reviews.map(review => review.id)
        const userReviewIds = userReviews.map(review => review.id)
        if(!sessionUser || !userReviews.length){
            return false
        }
        if(sessionUser.id === spot.ownerId){
            return false
        }
        for(let i = 0; i < userReviews.length; i++){
            if(reviewIds.includes(userReviewIds[i])) return false
        }
        return true
    }

    useEffect(() => {
        dispatch(getAllReviewsOfSpotThunk(spotId))
        if(sessionUser) {
            dispatch(getReviewsOfCurrentThunk())
        }
    }, [dispatch, spotId, sessionUser])

    return (
        <>
            <div className='review-header'><p>*{spot.avgStarRating}</p><p>{spot.numReviews} Reviews</p></div>
            { hasReviewButton() && <OpenModalButton
                buttonText="post a review"
                modalComponent={<PostReviewModal spot={spot}/>}
              />}
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