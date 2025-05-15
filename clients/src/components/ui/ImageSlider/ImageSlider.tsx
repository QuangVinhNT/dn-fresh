import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import './ImageSlider.scss';
import { useState } from "react";

interface IProps {
  images: string[];
  imgWidth?: number;
  imgHeight?: number;
}

const ImageSlider = (props: IProps) => {
  const { images, imgWidth, imgHeight } = props;
  const [idxImg, setIdxImg] = useState(0);
  return (
    <div className="image-slider-component">
      <div 
        className="prev-icon"
        onClick={() => {
          setIdxImg(idxImg == 0 ? 0 : idxImg - 1)
        }}
        >
        <IoChevronBackOutline size={24} />
      </div>
      <div className="image-frame" style={{ width: imgWidth ?? 150 }}>
        <div className="image-list" style={{ transform: `translateX(${-100 * idxImg}%)` }}>
          {images.map((image, idx) => (
            <img
              src={image} alt=""
              key={idx}
              width={imgWidth ?? 150}
              height={imgHeight ?? 150}
            />
          ))}
        </div>
      </div>
      <div 
        className="next-icon"
        onClick={() => {
          setIdxImg(idxImg == images.length - 1 ? images.length - 1 : idxImg + 1)
        }}
        >
        <IoChevronForwardOutline size={24} />
      </div>
    </div>
  );
};

export default ImageSlider;
