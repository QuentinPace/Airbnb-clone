import { getAllSpotsThunk } from "../../store/spots"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpotItem from "./SpotItem"
import './SpotList.css'
import { useNavigate } from "react-router-dom"

export default function SpotsList() {
    const dispatch = useDispatch()
    const spotsArr = useSelector(store => store.spots)
    const navigate = useNavigate()
    const onClick = (spotId) => {
        navigate(`spots/${spotId}`)
    }


    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <main data-testid='spots-list' className='all-spots-container'>
        {spotsArr.map((spot) => {
            return (
                <SpotItem spot={spot} onClick={onClick} key={spot.id}/>
            )
        })}
        </main>
    )
}