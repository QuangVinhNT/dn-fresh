import { ReactNode, useState } from "react";
import './InputComponent.scss';
import { UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

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
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isSearch?: boolean;
  searchResult?: ReactNode;
}

const InputComponent = (props: IProps) => {
  const { title, isRequired, placeholder, affix, suffix, type, className, isReadOnly, register, name, isTextarea, defaultValue, styles, onKeyDown, onBlur, onChange, isSearch, searchResult } = props;
  const [isShowPassword, setIsShowPassword] = useState(false);
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
            type={type === 'password' ? (isShowPassword ? 'text' : 'password') : (type ?? 'text')}
            placeholder={placeholder ?? ''}
            required={isRequired}
            readOnly={isReadOnly}
            defaultValue={defaultValue ? placeholder : ''}
            {...(register && {
              ...register(name),
              onChange: (e) => {
                register(name).onChange(e);
                onChange?.(e);
              }
            })}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
        )}

        {type === 'password' ? (
          <div className="show-hide-password" onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <IoEye /> : <IoEyeOff />}
          </div>
        ) : (
          <>
            {suffix && suffix}
          </>
        )}
      </div>
      {isSearch && searchResult}
    </div>
  );
};

export default InputComponent;
