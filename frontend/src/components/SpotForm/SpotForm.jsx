import { useCallback, useEffect, useState } from "react"
import './SpotForm.css'
import { createSpotThunk, editSpotThunk } from "../../store/spots"
import { getOneSpotThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

 export default function SpotForm ({ updateForm }) {
    const spot = useSelector(state => state.spots[0])
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const [country, setCountry] = useState('')
    const [countryUpdated, setCountryUpdated] = useState(false)
    const [hasBeenClicked, setHasBeenClicked] = useState(false)
    const [state, setState] = useState('')
    const [stateUpdated, setStateUpdated] = useState(false)
    const [city, setCity] = useState('')
    const [cityUpdated, setCityUpdated] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionUpdated, setDescriptionUpdated] = useState(false)
    const [price, setPrice] = useState('')
    const [priceUpdated, setPriceUpdated] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    //const [previewImgUpdated, setPreviewImgUpdated] = useState(false)
    const [address, setAddress] = useState('')
    const [addressUpdated, setAddressUpdated] = useState(false)
    const [images, setImages] = useState([])
    const [imagesUpdated, setImagesUpdated] = useState([false, false, false, false])
    const [validations, setValidations] = useState({ images: []})
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [titleUpdated, setTitleUpdated] = useState(false)




    useEffect(()=> {
        if(updateForm && !spot){
            dispatch(getOneSpotThunk(spot.id))
        }
    }, [dispatch, spot, updateForm])

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
            if(updateForm){
                const updatedSpotObj = {
                    description: descriptionUpdated ? description : spot.description,
                    state: stateUpdated ? state : spot.state,
                    country: countryUpdated ? country : spot.country,
                    city: cityUpdated ? city : spot.city,
                    price: priceUpdated ? Number(price) : spot.price,
                    address: addressUpdated ? address : spot.address,
                    name: titleUpdated ? title : spot.name
                }
                const id = await dispatch(editSpotThunk(updatedSpotObj, spotId))
                navigate(`/spots/${id}`)
            }
            else{
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

    }

    const validateForm = useCallback(() => {
        let errors = {
            images: []
        }
        if(updateForm) {
            if(descriptionUpdated){
                if(!description.length) errors.description = 'Description is required'
                else if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters' 
            }
            if(stateUpdated)if(!state.length) errors.state = 'State is required'
            if(cityUpdated)if(!city.length) errors.city = 'City is required'
            if(priceUpdated){
                if(!price.length) errors.price = 'Price is required'
                else if(isNaN(price)) errors.price = 'Price must be as valid number'
            }
            if(addressUpdated)if(!address.length) errors.address = 'Address is required'
            if(countryUpdated)if(!country.length) errors.country = 'Country is required'
            if(titleUpdated)if(!title.length) errors.title = 'Title is required'
        }
        else{
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
            }
        }
        setValidations(errors)
    }, [country, state, city, description, title, price, previewImg, images, address, setValidations, descriptionUpdated, stateUpdated, cityUpdated, priceUpdated, addressUpdated, countryUpdated, titleUpdated, updateForm])

    useEffect(() => {
        validateForm()
    }, [validateForm])


    return (
        <form className='create-spot-form' onSubmit={handleSubmit}>
            <h1>{updateForm ? 'Update Your Spot' : 'Create a Spot'}</h1>
            <div>
                <h2>Where&apos;s your place located?</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>
                <section>
                    {hasBeenClicked && validations.country && <p>{validations.country}</p>}
                    {hasBeenClicked && validations.address && <p>{validations.address}</p>}
                    {hasBeenClicked && validations.city && <p>{validations.city}</p>}
                    {hasBeenClicked && validations.state && <p>{validations.state}</p>}
                </section>
                <input
                onChange={(e) => {
                    setCountryUpdated(true)
                    setCountry(e.target.value)}}
                type='text'
                placeholder='country'
                defaultValue={defaultVals.country}
                ></input>
                <input
                onChange={(e) => {
                    setAddressUpdated(true)
                    setAddress(e.target.value)}}
                type='text'
                placeholder='address'
                defaultValue={defaultVals.address}
                ></input>
                <input
                onChange={(e) => {
                    setCityUpdated(true)
                    setCity(e.target.value)}}
                type='text'
                placeholder='city'
                defaultValue={defaultVals.city}
                ></input>
                <input
                onChange={(e) => {
                    setStateUpdated(true)
                    setState(e.target.value)}}
                type='text'
                placeholder='state'
                defaultValue={defaultVals.state}
                ></input>


            </div>
            <div>
                <h2>Describe your place to guests</h2>
                <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>
                <section>
                    {hasBeenClicked && validations.description && <p>{validations.description}</p>}
                </section>
                <input className="description-input"
                onChange={(e) => {
                    setDescriptionUpdated(true)
                    setDescription(e.target.value)}}
                type='text-area'
                placeholder='description'
                defaultValue={defaultVals.description}
                ></input>
            </div>
            <div>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests&apos; attention with a spot title that highlights what makes your place special</h3>
                <section>
                    {hasBeenClicked && validations.title && <p>{validations.title}</p>}
                </section>
                <input
                onChange={(e) => {
                    setTitleUpdated(true)
                    setTitle(e.target.value)}}
                type='text'
                placeholder='title'
                defaultValue={defaultVals.name}
                ></input>
            </div>
            <div>
                <h2>Set a base price for your spot</h2>
                <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                <section>
                    {hasBeenClicked && validations.price && <p>{validations.price}</p>}
                </section>
                <input
                onChange={(e) => {
                    setPriceUpdated(true)
                    setPrice(e.target.value)}}
                type='text'
                placeholder='price'
                defaultValue={defaultVals.price}
                ></input>
            </div>
            { !updateForm && <div>
                <h2>Liven up your spot with photos</h2>
                <h3>Submit a link to at least one photo to publish your spot.</h3>
                <section>
                    {hasBeenClicked && validations.previewImg && <p>{validations.previewImg}</p>}
                    {hasBeenClicked && (validations.images[0] || validations.images[1] || validations.images[2] || validations.images[3]) && <p>Image URL must end in .png, .jpg, or .jpeg</p>}
                </section>
                <input
                onChange={(e) => {
                    //setPreviewImgUpdated(true)
                    setPreviewImg(e.target.value)}}
                type='text'
                placeholder='preview image url'
                defaultValue={defaultVals.preview}
                ></input>
                <input
                onChange={(e) => {
                    imagesUpdated[0] = true
                    setImagesUpdated([...imagesUpdated])
                    images[0] = e.target.value
                    setImages([...images])}}
                type='text'
                placeholder='image url'
                defaultValue={defaultVals.defaultImageVals[0]}
                ></input>
                <input
                onChange={(e) => {
                    imagesUpdated[1] = true
                    setImagesUpdated([...imagesUpdated])
                    images[1] = e.target.value
                    setImages([...images])}}
                type='text'
                placeholder='image url'
                defaultValue={defaultVals.defaultImageVals[1]}
                ></input>
                <input
                onChange={(e) => {
                    imagesUpdated[2] = true
                    setImagesUpdated([...imagesUpdated])
                    images[2] = e.target.value
                    setImages([...images])}}
                type='text'
                placeholder='image url'
                defaultValue={defaultVals.defaultImageVals[2]}
                ></input>
                <input
                onChange={(e) => {
                    imagesUpdated[3] = true
                    setImagesUpdated([...imagesUpdated])
                    images[3] = e.target.value
                    setImages([...images])}}
                type='text'
                placeholder='image url'
                defaultValue={defaultVals.defaultImageVals[3]}
                ></input>
            </div>}
            <button type='submit'>{`${updateForm ? 'Update Spot' : 'Create Spot'}`}</button>
        </form>
    )
 }