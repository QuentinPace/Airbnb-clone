import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

export default function SpotView () {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(store => store.spots[0])

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))

    }, [dispatch])
    console.log(spot)
    return (
        <h5>in spotView {spotId}</h5>
    )
}