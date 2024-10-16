import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from "../../store/spots"

export default function ConfirmDeleteModal({ spot }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    
    const removeSpot = () => {
        dispatch(deleteSpotThunk(spot.id))
        closeModal()
    }
    return (
        <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <button onClick={removeSpot}>{`Yes (Delete Spot)`}</button>
        <button onClick={closeModal}>{`No (Keep Spot)`}</button>
        </>
    )
}