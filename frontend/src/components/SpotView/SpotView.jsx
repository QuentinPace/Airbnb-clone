import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import SpotImages from './SpotImages'

export default function SpotView () {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(store => store.spots[0])

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))

    }, [dispatch])

    if(!spot){
        return (
            <></>
        )
    }
    return (
        <main>
            <h1>{spot.name}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <SpotImages spotImages={spot.SpotImages}/>
        </main>
    )
}