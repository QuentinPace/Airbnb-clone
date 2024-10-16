import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { getCurrentSpotsThunk } from "../../store/spots";

export default function ManageSpots() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
        
    }, [dispatch])
    return (
        <h1>my spots boiiiii</h1>
    )
}