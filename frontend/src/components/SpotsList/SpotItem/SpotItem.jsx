import './SpotItem.css'
import OpenModalButton from '../../OpenModalButton'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOneSpotThunk } from '../../../store/spots'
import { BsStarFill } from "react-icons/bs";

export default function SpotItem({ spot, onClick, manageSpotsPage }) {
    const dispatch = useDispatch()
    const rating = spot.avgRating ? spot.avgRating.toString() : 'New'
    const navigate = useNavigate()

    const getUpdatedSpot = async () => {
        await dispatch(getOneSpotThunk(spot.id))
    }

    return (
        <div data-testid='spot-tile' onClick={() => onClick(spot.id)} className={`spot-item`}>
            <span className="tooltip">{spot.name}</span>
            <div data-testid='spot-thumbnail-image' className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div data-testid='spot-link' className='spot-info'>
                <div className='location-review-container'>
                    <p data-tesid='spot-city'>{`${spot.city},${spot.state}`}</p>
                    <p data-testid='spot-rating'><BsStarFill />{rating.length > 1 ? `${rating[0]}.0` : rating + '.0'}</p>
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