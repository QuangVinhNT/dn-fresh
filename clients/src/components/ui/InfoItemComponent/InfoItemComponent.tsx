import TextComponent from "../TextComponent";
import './InfoItemComponent.scss'

interface IProps {
  title: string;
  content: string;
  className?: string;
  styles?: React.CSSProperties;
}

const InfoItemComponent = (props: IProps) => {
  const {title, content, className, styles} = props
  return (
    <div className={`info-item-component ${className}`} style={styles}>
      <TextComponent text={title}/>
      <TextComponent text={content} color="#000"/>
    </div>
  )
}

export default InfoItemComponent
