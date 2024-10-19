import './SpotItem.css'
import OpenModalButton from '../../OpenModalButton'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOneSpotThunk } from '../../../store/spots'
import { BsStarFill } from "react-icons/bs";
import { useState } from 'react'

export default function SpotItem({ spot, onClick, manageSpotsPage }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const rating = spot.avgRating ? spot.avgRating : 'New'
    const navigate = useNavigate()
    const getUpdatedSpot = async () => {
        await dispatch(getOneSpotThunk(spot.id))
    }

    return (
        // <div  onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} data-testid='spot-link'>
        <div data-testid='spot-tile' onClick={() => onClick(spot.id)} className={`spot-item`}>
            <span class="tooltip">{spot.name}</span>
            <div data-testid='spot-thumbnail-image' className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div data-testid='spot-link' className='spot-info'>
                <div className='location-review-container'>
                    <p data-tesid='spot-city'>{`${spot.city},${spot.state}`}</p>
                    <p data-testid='spot-rating'><BsStarFill />{`${Number.isInteger(rating) ? `${rating}.0` : rating}`}</p>
                </div>
                <p data-testid='spot-price'>{`$${spot.price} night`}</p>
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
        // </div>
    )
}