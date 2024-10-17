import './SpotItem.css'
import OpenModalButton from '../../OpenModalButton'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOneSpotThunk } from '../../../store/spots'
import { BsStarFill } from "react-icons/bs";

export default function SpotItem({ spot, onClick, manageSpotsPage }) {
    const dispatch = useDispatch()
    const rating = spot.avgRating ? spot.avgRating : 'New'
    const navigate = useNavigate()
    const getUpdatedSpot = async () => {
        await dispatch(getOneSpotThunk(spot.id))
    }

    return (
        <div onClick={() => onClick(spot.id)} className={`spot-item`}>
            <div className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div className='spot-info'>
                <div className='location-review-container'>
                    <p>{`${spot.city},${spot.state}`}</p>
                    <p><BsStarFill />{`${rating}`}</p>
                </div>
                <p>{`$${spot.price} Night`}</p>
            </div>
            {manageSpotsPage && <div className='manage-spot-buttons-container'>
                <OpenModalButton 
                buttonText="delete"
                modalComponent={<ConfirmDeleteModal spot={spot}/>}/>
                <button onClick={() => {
                    (getUpdatedSpot()).then(() => navigate(`/spots/${spot.id}/edit`))
                    }}>update</button>
            </div>}
        </div>
    )
}