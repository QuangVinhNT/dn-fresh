import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import './FoodImage.scss';
import webColors from "@/constants/webColors";
import { useState } from "react";
interface IProps {
  images: string[];
}
const FoodImage = (props: IProps) => {
  const { images } = props;
  const [imgIdx, setImgIdx] = useState(0);
  const [thumbnailsIdx, setThumbnailsIdx] = useState(0);
  return (
    <div className="food-image-component">
      <div className="thumbnails">
        <IoChevronUp
          className="icon-up"
          size={32}
          color={webColors.text}
          onClick={() => {
            setThumbnailsIdx(thumbnailsIdx - 1);
            setImgIdx(imgIdx - 1);
          }}
        />
        <div className="container">
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt=""
              className={`${thumbnailsIdx === idx && 'active'}`}
              onClick={() => {
                setImgIdx(idx);
                setThumbnailsIdx(idx);
              }}
            />
          ))}
        </div>
        <IoChevronDown
          className="icon-down"
          size={32}
          color={webColors.text}
          onClick={() => {
            setThumbnailsIdx(thumbnailsIdx + 1);
            setImgIdx(imgIdx + 1);
          }} />
      </div>
      <div className="food-image-container">
        <div className="food-images" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
          {images.map((image, idx) => (
            <img src={image} alt="" key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodImage;
