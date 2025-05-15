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
  type?: 'text' | 'email' | 'password';
  className?: string;
  isReadOnly?: boolean;
  register?: UseFormRegister<FormValues>;
  name: string;
  isTextarea?: boolean;
  defaultValue?: boolean;
}

const InputComponent = (props: IProps) => {
  const { title, isRequired, placeholder, affix, suffix, type, className, isReadOnly, register, name, isTextarea, defaultValue } = props;
  return (
    <div className={`input-component ${className}`}>
      {title && (
        <label className="input-title">{title} {(!isReadOnly && title) && <span className="input-required">*</span>}</label>
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
