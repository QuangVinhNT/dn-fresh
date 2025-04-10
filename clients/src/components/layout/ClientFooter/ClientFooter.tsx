import FooterImg from '@/assets/images/footer-img.png';
import DecoFooter from '@/assets/images/deco-footer.png';
import Logo from '@/assets/svgs/dnfresh-logo-white.svg';
import { IoLogoFacebook, IoLogoGoogle, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import './ClientFooter.scss';
const ClientFooter = () => {
  return (
    <div className="client-footer-component">
      <img src={DecoFooter} alt="" className="deco-footer" />
      <div className="client-footer-content">
        <div className="col-1">
          <span className="title">Đăng ký nhận thông tin</span>
          <p className="content">Đăng ký nhận bản tin để nhận ưu đãi đặt biệt về sản phẩm DN Fresh</p>
          <div className="email-input">
            <input type="email" placeholder="Nhập email của bạn" />
            <span>Đăng ký</span>
          </div>
        </div>
        <div className="col-2">
          <div className="client-footer-logo">
            <img src={Logo} alt="" />
            <span>Fresh - Fast - Reliable</span>
          </div>
          <p className="content">
            Website thương mại điện tử DN Fresh do DN Group là đơn vị chủ quản, chịu trách nhiệm và thực hiện các giao dịch liên quan đến mua sắm thực phẩm tươi sống.
          </p>
          <img src={FooterImg} alt="" className="footer-img" />
        </div>
        <div className="col-3">
          <span className="title">Liên hệ với chúng tôi</span>
          <div className="content" style={{ textAlign: 'left' }}>
            <p><b>Địa chỉ:</b> 48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng</p>
            <p><b>Điện thoại:</b> 19006750</p>
            <p><b>Email:</b> dnfresh.support@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="copyright-social">
        <div className="copyright-social-content">
          <span className="copyright">© Bản quyền thuộc về DN Fresh</span>
          <div className="socials">
            <IoLogoFacebook size={20} className="icon"/>
            <IoLogoTiktok size={20} className="icon"/>
            <IoLogoGoogle size={20} className="icon"/>
            <IoLogoYoutube size={20} className="icon"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFooter;
