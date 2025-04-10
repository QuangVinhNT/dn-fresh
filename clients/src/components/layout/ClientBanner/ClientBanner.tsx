import './ClientBanner.scss'
import BgBreadcrumb from '@/assets/images/bg-breadcrumb.png'

interface IProps {
  label: string;
}

const ClientBanner = (props: IProps) => {
  const {label} = props;
  return (
    <div className="client-banner-component" style={{backgroundImage: `url(${BgBreadcrumb})`}}>
      <span>{label}</span>
    </div>
  )
}

export default ClientBanner
