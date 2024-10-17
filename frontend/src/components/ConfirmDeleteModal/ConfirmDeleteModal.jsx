import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from "../../store/spots"
import { deleteReviewThunk } from "../../store/reviews"

export default function ConfirmDeleteModal({ spot, review, setNeedsRender, needsRender }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    
    const removeClick = async () => {
        //closeModal()
        if(review){
            console.log(setNeedsRender)
            await dispatch(deleteReviewThunk(review))
            await setNeedsRender(!needsRender)
        }
        else {
            await dispatch(deleteSpotThunk(spot.id))
        }
        await closeModal()
    }
    return (
        <>
        <h1>Confirm Delete</h1>
            <h2>{`Are you sure you want to ${review ? 'delete this review' : 'remove this spot from the listings'}?`}</h2>
        <button onClick={removeClick}>{`Yes (Delete ${review ? 'Review' : 'Spot'})`}</button>
        <button onClick={closeModal}>{`No (Keep ${review ? 'Review' : 'Spot'})`}</button>
        </>
    )
}