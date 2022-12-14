import {useState, useEffect} from 'react';
import { getImage } from '../../../firebase';
import Spinner from '../Spinner';
interface LoadedImageDetails {
    externalHash: string;
    className?: string;
    height?: number;
    width?: number;
}
const LoadedImage = ({externalHash, className, height = 400, width = 400}: LoadedImageDetails) => {
    const [isLoaded, setisLoaded] = useState(false);
    const [imgElement, setImgElement] = useState<any>(null);
    useEffect(() => {
        async function loadImg() {
            if (!isLoaded) {
                let loadedImg = await getImage(externalHash);
                setImgElement(loadedImg);
            }
        }
        loadImg()
    })
    useEffect(() => {
        if (imgElement !== null) {
            setisLoaded(true)
        }
    }, [imgElement])
    return (
        <>
            {isLoaded && <img src={imgElement.src} alt="loaded post" className={`${className} h-[${height}px] w-[${width}px]`}/>}
            {!isLoaded && <Spinner size={24}/>}
        </>
    )
}

export default LoadedImage