import { UseFormRegister } from "react-hook-form";
import './SelectComponent.scss';

type QueryData = {
  [key: string]: string;
};

interface IProps {
  title?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  register?: UseFormRegister<QueryData>;
  name: string;
  items: {content: string, value: string, isSelected: boolean}[]
}
const SelectComponent = (props: IProps) => {
  const { title, isRequired, className, isDisabled, register, name, items} = props;
  return (
    <div className={`select-component ${className}`}>
      <label>{title} {(!isDisabled && title) && <span style={{ color: 'red' }}>*</span>}</label>
      <select
      {...(register && register(name))}
      required={isRequired}
      disabled={isDisabled}
      defaultValue={items.filter((item) => item.isSelected)[0].value}
      >
        {items.map((item, index) => (
          <option value={item.value} key={index}>{item.content}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
