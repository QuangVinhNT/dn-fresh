import { ClientBanner } from "@/components";
import './Introduce.scss';
const Introduce = () => {
  return (
    <div className="introduce-component">
      <ClientBanner label="Giới thiệu" />
      <div className="introduce-content">
        <h3>Giới thiệu</h3>
        <p>
          <b>DN Fresh</b> là hệ thống cửa hàng thực phẩm sạch uy tín nhất ở Đà Nẵng, chuyên cung cấp thực phẩm sạch tới từng bếp ăn của gia đình bạn.
        </p>
        <p>
          <b>Tầm nhìn:</b> Được nuôi trồng, chế biến theo phương Bio (sinh học), Organic (hữu cơ), Eco (sinh thái); cam kết không bán hàng giả, hàng nhái và hàng kém chất lượng. Sản phẩm được giao đến tay khách hàng luôn đúng cam kết, đúng chất lượng niệm yết, luôn được bảo quản trong môi trường lý tưởng, đảm bảo vệ sinh an toàn thực phẩm.
        </p>
        <p>
          <b>Mục tiêu:</b> Sản phẩm được giao đến tay khách hàng luôn đúng cam kết, đúng chất lượng niệm yết, luôn được bảo quản trong môi trường lý tưởng, đảm bảo vệ sinh an toàn thực phẩm.
        </p>
      </div>
    </div>
  );
};

export default Introduce;
