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
        hasBeenClicked = true

    }

    useEffect(() => {
        if(hasBeenClicked){
            console.log('booyah')
        }
    }, [country, state, city, lat, lng, description, title, price, previewImg, images])

    return (
        <form onSubmit={handleSubmit}>
            <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='title'
            ></input>
            <input
            onChange={(e) => setCountry(e.target.value)}
            type='text'
            placeholder='country'
            ></input>
            <input
            onChange={(e) => setState(e.target.value)}
            type='text'
            placeholder='state'
            ></input>
            <input
            onChange={(e) => setCity(e.target.value)}
            type='text'
            placeholder='city'
            ></input>
            <input
            onChange={(e) => setLat(e.target.value)}
            type='text'
            placeholder='latitude'
            ></input>
            <input
            onChange={(e) => setLng(e.target.value)}
            type='text'
            placeholder='longitude'
            ></input>
            <input
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='description'
            ></input>
            <input
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            placeholder='price'
            ></input>
            <input
            onChange={(e) => setPreviewImg(e.target.value)}
            type='text'
            placeholder='preview image url'
            ></input>
            <input
            onChange={(e) => setImages([...images, e.target.value])}
            type='text'
            placeholder='image url'
            ></input>
            <input
            onChange={(e) => setImages([...images, e.target.value])}
            type='text'
            placeholder='image url'
            ></input>
            <input
            onChange={(e) => setImages([...images, e.target.value])}
            type='text'
            placeholder='image url'
            ></input>
            <input
            onChange={(e) => setImages([...images, e.target.value])}
            type='text'
            placeholder='image url'
            ></input>
            <button type='submit'>Create Spot</button>
        </form>
    )
 }