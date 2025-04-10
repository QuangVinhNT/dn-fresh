import { IoClose } from "react-icons/io5";
import './OkCancelModal.scss'
import { ReactNode } from "react";

interface IProps {
  title?: string;
  message: ReactNode;
  onOk: () => void;
  onCancel: () => void;
  onClose?: () => void;
}

const OkCancelModal = (props: IProps) => {
  const {title, message, onOk, onCancel, onClose} = props;
  return (
    <div className="ok-cancel-component">
      <div className="header">
        <span className="title">{title ?? 'Thông báo'}</span>
        <IoClose className="btn-close" onClick={onClose ?? onCancel}/>
      </div>
      <div className="body">{message}</div>
      <div className="footer">
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
        <button onClick={onOk} className="btn-ok">Ok</button>
      </div>
    </div>
  )
}

export default OkCancelModal
