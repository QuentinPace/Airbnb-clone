import StarRatingInput from "./StarRatingInput"
import './PostReviewModal.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

export default function PostReviewModal({spot, setNeedsRender}) {
    const spotId = spot.id
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('')
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const submitReview = async () => {
        //e.preventDefault()
        const newReview = {
            rating,
            reviewText,
            spotId
        }
        await dispatch(createReviewThunk(newReview))
        setNeedsRender(true)
        closeModal()    }

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
            <textarea
            placeholder='Leave your review here...'
            onChange={e => setReviewText(e.target.value)}/>
            <StarRatingInput 
            onChange={onChange}
            rating={rating}/>
            <button disabled={disabled} onClick={submitReview}>Submit Your Review</button>
        </>
    )
}