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
            if(spotImagesUrl.length < 4){
                spotImagesUrl.push(image.url)
            }
        }
    }
    let keyCount = 0

    return (
        <div className='spot-images-container'>
            <div className='preview-image' style={{'backgroundImage': `url("${previewImgUrl}")`}}></div>
            <div className ='spot-images'>
                {spotImagesUrl.map(url => {
                    keyCount++
                    return (
                        <div className='non-preview-spot-image' key={keyCount} style={{'backgroundImage': `url("${url}")`}}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}