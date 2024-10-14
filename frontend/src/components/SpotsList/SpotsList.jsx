import { getAllSpotsThunk } from "../../store/spots"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpotItem from "./SpotItem"
import './SpotList.css'

export default function SpotsList() {
    const dispatch = useDispatch()
    const spotsArr = useSelector(store => store.spots)


    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <main className='all-spots-container'>
        {spotsArr.map((spot) => {
            return (
                <SpotItem spot={spot} key={spot.id}/>
            )
        })}
        </main>
    )
}