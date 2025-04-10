import { UseFormRegister } from "react-hook-form";
import './CheckboxComponent.scss';

type QueryData = {
  [key: string]: string;
};

interface IProps {
  id: string;
  labels: {label: string, value: string}[];
  title?: string;
  register?: UseFormRegister<QueryData>; 
  className?: string;
}

const CheckboxComponent = (props: IProps) => {
  const { id, labels, title, register, className } = props;
  return (
    <div className={`checkbox-component ${className}`}>
      {title && <p className="checkbox-title">{title} {(<span style={{color: 'red'}}>*</span>)}</p>}
      <div className="checkbox-items">
        {labels.map((item, index) => (
          <div className="checkbox-item" key={index}>
            <input type="checkbox" id={`${id}-${index}`} {...(register && register(item.value))}/>
            <label htmlFor={`${id}-${index}`} className="checkbox-label">{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxComponent;
