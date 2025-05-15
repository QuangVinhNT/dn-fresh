import GoogleIcon from '@/assets/svgs/google-icon.svg';
import { ButtonComponent, InputComponent } from "@/components";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Register.scss';
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register-component">
      <h1>Đăng ký</h1>
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
        <InputComponent 
          name="confirm-password"
          title="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu của bạn"
          type="password"
          suffix={<IoEyeOff />}
        />
        <ButtonComponent 
          label='Đăng ký'
          type="submit"
          variant="secondary"
          className="btn-register"
          onClick={() => navigate('/confirm-code')}
        />
        <p>Bạn đã có tài khoản? <Link to={'/login'}>Đăng nhập ngay</Link></p>
        <span className="other-login-text">hoặc</span>
        <ButtonComponent
          label='Đăng nhập bằng Google'
          type="no-submit"
          affix={<img src={GoogleIcon} width={25} height={25}/>}
          className="btn-login-with-google"
        />
      </form>
    </div>
  )
}

export default Register
