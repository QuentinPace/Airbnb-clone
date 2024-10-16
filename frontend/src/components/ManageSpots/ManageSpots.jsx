import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSpotsThunk } from "../../store/spots";
import SpotItem from "../SpotsList/SpotItem";

export default function ManageSpots() {
    const dispatch = useDispatch()
    const currentSpots = useSelector(store => store.spots)

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
        
    }, [dispatch])

    const onClick = spotId => {
        console.log(spotId)
    }

    return (
        <main className='all-spots-container'>
            {currentSpots.map((spot) => {
            return (
                <SpotItem manageSpotsPage={true} onClick={e => onClick(spot.id)} spot={spot} key={spot.id}/>
            )
        })}
        </main>
    )
}