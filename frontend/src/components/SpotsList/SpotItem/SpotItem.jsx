import './SpotItem.css'
import { useNavigate } from 'react-router-dom'

export default function SpotItem({ spot }) {
    const rating = spot.avgRating ? spot.avgRating : 'New'
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`spots/${spot.id}`)
    }
    return (
        <div onClick={onClick} className={`spot-item`}>
            <div className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div className='spot-info'>
                <p>{`${spot.city},${spot.state}`}</p>
                <p>{`*${rating}`}</p>
                <p>{`$${spot.price} Night`}</p>
            </div>
        </div>
    )
}