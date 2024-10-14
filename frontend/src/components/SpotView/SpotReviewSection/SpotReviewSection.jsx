import './SpotReviewSection.css'
export default function SpotReviewSection ({spot}) {
    return (
        <>
            <div className='review-header'><p>*{spot.avgStarRating}</p><p>{spot.numReviews} Reviews</p></div>
            {/* <ul>
                {spot}
            </ul> */}
        </>
    )

}