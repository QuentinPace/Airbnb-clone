import { useParams } from "react-router-dom"

export default function SpotView () {
    const { spotId } = useParams()
    return (
        <h5>in spotView {spotId}</h5>
    )
}