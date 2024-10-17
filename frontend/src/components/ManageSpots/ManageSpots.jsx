import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSpotsThunk } from "../../store/spots";
import SpotItem from "../SpotsList/SpotItem";
import { useNavigate } from "react-router-dom";

export default function ManageSpots() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentSpots = useSelector(store => store.spots)

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
    }, [dispatch])

    const onClickSpot = spotId => {
        navigate(`/spots/${spotId}`)
    }

    const onClickCreate = () => {
        navigate('/spots/new')
    }

    return (
        <>
            <h1>Manage Spots</h1>
            <main className='all-spots-container'>
                {currentSpots.map((spot) => {
                return (
                    <SpotItem manageSpotsPage={true} onClick={e => onClickSpot(spot.id)} spot={spot} key={spot.id}/>
                )
            })}
            {!currentSpots.length && <button onClick={onClickCreate}>Create a Spot</button>}
            </main>
        </>
    )
}