import './ErrorMessage.scss';

interface IProps {
  message: string;
  styles?: React.CSSProperties;
}

const ErrorMessage = (props: IProps) => {
  const {message, styles} = props
  return ( 
    <div className="error-message-component" style={styles}>
      <span className="error-message">{message}</span>
    </div>
  )
}

export default ErrorMessage
