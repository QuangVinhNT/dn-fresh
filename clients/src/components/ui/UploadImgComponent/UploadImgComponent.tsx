import { IoCloudUploadOutline } from "react-icons/io5";
import './UploadImgComponent.scss';
import { UseFormRegister, UseFormWatch } from "react-hook-form";

type QueryData = {
  [key: string]: string;
};

interface IProps {
  id: string;
  name: string;
  register: UseFormRegister<QueryData>;
  watch: UseFormWatch<QueryData>;
  title?: string;
}
const UploadImgComponent = (props: IProps) => {
  const { id, register, name, watch, title } = props;

  return (
    <div className="upload-component">
      {title && <p className="upload-title">{title} {(<span style={{color: 'red'}}>*</span>)}</p>}
      {watch(name)?.length > 0 && (
        <img src={URL.createObjectURL(new Blob([watch(name)?.[0]]))} />
      )}
      <label htmlFor={id}>
        <IoCloudUploadOutline className="upload-icon" />
        <span className="upload-content">
          {watch(name)?.length > 0 ? 'Thay đổi ảnh' : 'Tải ảnh lên từ thiết bị'}
        </span>
      </label>
      <input type="file" id={id} accept="image/png, image/jpeg, image/jpg" {...(register && register(name))} />
    </div>
  );
};

export default UploadImgComponent;
