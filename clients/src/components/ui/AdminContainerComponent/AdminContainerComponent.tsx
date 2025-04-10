import { ReactNode } from "react";
import './AdminContainerComponent.scss'

interface IProps {
  children: ReactNode;
  title: string | ReactNode;
  extraTitle?: ReactNode;
  className?: string;
}

const AdminContainerComponent = (props: IProps) => {
  const {children, title, extraTitle, className} = props
  return (
    <div className={`admin-container-component ${className}`}>
      <div className="header-container">
        <span className="title">{title}</span>
        <div className="extra-title">{extraTitle}</div>
      </div>
      <div className="body-container">
        {children}
      </div>
    </div>
  )
}

export default AdminContainerComponent
