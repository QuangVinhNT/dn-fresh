import TextComponent from "../TextComponent";
import './InfoItemComponent.scss'

interface IProps {
  title: string;
  content: string;
  className?: string;
}

const InfoItemComponent = (props: IProps) => {
  const {title, content, className} = props
  return (
    <div className={`info-item-component ${className}`}>
      <TextComponent text={title}/>
      <TextComponent text={content} color="#000"/>
    </div>
  )
}

export default InfoItemComponent
