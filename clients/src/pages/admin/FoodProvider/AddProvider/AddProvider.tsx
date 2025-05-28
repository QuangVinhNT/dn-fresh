import './AddProvider.scss';

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProvider = (props: IProps) => {
  const { setIsShowAdd } = props;
  return (
    <div>AddProvider</div>
  );
};

export default AddProvider;
