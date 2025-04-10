import { IoChevronBackOutline } from "react-icons/io5";
import './BackComponent.scss';
interface IProps {
  onBack: () => void;
  backTitle: string;
}
const BackComponent = (props: IProps) => {
  const {onBack, backTitle} = props
  return (
    <div className="back-component" onClick={onBack}>
      <IoChevronBackOutline />
      <span className="back-content">{backTitle}</span>
    </div>
  );
};

export default BackComponent;
