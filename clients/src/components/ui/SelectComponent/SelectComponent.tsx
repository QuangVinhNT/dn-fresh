import { UseFormRegister } from "react-hook-form";
import './SelectComponent.scss';
import { SelectBox } from "@/types/ComponentType";
import { placeholder } from "@cloudinary/react";

type QueryData = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  title?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  register?: UseFormRegister<QueryData>;
  name: string;
  items: SelectBox[]
  defaultValue?: boolean;
}
const SelectComponent = (props: IProps) => {
  const { title, isRequired, className, isDisabled, register, name, items, defaultValue, placeholder} = props;
  // console.log(items)
  return items.length > 0 && (
    <div className={`select-component ${className}`}>
      <label>{title} {(!isDisabled && title) && <span style={{ color: 'red' }}>*</span>}</label>
      <select
      {...(register && register(name))}
      required={isRequired}
      disabled={isDisabled}
      defaultValue={defaultValue ? placeholder?.toString() : items.filter(item => item.isSelected)[0].value}
      >
        {items.map((item, index) => (
          <option value={item.value} key={index}>{item.content}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
