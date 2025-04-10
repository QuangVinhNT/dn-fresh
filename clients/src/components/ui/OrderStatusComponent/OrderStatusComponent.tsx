import { IoCheckmarkCircle } from "react-icons/io5";
import './OrderStatusComponent.scss';

interface IProps {
  statusItems: string[];
  status: string;
  time: string;
}

const OrderStatusComponent = (props: IProps) => {
  const { status, time, statusItems } = props;
  return (
    <>
      {statusItems.indexOf(status) === -1 ? (
        <span style={{backgroundColor: 'red', color: '#fff', padding: '8px 16px'}}>Đã hủy</span>
      ) : (
        <div className="order-status-component">
          {statusItems.map((item, index) => (
            <div key={index} className="status-container">
              <div className={`status-number 
            ${(statusItems.indexOf(item) < statusItems.indexOf(status)) && 'done'} 
            ${(statusItems.indexOf(item) <= statusItems.indexOf(status)) && 'border-done'}`}>
                {(statusItems.indexOf(item) <= statusItems.indexOf(status)) ? (
                  <IoCheckmarkCircle className="icn-check" />) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="status-info">
                <span>{item}</span>
                <span className="status-time">{status === item && time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderStatusComponent;
