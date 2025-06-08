import webColors from "@/constants/webColors";
import './ButtonComponent.scss';
import { ReactNode } from "react";

interface IProps {
  label: string | ReactNode;
  type: 'submit' | 'no-submit';
  variant?: 'primary' | 'danger' | 'secondary';
  styles?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  affix?: ReactNode;
  isDisabled?: boolean;
}

const ButtonComponent = (props: IProps) => {
  const { label, type, variant, styles, className, onClick, affix, isDisabled } = props;
  const localStyle: React.CSSProperties = {
    backgroundColor: 
      variant === 'primary' ? webColors.adminPrimary : (
      variant === 'danger' ? 'red' : (
      variant === 'secondary' ? webColors.primary : undefined
      )
    ),
    border: `1px solid ${
      variant === 'primary' ? webColors.adminPrimary : (
      variant === 'danger' ? 'red' : (
      variant === 'secondary' ? webColors.primary : undefined
      )
    )}`,
    color: variant ? '#fff' : undefined,
    borderRadius: '4px'
  }
  return (
    <>
      {type === 'submit' ? (
        <button
        className={`btn-component ${className}`}
        style={{...localStyle, ...styles}}
        onClick={onClick}
        disabled={isDisabled}
      >
        {affix && affix}
        {label}
      </button>
      ) : (
        <span
        className={`btn-component ${className}`}
        style={{...localStyle, ...styles}}
        onClick={onClick}
      >
        {affix && affix}
        {label}
      </span>
      )}
    </>
  );
};

export default ButtonComponent;
