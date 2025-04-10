import { ClientBanner, InputComponent } from "@/components";
import './Contact.scss';
const Contact = () => {
  return (
    <div className="contact-component">
      <ClientBanner label="Liên hệ" />
      <div className="contact-content">
        <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4587.908652731572!2d108.15654907579206!3d16.06165253963932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421924682e8689%3A0x48eb0bdbeec05215!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e1!3m2!1svi!2s!4v1744276052116!5m2!1svi!2s" width="100%" height="300" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="contact-info-form">
          <div className="contact-info">
            <h3>Thông tin liên hệ</h3>
            <p>
              Website thương mại điện tử DN Fresh do DN Group là đơn vị chủ quản, chịu trách nhiệm và thực hiện các giao dịch liên quan mua sắm sản phẩm hàng hoá tiêu dùng thiết yếu.
            </p>
            <p><b>Địa chỉ:</b> 48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng</p>
            <p><b>Điện thoại:</b> 19006750</p>
            <p><b>Email:</b> dnfresh.support@gmail.com</p>
          </div>
          <form className="contact-form">
            <div className="fullname-email">
              <InputComponent
                name="fullname"
                placeholder="Nhập họ và tên"
                title="Họ và tên"
                className="fullname"
              />
              <InputComponent
                name="email"
                placeholder="Nhập địa chỉ email"
                title="Email"
                className="email"
              />
            </div>
            <InputComponent
              name="phone"
              placeholder="Nhập số điện thoại"
              title="Điện thoại"
            />
            <InputComponent
              name="content"
              placeholder="Nội dung liên hệ"
              title="Nội dung"
              isTextarea
            />
            <button>Gửi tin nhắn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
