import { useEffect, useState } from "react"

 export default function SpotForm () {
    const [hasBeenClicked, setHasBeenClicked] = useState(false)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    //const [lat, setLat] = useState('')
    //const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [images, setImages] = useState(['', '', '', ''])
    const [validations, setValidations] = useState({ images: []})


    const handleSubmit = e => {
        e.preventDefault()
        if(!hasBeenClicked){
            setHasBeenClicked(true)
        }

    }

    useEffect(() => {
        const errors = {
            images: []
        }
        if(hasBeenClicked){
            if(!country.length) errors.country = 'Country is required'
            if(!city.length) errors.city = 'City is required'
            if(!state.length) errors.state = 'State is required'
            if(!description.length) errors.description = 'Description is required'
            if(!title.length) errors.title = 'Title is required'
            if(!price.length) errors.price = 'Price is required'
            if(!previewImg.length) {
                errors.previewImg = 'Preview image is required'
            }
            else if(!(previewImg.endsWith('.png') || previewImg.endsWith('.jpg') || previewImg.endsWith('.jpeg'))){
                errors.previewImg = 'Preview image URL must end in .png, .jpg, or .jpeg'
            }
            for(let i = 0; i < 4; i++){
                let url = images[i]
                if(url){
                    if(url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')){
                        errors.images.push(false)
                    }
                    else{
                        errors.images.push(true)
                    }
                }
                else{
                    errors.images.push(false)
                }
            }
            setValidations(errors)
        }
    }, [country, state, city, description, title, price, previewImg, images, setValidations, hasBeenClicked])

    return (
        <form onSubmit={handleSubmit}>
            {validations.title && <p>{validations.title}</p>}
            <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='title'
            ></input>
            {validations.country && <p>{validations.country}</p>}
            <input
            onChange={(e) => setCountry(e.target.value)}
            type='text'
            placeholder='country'
            ></input>
            {validations.state && <p>{validations.state}</p>}
            <input
            onChange={(e) => setState(e.target.value)}
            type='text'
            placeholder='state'
            ></input>
            {validations.city && <p>{validations.city}</p>}
            <input
            onChange={(e) => setCity(e.target.value)}
            type='text'
            placeholder='city'
            ></input>
            {/* <input
            onChange={(e) => setLat(e.target.value)}
            type='text'
            placeholder='latitude'
            ></input>
            <input
            onChange={(e) => setLng(e.target.value)}
            type='text'
            placeholder='longitude'
            ></input> */}
            {validations.description && <p>{validations.description}</p>}
            <input
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='description'
            ></input>
            {validations.price && <p>{validations.price}</p>}
            <input
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            placeholder='price'
            ></input>
            {validations.previewImg && <p>{validations.previewImg}</p>}
            <input
            onChange={(e) => setPreviewImg(e.target.value)}
            type='text'
            placeholder='preview image url'
            ></input>
            {validations.images[0] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[0] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            ></input>
            {validations.images[1] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[1] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            ></input>
            {validations.images[2] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[2] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            ></input>
            {validations.images[3] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[3] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            ></input>
            <button type='submit'>Create Spot</button>
        </form>
    )
 }