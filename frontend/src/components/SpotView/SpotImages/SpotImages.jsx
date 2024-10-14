import './SpotImages.css'
export default function SpotImages ({ spotImages }) {
    const spotImagesUrl = []
    let previewImgUrl

    for(let i = 0; i < spotImages.length; i++){
        const image = spotImages[i]
        if(image.preview){
            previewImgUrl = image.url
        }
        else{
            spotImagesUrl.push(image.url)
        }
    }

    return (
        <div className='spot-images-container'>
            <div className='preview-image' style={{'backgroundImage': `url("${previewImgUrl}")`}}></div>
            <div className ='spot-images'></div>
        </div>
    )
}