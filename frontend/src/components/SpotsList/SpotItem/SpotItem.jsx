import './SpotItem.css'
import OpenModalButton from '../../OpenModalButton'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'

export default function SpotItem({ spot, onClick, manageSpotsPage }) {
    const rating = spot.avgRating ? spot.avgRating : 'New'

    return (
        <div onClick={() => onClick(spot.id)} className={`spot-item`}>
            <div className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div className='spot-info'>
                <p>{`${spot.city},${spot.state}`}</p>
                <p>{`*${rating}`}</p>
                <p>{`$${spot.price} Night`}</p>
            </div>
            {manageSpotsPage && <div className='manage-spot-buttons-container'>
                <OpenModalButton 
                buttonText="delete"
                modalComponent={<ConfirmDeleteModal spot={spot}/>}/>
                <button>update</button>
            </div>}
        </div>
    )
}