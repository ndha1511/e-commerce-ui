import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "react-image-gallery";

type Image = {
    original: string;
    thumbnail: string;
    embedUrl?: string;
};

export type Props = {
    images: Image[];
};
const ImageDetails = ({ images }: Props) => (
    <div style={{ width: "100%", flex: 1 }}>
        <ImageGallery startIndex={0} renderLeftNav={(onClick, disabled) => {
            return (
                <button className="image-gallery-icon image-gallery-left-nav text-large"
                    onClick={onClick} disabled={disabled} ><FontAwesomeIcon icon={faChevronLeft} /></button>)
        }}
            renderRightNav={(onClick, disabled) => {
                return (
                    <button className="image-gallery-icon image-gallery-right-nav text-large"
                        onClick={onClick} disabled={disabled} ><FontAwesomeIcon icon={faChevronRight} /></button>)
            }}
            items={images} />
    </div>
);
export default ImageDetails;
