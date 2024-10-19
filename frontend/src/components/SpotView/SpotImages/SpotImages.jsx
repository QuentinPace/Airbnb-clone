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
    let keyCount = -1

    const placeholders = ['none.png', 'none.png', 'none.png', 'none.png',]

    return (
        <div className='spot-images-container'>
            <div data-testid='spot-large-image' className='preview-image' style={{'backgroundImage': `url("${previewImgUrl}")`}}></div>
            <div className ='spot-images'>
                {placeholders.map(url => {
                    keyCount++
                    return (
                        <div data-testid='spot-small-image' className='non-preview-spot-image' key={keyCount} style={{'backgroundImage': `url("${spotImagesUrl[keyCount] ? spotImagesUrl[keyCount] : url}")`}}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}