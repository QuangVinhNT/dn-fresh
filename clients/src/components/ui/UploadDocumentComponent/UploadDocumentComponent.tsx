import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import './UploadDocumentComponent.scss';

type QueryData = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  id: string;
  name: string;
  register: UseFormRegister<QueryData>;
  watch: UseFormWatch<QueryData>;
  title?: string;
  multiple?: boolean;
}
const UploadDocumentComponent = (props: IProps) => {
  const { id, register, name, watch, title, multiple } = props;
  const watched = watch(name);
  return (
    <div className="upload-component">
      {title && <p className="upload-title">{title} {(<span style={{ color: 'red' }}>*</span>)}</p>}
      <div className="doc-list">
        {watched instanceof FileList && watched?.length > 0 && Array.from(watched).map((doc, idx) => (
          <div className="doc-item" key={idx}>
            <span>{doc.name}</span>
            <span>{Math.ceil(doc.size / 1024)} KB</span>
          </div>
        ))}
      </div>
      <label htmlFor={id}>
        <IoCloudUploadOutline className="upload-icon" />
        <span className="upload-content">
          {watch(name)?.length > 0 ? 'Thay đổi tài liệu' : 'Tải tài liệu mới từ thiết bị'}
        </span>
      </label>
      <input
        type="file"
        id={id}
        accept=".pdf, image/png, image/jpeg, image/jpg"
        {...(register && register(name))}
        multiple={multiple}
      />
    </div>
  );
};

export default UploadDocumentComponent;
