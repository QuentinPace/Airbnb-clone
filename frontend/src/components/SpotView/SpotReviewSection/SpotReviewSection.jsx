import './SpotReviewSection.css'
import { getAllReviewsOfSpotThunk, getReviewsOfCurrentThunk } from '../../../store/reviews'
import { getOneSpotThunk } from '../../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { BsStarFill } from "react-icons/bs";
import OpenModalButton from '../../OpenModalButton'
import PostReviewModal from '../../PostReviewModal'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'

export default function SpotReviewSection () {
    const sessionUser = useSelector(state => state.session.user);
    const months = ["Offset", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.spotReviews)
    const userReviews = useSelector(state => state.reviews.currentUser)
    const spot = useSelector(state => state.spots[0])
    const [needsRender, setNeedsRender] = useState(false)
    let spotId = spot.id

    const hasReviewButton = () => {
        const reviewIds = reviews.map(review => review.id)
        const userReviewIds = userReviews.map(review => review.id)
        if(!sessionUser){
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
        dispatch(getOneSpotThunk(spotId))

    }, [needsRender, spotId, dispatch])



    useEffect(() => {
        dispatch(getAllReviewsOfSpotThunk(spotId))
        if(sessionUser) {
            dispatch(getReviewsOfCurrentThunk())
        }
    }, [dispatch, spotId, sessionUser])

    const beTheFirstText = () => {
        if(!reviews.length && sessionUser){
            if(sessionUser.id !== spot.Owner.id){
                return (
                    <h3>Be the first to post a review!</h3>
                )
            }
        }
        return null
    }

    const ratingInfo = () => {
        if(!reviews.length){
            return (<><p><BsStarFill/>New</p></>)
        }
        else{
            return (<><p><BsStarFill/>{Number.isInteger(spot.avgStarRating) ? `${spot.avgStarRating}.0` : spot.avgStarRating}</p><span className='review-dot'>&middot;</span><p>{spot.numReviews} Review{spot.numReviews == 1 ? '' : 's'}</p></>)
        }
    }

    let sessionUserId = sessionUser ? sessionUser.id : null

    return (
        <>
            <div className='review-header'>{ratingInfo()}</div>
            { hasReviewButton() && <OpenModalButton
                buttonText="post Your review"
                modalComponent={<PostReviewModal  needsRender={needsRender} setNeedsRender={setNeedsRender} spot={spot}/>}
              />}
            <ul className='review-list'>
                {beTheFirstText()}
                {reviews.map(review => {
                    return (
                        <li key={review.id} className='review-spot-view'>
                            <h3>{review.User.firstName}</h3>
                            <h5 className='date-review'>{months[review.createdAt.substring(5, 7)]}, {review.createdAt.substring(0, 4)}</h5>
                            <p className='review-text-p' >{review.review}</p>
                            {review.User.id == sessionUserId ? <OpenModalButton
                            className='delete-review-li-button'
                            buttonText='Delete Review'
                            modalComponent={<ConfirmDeleteModal
                                needsRender={needsRender}
                                setNeedsRender={setNeedsRender}
                                review={review}/>}/> : null}
                        </li>
                    )
                })}
            </ul>
        </>
    )

}