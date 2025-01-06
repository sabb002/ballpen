import { getImage } from "../utils/getImage"

type ImageProps = {
    src: string,
    category: string,
    className: string
}

function ImageComponent({ src, category, className }: ImageProps) {
    const image = src || getImage(category);
    
    return (
        <div className={className}>
            {
                image
                ? (
                    <img src={image} alt="image" className="w-full h-56 object-cover rounded-t" />
                ) : (
                    <p className="w-full h-56 flex justify-center items-center text-stone-400 bg-stone-100">No Image Available.</p>
                )
            }
        </div>
    )
}
export default ImageComponent