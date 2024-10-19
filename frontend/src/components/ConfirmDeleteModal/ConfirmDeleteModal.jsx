import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from "../../store/spots"
import { deleteReviewThunk } from "../../store/reviews"
import './ConfirmDeleteModal.css'

export default function ConfirmDeleteModal({ spot, review, setNeedsRender, needsRender }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    
    const removeClick = async () => {
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
               <h4 className='are-you-sure-text'>{`Are you sure you want to ${review ? 'delete this review' : 'remove this spot'}?`}</h4>
            <div className='delete-button-container'>
                <button className='confirm-delete-button' onClick={removeClick}>{`Yes (Delete ${review ? 'Review' : 'Spot'})`}</button>
                <button className='keep-button' onClick={closeModal}>{`No (Keep ${review ? 'Review' : 'Spot'})`}</button>
            </div>
        </>
    )
}