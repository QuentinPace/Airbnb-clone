import { getAllSpotsThunk } from "../../store/spots"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function SpotsList() {
    const dispatch = useDispatch()
    const spotsArr = useSelector(store => store.spots)


    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <></>
    )
}