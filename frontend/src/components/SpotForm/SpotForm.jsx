import { useEffect, useState } from "react"

 export default function SpotForm () {
    let hasBeenClicked = false
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [images, setImages] = useState([])
    const [vaidations, setValidations] = useState({})


    const handleSubmit = e => {
        e.preventDefault()
        hasBeenClicked= true

    }

    useEffect(() => {
        if(hasBeenClicked){

        }

    }, [country, state, city, lat, lng, description, title, price, previewImg, images])

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='dookie'
            ></input>
            <button type='submit'>Create Spot</button>
        </form>
    )
 }