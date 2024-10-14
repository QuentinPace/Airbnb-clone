import './SpotItem.css'
export default function SpotItem({ spot }) {
    const rating = spot.avgRating ? spot.avgRating : 'N/A'
    console.log(spot)
    return (
        <div className='spot-item'>
            <div className='spot-item-image' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            </div>
            <div className='spot-info'>
                <p>{`${spot.city},${spot.state}`}</p>
                <p>{rating}</p>
                <p>{`$${spot.price} Night`}</p>

            </div>

        </div>
    )
}