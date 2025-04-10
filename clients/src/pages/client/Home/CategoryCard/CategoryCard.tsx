import './CategoryCard.scss'

interface IProps {
  imgSrc: string;
  label: string;
}

const CategoryCard = (props: IProps) => {
  const {imgSrc, label} = props
  return (
    <div className="category-card-component">
      <img src={imgSrc} alt=""/>
      <span>{label}</span>
    </div>
  )
}

export default CategoryCard
