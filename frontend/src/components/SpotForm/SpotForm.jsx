import { useEffect, useState } from "react"
import './SpotForm.css'
import { createSpotThunk } from "../../store/spots"
import { getOneSpotThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

 export default function SpotForm ({ updateForm }) {
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const [country, setCountry] = useState('')
    const [hasBeenClicked, setHasBeenClicked] = useState(false)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [address, setAddress] = useState('')
    const [images, setImages] = useState([])
    const [validations, setValidations] = useState({ images: []})
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const spot = useSelector(state => state.spots[0])
    console.log(spot)




    useEffect(()=> {
        if(updateForm && !spot){
            dispatch(getOneSpotThunk(spotId))
        }
    }, [dispatch])

    let defaultImageVals = ['', '', '', '']

    if(spot && updateForm){
        for(let i = 0; i < spot.SpotImages.length; i++){
            if(!spot.SpotImages[i].preview)defaultImageVals[i] = spot.SpotImages[i].url
        }
    }

    const defaultVals = {
        name: spot && updateForm ? spot.name : '',
        country: spot && updateForm ? spot.country : '',
        state: spot && updateForm ? spot.state : '',
        city: spot && updateForm ? spot.city : '',
        description: spot && updateForm ? spot.description : '',
        price: spot && updateForm ? spot.price : '',
        address: spot && updateForm ? spot.address : '',
        defaultImageVals,
        preview: spot && updateForm ? spot.SpotImages.find(img => img.preview).url : ''
    }

    

    const hasImageErrors = () => {
        let bool = false
        validations.images.forEach(hasError => {
            if(hasError){
                bool = true
            }
        })
        return bool
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(!hasBeenClicked){
            setHasBeenClicked(true)
        }
        if(Object.keys(validations).length === 1 && !hasImageErrors()){
            const newSpot = {
                address,
                city,
                state,
                country,
                name: title,
                description,
                price: Number(price)
            }
            const validImages = images.filter(url => url)
            const id =  await dispatch(createSpotThunk(newSpot, previewImg, validImages))
            navigate(`/spots/${id}`)
        }

    }

    const validateForm = () => {
        const errors = {
            images: []
        }
        if(!country.length) errors.country = 'Country is required'
        if(!address.length) errors.address = 'Address is required'
        if(!city.length) errors.city = 'City is required'
        if(!state.length) errors.state = 'State is required'
        if(!description.length) errors.description = 'Description is required'
        else if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!title.length) errors.title = 'Title is required'
        if(!price.length) errors.price = 'Price is required'
        else if(isNaN(price)) errors.price = 'Price must be as valid number'
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
        setValidations(errors)
        }

    }
    console.log(defaultVals)
    console.log(country)

    useEffect(() => {
        validateForm()
    }, [country, state, city, description, title, price, previewImg, images, address, setValidations, hasBeenClicked])


    return (
        <form className='create-spot-form' onSubmit={handleSubmit}>
            {hasBeenClicked && validations.title && <p>{validations.title}</p>}
            <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='title'
            defaultValue={defaultVals.name}
            ></input>
            {hasBeenClicked && validations.country && <p>{validations.country}</p>}
            <input
            onChange={(e) => setCountry(e.target.value)}
            type='text'
            placeholder='country'
            defaultValue={defaultVals.country}
            ></input>
            {hasBeenClicked && validations.address && <p>{validations.address}</p>}
            <input
            onChange={(e) => setAddress(e.target.value)}
            type='text'
            placeholder='address'
            defaultValue={defaultVals.address}
            ></input>
            {hasBeenClicked && validations.state && <p>{validations.state}</p>}
            <input
            onChange={(e) => setState(e.target.value)}
            type='text'
            placeholder='state'
            defaultValue={defaultVals.state}
            ></input>
            {hasBeenClicked && validations.city && <p>{validations.city}</p>}
            <input
            onChange={(e) => setCity(e.target.value)}
            type='text'
            placeholder='city'
            defaultValue={defaultVals.city}
            ></input>
            {hasBeenClicked && validations.description && <p>{validations.description}</p>}
            <input
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='description'
            defaultValue={defaultVals.description}
            ></input>
            {hasBeenClicked && validations.price && <p>{validations.price}</p>}
            <input
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            placeholder='price'
            defaultValue={defaultVals.price}
            ></input>
            {hasBeenClicked && validations.previewImg && <p>{validations.previewImg}</p>}
            <input
            onChange={(e) => setPreviewImg(e.target.value)}
            type='text'
            placeholder='preview image url'
            defaultValue={defaultVals.preview}
            ></input>
            {hasBeenClicked && validations.images[0] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[0] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            defaultValue={defaultVals.defaultImageVals[0]}
            ></input>
            {hasBeenClicked && validations.images[1] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[1] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            defaultValue={defaultVals.defaultImageVals[1]}
            ></input>
            {hasBeenClicked && validations.images[2] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[2] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            defaultValue={defaultVals.defaultImageVals[2]}
            ></input>
            {hasBeenClicked && validations.images[3] && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
            <input
            onChange={(e) => {
                images[3] = e.target.value
                setImages([...images])}}
            type='text'
            placeholder='image url'
            defaultValue={defaultVals.defaultImageVals[3]}
            ></input>
            <button type='submit'>Create Spot</button>
        </form>
    )
 }