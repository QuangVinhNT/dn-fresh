import GoogleIcon from '@/assets/svgs/google-icon.svg';
import { ButtonComponent, CheckboxComponent, InputComponent } from "@/components";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Login.scss';
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-component">
      <h1>Đăng nhập</h1>
      <form action="">
        <InputComponent
          name="email"
          title="Email"
          placeholder="Nhập email của bạn"
          type="email"
        />
        <InputComponent 
          name="password"
          title="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          type="password"
          suffix={<IoEyeOff />}
        />
        <div className="remember-forgot">
          <CheckboxComponent 
            id="remember"
            labels={[{name: 'Ghi nhớ đăng nhập', id: 'remember'}]}
          />
          <div className="forgot">
            <Link to={'/forgot-password'}>Quên mật khẩu?</Link>
          </div>
        </div>
        <ButtonComponent 
          label='Đăng nhập'
          type="submit"
          variant="secondary"
          className="btn-login"
          onClick={() => navigate('/user-roles')}
        />
        <p>Bạn không có tài khoản? <Link to={'/register'}>Đăng ký ngay</Link></p>
        <span className="other-login-text">hoặc</span>
        <ButtonComponent
          label='Đăng nhập bằng Google'
          type="no-submit"
          affix={<img src={GoogleIcon} width={25} height={25}/>}
          className="btn-login-with-google"
        />
      </form>
    </div>
  );
};

export default Login;
