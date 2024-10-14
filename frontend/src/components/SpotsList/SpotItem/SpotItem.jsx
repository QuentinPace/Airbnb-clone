import './SpotItem.css'
import { useNavigate } from 'react-router-dom'

export default function SpotItem({ spot }) {
    const rating = spot.avgRating ? spot.avgRating : 'N/A'
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`spots/${spot.id}`)
    }
    return (
        <div className={`spot-item${spot.id}`}>
            <div className='spot-item-image' onClick={onClick} style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div className='spot-info'>
                <p>{`${spot.city},${spot.state}`}</p>
                <p>{`*${rating}`}</p>
                <p>{`$${spot.price} Night`}</p>
            </div>
        </div>
    )
}