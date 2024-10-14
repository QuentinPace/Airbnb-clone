import './SpotItem.css'
export default function SpotItem({ spot }) {
    return (
        <div className='spot-item' style={{'backgroundImage': `url("${spot.previewImage}")`}}>
            <h2>{spot.name}</h2>
        </div>
    )
}