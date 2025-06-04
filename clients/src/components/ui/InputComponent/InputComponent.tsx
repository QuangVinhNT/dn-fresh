import { ReactNode } from "react";
import './InputComponent.scss';
import { UseFormRegister } from "react-hook-form";

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  title?: string;
  isRequired?: boolean;
  placeholder?: string;
  affix?: ReactNode;
  suffix?: ReactNode;
  type?: 'text' | 'email' | 'password' | 'date';
  className?: string;
  isReadOnly?: boolean;
  register?: UseFormRegister<FormValues>;
  name: string;
  isTextarea?: boolean;
  defaultValue?: boolean;
  styles?: React.CSSProperties;
}

const InputComponent = (props: IProps) => {
  const { title, isRequired, placeholder, affix, suffix, type, className, isReadOnly, register, name, isTextarea, defaultValue, styles } = props;
  return (
    <div className={`input-component ${className}`} style={styles}>
      {title && (
        <label className="input-title">{title} {(!isReadOnly && title && isRequired) && <span className="input-required">*</span>}</label>
      )}
      <div className="input-container">
        {affix && affix}
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            required={isRequired}
            readOnly={isReadOnly}
            defaultValue={defaultValue ? placeholder : ''}
            {...(register && register(name))}
          >
          </textarea>
        ) : (
          <input
            type={type ?? 'text'}
            placeholder={placeholder ?? ''}
            required={isRequired}
            readOnly={isReadOnly}
            defaultValue={defaultValue ? placeholder : ''}
            {...(register && register(name))}
          />
        )}
        {suffix && suffix}
      </div>
    </div>
  );
};

export default InputComponent;
