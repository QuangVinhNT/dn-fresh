import './EditProvider.scss'

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProvider = (props: IProps) => {
  const { setIsShowEdit } = props;
  return (
    <div>EditProvider</div>
  )
}

export default EditProvider
