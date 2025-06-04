import { IoClose } from "react-icons/io5";
import './OkCancelModal.scss'
import { ReactNode } from "react";

interface IProps {
  title?: string;
  onOk: () => void;
  onCancel: () => void;
  onClose?: () => void;
  data: {
    message: ReactNode,
    [key: string]: any
  }
}

const OkCancelModal = (props: IProps) => {
  const {title, onOk, onCancel, onClose, data} = props;
  return (
    <div className="ok-cancel-component">
      <div className="header">
        <span className="title">{title ?? 'Thông báo'}</span>
        <IoClose className="btn-close" onClick={onClose ?? onCancel}/>
      </div>
      <div className="body">{data.message}</div>
      <div className="footer">
        <button onClick={onOk} className="btn-ok">Ok</button>
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
      </div>
    </div>
  )
}

export default OkCancelModal
