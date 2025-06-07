import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";
import './UploadImgComponent.scss';

type QueryData = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  id: string;
  name: string;
  register: UseFormRegister<QueryData>;
  watch: UseFormWatch<QueryData>;
  title?: string;
  defaultImages?: string;
  isGrid2?: boolean;
  multiple?: boolean;
}
const UploadImgComponent = (props: IProps) => {
  const { id, register, name, watch, title, isGrid2, multiple } = props;
  const watched = watch(name);
  return (
    <div className="upload-component">
      {title && <p className="upload-title">{title} {(<span style={{ color: 'red' }}>*</span>)}</p>}
      <div className="img-list" style={{display: isGrid2 ? 'grid' : 'block'}}>
        {watched instanceof FileList && watched?.length > 0 && Array.from(watched).map((img, idx) => (
          <div className="img-item" key={idx}>
            <img
              src={URL.createObjectURL(new Blob([img]))}
            />
            <IoCloseCircle 
              className="close-icon" size={32} 
              onClick={() => {

            }}
            />
          </div>
        ))}
      </div>
      <label htmlFor={id}>
        <IoCloudUploadOutline className="upload-icon" />
        <span className="upload-content">
          {watch(name)?.length > 0 ? 'Thay đổi ảnh' : 'Tải ảnh mới từ thiết bị'}
        </span>
      </label>
      <input 
        type="file" 
        id={id} 
        accept="image/png, image/jpeg, image/jpg" 
        {...(register && register(name))} 
        multiple={multiple}
        // onChange={() => {setValue(name, imageFiles)}}
        />
    </div>
  );
};

export default UploadImgComponent;
