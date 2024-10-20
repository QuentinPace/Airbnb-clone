import StarRatingInput from "./StarRatingInput"
import './PostReviewModal.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

export default function PostReviewModal({spot, setNeedsRender, needsRender}) {
    const spotId = spot.id
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const submitReview = async () => {
        const newReview = {
            rating,
            reviewText,
            spotId
        }
        const error = await dispatch(createReviewThunk(newReview))
        if(error){
            setErrorMessage(error)
            return
        }
        setNeedsRender(!needsRender)
        closeModal()    
    }

    useEffect(() => {
        if(rating === 0 || reviewText.length < 10) {
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }, [rating, reviewText, setDisabled])


    const onChange = (number) => {
        setRating(parseInt(number));
    };

    return (
        <>
            <h1>How was your stay?</h1>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <div className='text-area-container'>
                <textarea
                placeholder='Leave your review here...'
                onChange={e => setReviewText(e.target.value)}/>
            </div>
            <StarRatingInput 
            onChange={onChange}
            rating={rating}/>
            <div className='submit-review-button-container'>
                <button className='submit-review' disabled={disabled} onClick={submitReview}>Submit Your Review</button>
            </div>
        </>
    )
}